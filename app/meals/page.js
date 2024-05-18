import classes from "./page.module.css";
import Link from "next/link";
import { Suspense } from "react";

import { getMeals } from "@/lib/meals";

import MealsGrid from "@/components/meals/meals-grid";

const loadingFallback = <p className={classes.loading}>Fetching meals...</p>;

async function Meals() {
  //  Next will wait for the function to resolve, meanwhile it will
  //  Show the Suspense's fallback
  //  Then the fetched content will streamed in the page, replacing the Suspense
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function ShareMealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself, It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={loadingFallback}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
