import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Message from "../components/Message";

function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //check if user is logged in

  const getUserData = async () => {
    setIsLoading(true);

    if (!user) return route.push("/auth/login");

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    setIsLoading(false);
    return unsubscribe;
  };

  useEffect(() => {
    getUserData();
  }, [user, loading]);

  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  if (loading || isLoading) return <Loader />;

  return (
    <div>
      <h1>{userPosts.length ? "Your posts" : "You have no posts yet!"}</h1>
      <div>
        {userPosts.map((post) => (
          <Message key={post.id} post={post}>
            <div className="flex gap-4">
              <button
                onClick={() => deletePost(post.id)}
                className="text-red-500 flex items-center justify-center gap-2 pt-4 text-sm"
              >
                <BsTrash2Fill />
                delete
              </button>
              <Link href={{ pathname: "/post", query: post }}>
                <button className="text-green-500 flex items-center justify-center gap-2 pt-4 text-sm">
                  <AiFillEdit />
                  edit
                </button>
              </Link>
            </div>
          </Message>
        ))}
      </div>
      <button
        className="font-medium text-white bg-gray-800 py-2 px-4 rounded-md my-6"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}

export default Dashboard;
