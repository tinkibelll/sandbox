import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

interface Choice {
  label: string;
  targetIndex: number;
}

interface Slide {
  id: string;
  index: number;
  imageDataUrl: string;
  choices: Choice[];
}

interface StoryState {
  slides: Slide[];
  title: string;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const presentationXml = await zip.file("ppt/presentation.xml")?.async("string");
  if (!presentationXml)
    return NextResponse.json({ error: "invalid pptx" }, { status: 400 });

  const presRelsXml = await zip.file("ppt/_rels/presentation.xml.rels")?.async("string");
  if (!presRelsXml)
    return NextResponse.json({ error: "invalid pptx" }, { status: 400 });

  const matches = [...presRelsXml.matchAll(/Target="(slides\/slide\d+\.xml)"/g)];
  const orderedSlideFiles = matches.map((m) => "ppt/" + m[1]).sort();

  const coreXml = await zip.file("docProps/core.xml")?.async("string");
  const titleMatch = coreXml?.match(/<dc:title>([^<]*)<\/dc:title>/);
  const title = titleMatch?.[1] ?? file.name.replace(".pptx", "");

  const slideFileToIndex: Record<string, number> = {};
  orderedSlideFiles.forEach((path, i) => {
    const filename = path.split("/").pop()!;
    slideFileToIndex[filename] = i;
  });

  const slides: Slide[] = [];

  for (let i = 0; i < orderedSlideFiles.length; i++) {
    const slidePath = orderedSlideFiles[i];
    const slideXml = await zip.file(slidePath)?.async("string");
    if (!slideXml) continue;

    const slideFilename = slidePath.split("/").pop()!;
    const slideDir = slidePath.substring(0, slidePath.lastIndexOf("/"));
    const relsPath = `${slideDir}/_rels/${slideFilename}.rels`;
    const relsXml = await zip.file(relsPath)?.async("string");

    const choiceRidToTarget: Record<string, string> = {};
    if (relsXml) {
      for (const m of relsXml.matchAll(/Id="(rId\d+)"[^>]*Target="([^"]*)"/g)) {
        choiceRidToTarget[m[1]] = m[2].split("/").pop()!;
      }
    }

    const choices: Choice[] = [];
    for (const runMatch of slideXml.matchAll(/<a:r>([\s\S]*?)<\/a:r>/g)) {
      const runXml = runMatch[1];
      const hlinkMatch = runXml.match(/hlinkClick[^>]*r:id="(rId\d+)"/);
      if (!hlinkMatch) continue;
      const rid = hlinkMatch[1];
      const filename = choiceRidToTarget[rid];
      if (!filename) continue;
      const targetIndex = slideFileToIndex[filename];
      if (targetIndex === undefined) continue;
      const textMatch = runXml.match(/<a:t>([^<]*)<\/a:t>/);
      const label = textMatch?.[1]?.trim();
      if (label) choices.push({ label, targetIndex });
    }

    let imageDataUrl = "";
    if (relsXml) {
      const imgMatch = relsXml.match(/Type="[^"]*\/image"[^>]*Target="([^"]*)"/);
      if (imgMatch) {
        const imgTarget = imgMatch[1].replace(/^\.\.\//, "ppt/").replace(/^\//, "");
        const imgData = await zip.file(imgTarget)?.async("base64");
        const ext = imgTarget.split(".").pop() ?? "png";
        if (imgData) imageDataUrl = `data:image/${ext};base64,${imgData}`;
      }
    }

    if (!imageDataUrl) {
      imageDataUrl = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'><rect width='1280' height='720' fill='%231e1e1e'/><text x='640' y='360' text-anchor='middle' fill='%23333' font-size='32' font-family='sans-serif'>slide ${i + 1}</text></svg>`;
    }

    slides.push({
      id: `slide-${i}`,
      index: i,
      imageDataUrl,
      choices,
    });
  }

  const result: StoryState = { slides, title };
  return NextResponse.json(result);
}