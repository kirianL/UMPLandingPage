import { getDictionary } from "@/lib/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Contact" : "Contacto",
    description: isEn
      ? "Get in touch with UMPmusic. Bookings, collaborations, and inquiries."
      : "Ponete en contacto con UMPmusic. Bookings, colaboraciones y consultas.",
    alternates: {
      canonical: `/${lang}/contact`,
      languages: { es: "/es/contact", en: "/en/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="container py-24 px-4">
      <h1 className="text-4xl font-bold text-foreground mb-8">
        {dict.contact.title} (WIP)
      </h1>
      <p className="text-muted-foreground">{dict.contact.wip_message}</p>
    </div>
  );
}
