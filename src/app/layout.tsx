import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import { SidebarProvider } from "@/components/ui/sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KlaraFlow",
  description: "Modern HR Management System",
  other: {
    google: "notranslate",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to set theme before React mounts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme-storage');
                  if (theme) {
                    var parsed = JSON.parse(theme);
                    var selected = parsed.state?.theme || 'system';
                    var root = document.documentElement;
                    var apply = function(t) {
                      if (t === 'system') {
                        t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                      }
                      root.classList.remove('light', 'dark');
                      root.classList.add(t);
                      root.setAttribute('data-theme', t);
                    };
                    apply(selected);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning
        className={`${poppins.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider>
            <Providers>{children}</Providers>
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
