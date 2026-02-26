import "./globals.css";
import { Nunito } from "next/font/google";
import Script from "next/script";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        {children}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-LDEGMPN6R0`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LDEGMPN6R0');
          `}
        </Script>
      </body>
    </html>
  );
}