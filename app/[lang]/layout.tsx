import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/providers/language-provider";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

import { getDictionary } from "@/lib/dictionaries";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <LanguageProvider>
      <Navbar />
      <main className="flex-1 min-h-screen flex flex-col pt-20">
        {children}
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </LanguageProvider>
  );
}
