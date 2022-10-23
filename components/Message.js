function Message({ post, children }) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <img src={post.avatar} className="w-6 rounded-full" />
        <h2>{post.username}</h2>
      </div>
      <div className="mt-4">
        <p>{post.description}</p>
      </div>
      {children}
    </div>
  );
}

export default Message;
