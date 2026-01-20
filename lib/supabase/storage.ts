import { createAdminClient } from "./admin";

export async function uploadImage(
  file: File,
  bucket: string = "images",
  folder: string = "uploads",
) {
  const supabase = createAdminClient();

  // 1. Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.find((b) => b.name === bucket);

  if (!bucketExists) {
    const { error: createError } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ["image/*"],
    });

    if (createError) {
      console.error("Error creating bucket:", createError);
      // Fallback: try to upload anyway, maybe it exists but list failed (rare with admin)
      // or re-throw
    }
  }

  // 2. Upload
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${fileExt}`;

  // We need to convert File to ArrayBuffer for supabase-js in node env (actions)
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error("Error uploading image: " + uploadError.message);
  }

  // 3. Get Public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}
