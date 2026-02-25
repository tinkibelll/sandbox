"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  isLive?: boolean;
  statusLabel?: string;
  href?: string;
}

export default function Card({
  title,
  subtitle,
  description,
  isLive = false,
  statusLabel = "Live",
  href,
}: CardProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => href && router.push(href)}
      style={{
        backgroundColor: "#2e2e2e",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        maxWidth: "400px",
        border: "1px solid #10b981",
        boxShadow: hovered ? "0 0 20px rgba(16,185,129,0.4)" : "none",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: href ? "pointer" : "default",
        fontFamily: "inherit",
        zIndex: hovered ? 1 : 0,
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>
          {title}
        </span>
        <span style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          backgroundColor: isLive ? "rgba(16,185,129,0.1)" : "rgba(99,102,241,0.1)",
          color: isLive ? "#10b981" : "#818cf8",
          borderRadius: "9999px",
          padding: "0.25rem 0.75rem",
          fontSize: "0.8rem",
          fontWeight: 600,
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: isLive ? "#10b981" : "#818cf8",
            display: "inline-block",
          }}></span>
          {statusLabel}
        </span>
      </div>

      {/* Description */}
      <p style={{
        color: "white",
        fontSize: "0.875rem",
        lineHeight: "1.6",
        marginBottom: "1.25rem",
      }}>
        {description}
      </p>

      {/* Footer */}
      <div>
        <span style={{
          color: "#6ee7b7",
          fontSize: "0.8rem",
          border: "1px solid #6ee7b7",
          borderRadius: "0.5rem",
          padding: "0.2rem 0.5rem",
          display: "inline-block",
        }}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}