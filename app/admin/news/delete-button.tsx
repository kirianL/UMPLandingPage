"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteNewsButton({ newsId, newsTitle }: { newsId: string; newsTitle: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar la noticia "${newsTitle}"?\n\nEsta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("news").delete().eq("id", newsId);

      if (error) {
        alert("Error al eliminar la noticia: " + error.message);
      } else {
        router.refresh();
      }
    } catch (e) {
      alert("Error inesperado al eliminar la noticia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
    </Button>
  );
}
