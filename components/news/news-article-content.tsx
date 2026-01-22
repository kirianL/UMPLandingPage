"use client";

interface NewsArticleContentProps {
  paragraphs: string[];
}

export default function NewsArticleContent({
  paragraphs,
}: NewsArticleContentProps) {
  return (
    <article className="md:col-span-10 prose prose-invert prose-base md:prose-lg max-w-none">
      <style jsx global>{`
        article p:first-of-type::first-letter {
          float: left;
          font-size: 4.5rem;
          line-height: 0.85;
          font-weight: 900;
          margin-right: 0.5rem;
          margin-top: 0.1rem;
          color: #18943a;
          font-family: var(--font-quilon), sans-serif;
        }

        @media (max-width: 768px) {
          article p:first-of-type::first-letter {
            font-size: 3.5rem;
            margin-right: 0.35rem;
          }
        }

        article p {
          color: rgb(212 212 212);
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.0625rem;
        }

        @media (min-width: 768px) {
          article p {
            font-size: 1.125rem;
            line-height: 1.9;
          }
        }

        article h2,
        article h3 {
          color: #18943a;
          font-family: var(--font-quilon), sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }

        article h2 {
          font-size: 1.875rem;
          border-bottom: 2px solid rgba(24, 148, 58, 0.3);
          padding-bottom: 0.75rem;
        }

        @media (min-width: 768px) {
          article h2 {
            font-size: 2.25rem;
          }
        }

        article h3 {
          font-size: 1.5rem;
        }

        @media (min-width: 768px) {
          article h3 {
            font-size: 1.875rem;
          }
        }

        article a {
          color: #18943a;
          text-decoration: none;
          border-bottom: 1px solid rgba(24, 148, 58, 0.4);
          transition: all 0.2s;
        }

        article a:hover {
          color: white;
          border-bottom-color: white;
        }

        article strong {
          color: white;
          font-weight: 700;
        }

        article blockquote {
          border-left: 4px solid #18943a;
          background: rgba(24, 148, 58, 0.05);
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          font-style: normal;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        article blockquote p {
          color: rgb(229 229 229);
          font-size: 1.125rem;
        }

        article ul,
        article ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        article li {
          color: rgb(212 212 212);
          margin-bottom: 0.75rem;
          line-height: 1.8;
        }

        article li::marker {
          color: #18943a;
        }

        article img {
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }
      `}</style>

      {paragraphs.map((paragraph: string, idx: number) => {
        const trimmed = paragraph.trim();
        if (!trimmed) return null;

        // Detect headings (all caps, short)
        if (
          trimmed.length < 60 &&
          trimmed === trimmed.toUpperCase() &&
          trimmed.length > 3
        ) {
          return <h3 key={idx}>{trimmed}</h3>;
        }

        return <p key={idx}>{paragraph}</p>;
      })}
    </article>
  );
}
