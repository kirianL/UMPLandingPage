import { getDictionary } from "@/lib/dictionaries";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="container py-24 px-4">
      <h1 className="text-4xl font-bold text-white mb-8">
        {dict.about.title} (WIP)
      </h1>
      <p className="text-neutral-400">{dict.about.wip_message}</p>
    </div>
  );
}
