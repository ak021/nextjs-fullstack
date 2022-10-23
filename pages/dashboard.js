import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { useEffect } from "react";

function dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //check if user is logged in

  const getUserData = async () => {
    if (loading) return <Loader />;
    if (!user) return route.push("/auth/login");
  };

  useEffect(() => {
    getUserData();
  }, [user, loading]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>posts</div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
}

export default dashboard;
