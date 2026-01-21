"use client";

import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  url?: string;
  dict: {
    share_text_prefix: string;
    copy_success: string;
    copy_error: string;
    button_title: string;
  };
}

export default function ShareButton({ title, url, dict }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title: title,
      text: `${dict.share_text_prefix}${title}`,
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
        toast.success(dict.copy_success);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error(dict.copy_error);
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleShare}
      className="h-8 w-8 hover:bg-white/10 hover:text-primary rounded-full transition-colors"
      title={dict.button_title}
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
    </Button>
  );
}
