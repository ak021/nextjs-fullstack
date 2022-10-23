import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Loader from "../../components/Loader";

function login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("Login");
    }
  }, [user]);

  //sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogin}
          className="gap-2 text-white bg-gray-700 w-full font-medium rounded-lg flex p-4 align-middle"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default login;
