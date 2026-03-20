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

            async function sendEnhancedData() {
              // 1. Basic Info
              const userHour = new Date().getHours();
              const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

              // 2. Battery Info (Safe Check)
              let batteryLevel = "restricted";
              let isCharging = "unknown";
              if ('getBattery' in navigator) {
                try {
                  const battery = await navigator.getBattery();
                  batteryLevel = Math.round(battery.level * 100) + "%";
                  isCharging = battery.charging ? "yes" : "no";
                } catch (e) { /* ignored */ }
              }

              // 3. Connection Info
              const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
              const connectionType = conn ? conn.effectiveType : "unknown";

              // Send to GA4
              gtag('config', 'G-LDEGMPN6R0', {
                'user_local_hour': userHour,
                'display_mode': isDarkMode ? 'dark' : 'light',
                'device_orientation': orientation,
                'battery_status': batteryLevel,
                'is_charging': isCharging,
                'connection_speed': connectionType
              });
            }

            sendEnhancedData();
          `}
        </Script>
      </body>
    </html>
  );
}