import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-black p-4 flex justify-between items-center sticky top-0 z-10">
        <Link
          href="/admin"
          className="font-bold text-white tracking-tight hover:text-primary transition-colors"
        >
          UMP ADMIN
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-500 hidden md:inline-block">
            {user.email}
          </span>
          <form action="/auth/signout" method="post">
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/50 text-red-500 hover:bg-red-950"
            >
              <LogOut className="mr-2 h-4 w-4" /> Salir
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
