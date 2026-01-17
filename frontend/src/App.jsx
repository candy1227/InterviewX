import "./App.css";
import { SignInButton } from "@clerk/clerk-react";


function App() {

  return (
    <>
      <h1>Welcome to the app</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>


      <SignedIn>
        <SignedOutButton />
      </SignedIn>

      <UserButton />
    </>
  );
}

export default App
