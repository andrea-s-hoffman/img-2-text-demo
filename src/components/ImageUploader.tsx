import { FormEvent, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { checkText, storage } from "../firebaseConfig";

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [textFromImg, setTextFromImg] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const newImage = files[0];
      const storageRef = ref(storage, newImage.name);
      uploadBytes(storageRef, newImage).then((uploadRes) => {
        getDownloadURL(uploadRes.ref).then((url) => {
          console.log(url);
          setTimeout(async () => {
            setTextFromImg(await checkText(uploadRes.ref.name));
            setLoading(false);
          }, 3000);
          formRef.current?.reset();
        });
      });
    }
  };

  return (
    <div className="ImageUploader">
      <form ref={formRef} onSubmit={submitHandler}>
        <input ref={fileInputRef} type="file" accept="image/jpeg" />
        <button>Get Text</button>
      </form>
      {loading ? (
        <p>LOADING...</p>
      ) : (
        <p>{textFromImg || "Upload an image to get text"}</p>
      )}
    </div>
  );
};

export default ImageUploader;
