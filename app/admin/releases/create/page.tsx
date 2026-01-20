import { createClient } from "@/lib/supabase/server";
import CreateReleaseForm from "./create-form";

export default async function CreateReleasePage() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return <CreateReleaseForm artists={artists || []} />;
}
