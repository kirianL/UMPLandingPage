import { getDictionary } from "@/lib/dictionaries";
import AboutContent from "./content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AboutContent dict={dict} />;
}
