import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // blocking the exectuion for simulating a real world DB request
  // only for develpoment purposes
  await new Promise((resolve) => setTimeout(resolve, 2));
  return db.prepare("SELECT * FROM meals").all();
}
