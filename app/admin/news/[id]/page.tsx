import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditNewsForm from "./edit-form";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: newsItem } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (!newsItem) {
    notFound();
  }

  return <EditNewsForm newsItem={newsItem} />;
}
