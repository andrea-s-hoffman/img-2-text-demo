import { useContext } from "react";
import ImageUploader from "./components/ImageUploader";
import UserContext from "./context/UserContext";
import { signInWithGoogle, signOutOfGoogle } from "./firebaseConfig";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Image to Text Demo</h1>
        {user ? (
          <button onClick={signOutOfGoogle}>Log out</button>
        ) : (
          <button onClick={signInWithGoogle}>Log in</button>
        )}
      </header>
      <main>{user ? <ImageUploader /> : <p>Log in to upload an image</p>}</main>
    </>
  );
}

export default App;
