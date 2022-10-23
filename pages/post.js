import { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function Post() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //post validation.
    if (!post.description) {
      toast.error("Description Field is empty 😅");
      return;
    }

    if (post.description.length > 300) {
      toast.error("Description is too long 😅");
      return;
    }

    try {
      const collectionRef = collection(db, "posts");
      const res = await addDoc(collectionRef, {
        ...post,
        timeStamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Post created successfully! ✨");
      return route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="shadow-lg my-20 p-12 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p className={`text-sm text-gray-400`}>
            <span
              className={post.description.length > 300 ? "text-red-600" : ""}
            >
              {post.description.length}
            </span>
            /300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium rounded-lg p-2 my-2 text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Post;
