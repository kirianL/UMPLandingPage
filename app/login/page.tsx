"use client";

import { useState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    } catch (e) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      {/* LEFT COLUMN - FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative z-10 border-r border-white/5">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-primary rotate-45" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Portal Administrativo
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Bienvenido de nuevo
            </h1>
            <p className="text-neutral-400 text-sm">
              Ingresa tus credenciales para acceder al sistema.
            </p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                  htmlFor="email"
                >
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@umpmusic.com"
                  required
                  className="bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-700 h-12 focus:border-primary/50 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-700 h-12 focus:border-primary/50 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-4 pt-2">
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest h-12 text-xs"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "INGRESAR"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer Credit */}
        <div className="absolute bottom-8 left-0 w-full text-center lg:text-left lg:px-32">
          <p className="text-[10px] text-neutral-700 font-mono">
            © 2026 UMP MUSIC GROUP. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN - VISUAL / TEXT */}
      <div className="hidden lg:flex w-1/2 bg-neutral-900/30 relative items-center justify-center overflow-hidden border-l border-white/5">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/50 to-black z-0" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-0"></div>

        <div className="relative z-10 p-12 text-center select-none">
          <h2
            className="text-[8rem] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-black/20"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
          >
            UMP
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent my-8 opacity-50" />
          <p className="text-xl font-mono text-primary uppercase tracking-[1em] indent-[1em]">
            ACCESO
          </p>
        </div>
      </div>
    </div>
  );
}
