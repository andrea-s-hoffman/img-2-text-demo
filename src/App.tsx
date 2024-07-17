import { useContext } from "react";
import UserContext from "./context/UserContext";
import { signInWithGoogle, signOutOfGoogle } from "./firebaseConfig";
import AddFoodFlow from "./components/AddFoodFlow";

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
      <main>{user ? <AddFoodFlow /> : <p>Log in to upload an image</p>}</main>
    </>
  );
}

export default App;
