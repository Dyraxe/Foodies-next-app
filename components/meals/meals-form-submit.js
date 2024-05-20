"use client";
import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  // it needs to be INSIDE a component that has a form as a parent in their tree
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {!pending && "Share Meal"}
      {pending && "Submitting meal..."}
    </button>
  );
}
