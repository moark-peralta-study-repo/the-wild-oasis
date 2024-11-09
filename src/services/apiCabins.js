import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imgPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  // Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded.");
  }

  // Create Cabin with the image URL
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imgPath }])
    .select();

  if (error) {
    console.error(error);
    // If there is an error, delete the uploaded image from storage
    await supabase.storage.from("cabin-images").remove([imgName]);
    throw new Error("Cabin could not be created.");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
