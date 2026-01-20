import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data: news } = await supabase
    .from("news")
    .select("slug")
    .eq("is_published", true);

  return news?.map(({ slug }) => ({ slug })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerClient();
  const { data: news } = await supabase
    .from("news")
    .select("title, excerpt")
    .eq("slug", slug)
    .single();

  if (!news) return { title: "Noticia no encontrada" };

  return {
    title: `${news.title} | UMP News`,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerClient();

  const { data: newsItem } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] opacity-30 mix-blend-screen" />
        {/* Ruido con gradiente que se desvanece hacia abajo */}
        <div
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl pt-32 pb-20">
        {/* Navigation */}
        <Link
          href="/news"
          className="inline-flex items-center gap-3 text-neutral-400 hover:text-primary transition-all duration-300 mb-16 font-mono text-xs uppercase tracking-[0.2em] group border border-white/5 rounded-full px-4 py-2 bg-black/50 backdrop-blur-sm hover:border-primary/50"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          <span className="relative top-[1px]">Noticias</span>
        </Link>

        {/* Creative Header Layout */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
          <div className="lg:col-span-8 space-y-8">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 bg-primary text-black text-[10px] font-black uppercase tracking-widest">
                Actualización
              </span>
              <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs uppercase tracking-wider">
                <Calendar className="h-3 w-3 text-primary" />
                <span>
                  {new Date(newsItem.published_at).toLocaleDateString(
                    undefined,
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs uppercase tracking-wider">
                <Clock className="h-3 w-3 text-primary" />
                <span>3 min lectura</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              {newsItem.title.split(" ").map((word: string, i: number) => (
                <span
                  key={i}
                  className="inline-block mr-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-neutral-500 transition-all duration-500 cursor-default"
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right lg:border-l lg:border-white/10 lg:pl-8 lg:py-4">
            {newsItem.excerpt && (
              <p className="text-lg text-neutral-300 font-light leading-relaxed">
                {newsItem.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* Featured Media */}
        {newsItem.image_url && (
          <div className="mb-24 relative w-full aspect-[21/9] group overflow-hidden rounded-sm border border-white/10">
            <div className="absolute inset-0 bg-neutral-900" />
            <Image
              src={newsItem.image_url}
              alt={newsItem.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
                Imagen Destacada
              </span>
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="hidden lg:block lg:col-span-2 sticky top-32 h-fit space-y-8">
            <div className="flex flex-col gap-4 border-l-2 border-white/10 pl-4 py-2">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest block mb-2">
                Compartir
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/10 hover:text-primary rounded-full transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <article
            className="lg:col-span-8 prose prose-invert prose-lg md:prose-xl max-w-none 
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white
            prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:font-light
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-white transition-colors
            prose-strong:text-white prose-strong:font-bold
            prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
            prose-img:rounded-lg prose-img:border prose-img:border-white/10 prose-img:shadow-2xl"
          >
            {newsItem.content
              ?.split("\n")
              .map((paragraph: string, idx: number) => {
                if (
                  paragraph.length < 50 &&
                  paragraph === paragraph.toUpperCase() &&
                  paragraph.length > 3
                ) {
                  return (
                    <h3 key={idx} className="text-2xl mt-12 mb-6 text-primary">
                      {paragraph}
                    </h3>
                  );
                }

                return paragraph.trim() !== "" && <p key={idx}>{paragraph}</p>;
              })}
          </article>
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link
            href="/news"
            className="group flex flex-col items-center md:items-start gap-2"
          >
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest group-hover:text-primary transition-colors">
              Volver al Newsroom
            </span>
            <span className="text-2xl font-bold text-white uppercase tracking-tight group-hover:text-neutral-300 transition-colors">
              Ver Todas las Noticias
            </span>
          </Link>

          <Button
            size="lg"
            className="rounded-full bg-white text-black hover:bg-primary hover:text-black font-bold uppercase tracking-wider px-8 transition-transform hover:scale-105"
          >
            Suscríbete al Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}
