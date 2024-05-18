import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // blocking the execution for simulating a real world DB request
  // only for development purposes
  await new Promise((resolve) => setTimeout(resolve, 20));
  return db.prepare("SELECT * FROM meals").all();
}