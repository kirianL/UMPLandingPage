import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkSlug = searchParams.get("slug");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      {
        error: "Missing Env Vars",
        env: {
          NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseKey,
        },
      },
      { status: 500 },
    );
  }

  try {
    // Create a direct client to bypass cookies/headers for this test
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Basic Connection Test
    const { data: list, error: listError } = await supabase
      .from("artists")
      .select("slug, name, is_active")
      .limit(10);

    if (listError) {
      return NextResponse.json(
        {
          step: "List Artists",
          error: listError.message,
          details: listError,
        },
        { status: 500 },
      );
    }

    // 2. Specific Slug Check
    let slugCheck = null;
    if (checkSlug) {
      const { data: exact, error: exactError } = await supabase
        .from("artists")
        .select("*")
        .eq("slug", checkSlug)
        .maybeSingle();

      slugCheck = {
        searchedFor: checkSlug,
        foundExact: !!exact,
        data: exact,
        error: exactError?.message,
      };
    }

    return NextResponse.json({
      status: "Ok",
      connection: "Success",
      artistCount: list?.length || 0,
      recentArtists: list,
      slugCheck,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Exception",
        message: err.message,
      },
      { status: 500 },
    );
  }
}
