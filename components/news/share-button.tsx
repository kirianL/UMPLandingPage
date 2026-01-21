"use client";

import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title: title,
      text: `Lee esta noticia en UMP Music: ${title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Enlace copiado al portapapeles");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error("No se pudo copiar el enlace");
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleShare}
      className="h-8 w-8 hover:bg-white/10 hover:text-primary rounded-full transition-colors"
      title="Compartir"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
    </Button>
  );
}
