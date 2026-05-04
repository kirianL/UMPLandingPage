"use client";

interface NewsArticleContentProps {
  paragraphs: string[];
}

export default function NewsArticleContent({
  paragraphs,
}: NewsArticleContentProps) {
  return (
    <article className="md:col-span-10 max-w-none">
      <style jsx global>{`
        /* ═══ EDITORIAL BASE ═══ */
        .editorial-body {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          max-width: 680px;
        }

        /* ═══ PARAGRAPHS ═══ */
        .editorial-body p {
          color: hsl(var(--foreground) / 0.85);
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 0.25rem;
          margin-top: 0;
          text-align: left;
        }

        /* Consecutive paragraphs get a small indent for flow — editorial style */
        .editorial-body p + p {
          text-indent: 1.5em;
          margin-top: 0;
        }

        @media (min-width: 768px) {
          .editorial-body p {
            font-size: 1.0625rem;
            line-height: 1.85;
            margin-bottom: 0.35rem;
          }
        }

        /* ═══ DROP CAP — first paragraph ═══ */
        .editorial-body p:first-of-type {
          text-indent: 0;
        }

        .editorial-body p:first-of-type::first-letter {
          float: left;
          font-size: 3.75rem;
          line-height: 0.8;
          font-weight: 900;
          margin-right: 0.4rem;
          margin-top: 0.15rem;
          color: hsl(var(--primary));
          font-family: var(--font-quilon), Georgia, serif;
        }

        @media (min-width: 768px) {
          .editorial-body p:first-of-type::first-letter {
            font-size: 4.5rem;
            margin-right: 0.5rem;
          }
        }

        /* ═══ HEADINGS ═══ */
        .editorial-body h2,
        .editorial-body h3 {
          color: hsl(var(--primary));
          font-family: var(--font-quilon), Georgia, serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .editorial-body h2 {
          font-size: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid hsl(var(--primary) / 0.25);
        }

        @media (min-width: 768px) {
          .editorial-body h2 {
            font-size: 1.875rem;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
          }
        }

        .editorial-body h3 {
          font-size: 1.25rem;
        }

        @media (min-width: 768px) {
          .editorial-body h3 {
            font-size: 1.5rem;
          }
        }

        /* ═══ LINKS ═══ */
        .editorial-body a {
          color: hsl(var(--primary));
          text-decoration: none;
          border-bottom: 1px solid hsl(var(--primary) / 0.4);
          transition: all 0.2s;
        }

        .editorial-body a:hover {
          color: hsl(var(--foreground));
          border-bottom-color: hsl(var(--foreground));
        }

        /* ═══ INLINE ELEMENTS ═══ */
        .editorial-body strong {
          color: hsl(var(--foreground));
          font-weight: 700;
        }

        .editorial-body em {
          font-style: italic;
          color: hsl(var(--foreground) / 0.9);
        }

        /* ═══ BLOCKQUOTES ═══ */
        .editorial-body blockquote {
          border-left: 3px solid hsl(var(--primary));
          background: hsl(var(--primary) / 0.05);
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
          font-style: normal;
          border-radius: 0 0.375rem 0.375rem 0;
        }

        .editorial-body blockquote p {
          color: hsl(var(--foreground) / 0.9);
          font-size: 1.0625rem;
          text-indent: 0 !important;
          margin-bottom: 0;
        }

        /* ═══ LISTS ═══ */
        .editorial-body ul,
        .editorial-body ol {
          margin: 1rem 0;
          padding-left: 1.25rem;
        }

        .editorial-body li {
          color: hsl(var(--foreground) / 0.85);
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }

        .editorial-body li::marker {
          color: hsl(var(--primary));
        }

        /* ═══ IMAGES ═══ */
        .editorial-body img {
          border-radius: 0.375rem;
          border: 1px solid hsl(var(--border));
          margin: 1.5rem 0;
        }

        /* ═══ SEPARATOR — for visual breaks between thematic blocks ═══ */
        .editorial-body .separator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 2rem 0;
          color: hsl(var(--muted-foreground) / 0.5);
          font-size: 0.75rem;
          letter-spacing: 0.3em;
        }

        .editorial-body .separator::before,
        .editorial-body .separator::after {
          content: '';
          flex: 1;
          height: 1px;
          background: hsl(var(--border));
        }
      `}</style>

      <div className="editorial-body">
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
      </div>
    </article>
  );
}
