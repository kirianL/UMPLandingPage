import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer({
  dict,
  lang,
}: {
  dict: {
    description: string;
    explore: string;
    contact: string;
    links: {
      artists: string;
      news: string;
      events: string;
      about: string;
    };
    rights: string;
    developer: string;
    admin: string;
  };
  lang: string;
}) {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
              <div className="relative h-14 w-40">
                <Image
                  src="/assets/LOGO-UMP.webp"
                  alt="UMP Music Logo"
                  fill
                  className="object-contain object-left invert brightness-0"
                  sizes="(max-width: 768px) 120px, 160px"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              {dict.description}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider">
              {dict.explore}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={`/${lang}/artists`}
                  className="hover:text-primary transition-colors"
                >
                  {dict.links.artists}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/news`}
                  className="hover:text-primary transition-colors"
                >
                  {dict.links.news}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="hover:text-primary transition-colors"
                >
                  {dict.links.events}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="hover:text-primary transition-colors"
                >
                  {dict.links.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider">
              {dict.contact}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:info@umpmusic.com"
                  className="hover:text-primary transition-colors"
                >
                  info@umpmusic.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  className="hover:text-primary transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://spotify.com"
                  className="hover:text-primary transition-colors"
                >
                  Spotify
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} UMPmusic. {dict.rights}
          </p>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              {dict.developer}{" "}
              <a
                href="https://kirian.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline"
              >
                kirian.dev
              </a>{" "}
              de UMP
            </span>
            <Separator orientation="vertical" className="h-4 bg-white/10" />
            <Link
              href={`/${lang}/login`}
              className="hover:text-white transition-colors"
            >
              {dict.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
