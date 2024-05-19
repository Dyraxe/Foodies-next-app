"use client";
import Image from "next/image";
import { useRef, useState } from "react";

import classes from "./image-picker.module.css";
export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);

  // ref is similar to the query selector
  const imageInput = useRef();

  function handlePickClick() {
    // forward the click, from the button, to the input, since the input was hidden from the UI, in order to use a controlled button

    imageInput.current.click();
  }

  // used to show the image's preview on the ui
  function handleImageChange(event) {
    // to allow for multiple files pick, use the "multiple" property on the input

    const [file] = event.target.files;
    if (!file) return setPickedImage(null);

    // lets read the file stored in the browser, works asynchronously
    const fileReader = new FileReader();

    // sets callback to be called when the files load
    fileReader.onload = () => {
      // the image will be available through prototype.result
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    // the result will be a data url, which works as src's value
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} fill alt="Image selected by the user" />
          )}
        </div>
        <input
          ref={imageInput}
          id={name}
          name={name}
          className={classes.input}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <button
          onClick={handlePickClick}
          type="button"
          className={classes.button}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
