import sql from "better-sqlite3";
import slugify from "slugify";
import fs from "node:fs";
import xss from "xss";
import { redirect } from "next/navigation";
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

export async function saveMeal(meal) {
  try {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    await writeImageToFs(meal);
    db.prepare(
      `
     INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
      )
     `,
    ).run(meal);
  } catch (err) {
    throw err;
  }
  redirect("/meals");
}

async function writeImageToFs(meal) {
  const ext = meal.image.name.split().pop();
  const fileName = `${meal.slug}-${String(Math.random()).slice(-4)}.${ext}`;

  // creates a stream that allow us to write data to a certain path
  // will return a stream object that can be used to write to that path
  // the file name of the file I want to write to needs to be included
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  // needs a chunk = in the case of a image, it means we need a buffer
  const bufferedimage = await meal.image.arrayBuffer();

  // needs to convert to an actual buffer since ArrayBuffer isn't of type Buffer -> Buffer.from()

  // write to the specified path
  // the first argument is what I want to write
  // the second is the success callback, as argument to it an error parameter is provided, it will be null if everything was ok, an error object else
  stream.write(Buffer.from(bufferedimage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  // remove the public path since by default all requests for images go to public, it is as if were the root
  meal.image = `/images/${fileName}`;
}
