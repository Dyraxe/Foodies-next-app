"use server";
import { saveMeal } from "@/lib/meals";
// Server action, must be a function value provided to a form's action property
// The function must be asynchronous
export async function shareMeal(formData) {
  // Use server creates a server action, it's guaranteed to run on the server
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  await saveMeal(meal);
}

// They cannot be declared in a client component due to the way Next parses components, but can still be used if they are declared in a server file
