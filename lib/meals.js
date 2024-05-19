import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // only for development purposes

  // Simulates the delay of the DB's response
  await new Promise((resolve) => setTimeout(resolve, 20));

  // Simulates a failed request to the DB
  // throw new Error("Something went wrong!");

  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
