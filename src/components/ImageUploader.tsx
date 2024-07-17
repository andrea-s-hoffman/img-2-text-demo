import { FormEvent, useRef, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
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
      const storageRef = ref(storage, "image-" + new Date().getTime() + ".jpg");
      setTimeout(() => {
        document.querySelector(".progress-bar-fill")?.classList.add("start");
      }, 1);
      uploadBytes(storageRef, newImage).then((uploadRes) => {
        getDownloadURL(uploadRes.ref).then((url) => {
          console.log(url);
          document.querySelector(".progress-bar-fill")?.classList.add("end");
          setTimeout(async () => {
            const res = await checkText(uploadRes.ref.name);
            console.log(res, uploadRes.ref.name);
            setTextFromImg(res);
            setLoading(false);
            // delete from storage
            deleteObject(uploadRes.ref)
              .then(() => {
                console.log("succesfully deleted");
              })
              .catch((err) => {
                console.log("error deleting:", err);
              });
          }, 5000);
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
        <div className="progress-bar">
          <span className="progress-bar-fill"></span>
        </div>
      ) : (
        <p>{textFromImg || "Upload an image to get text"}</p>
      )}
    </div>
  );
};

export default ImageUploader;
