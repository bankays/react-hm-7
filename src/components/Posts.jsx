import axios from "axios";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PostList from "./PostList";
import AddPost from "./AddPost";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [post, setPost] = useState({
    userId: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/posts");
      const data = res.data;
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/posts", post);
      console.log(res.data);
      fetchPosts();
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <ClipLoader
          color={"red"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : null}

      {error ? <h3>{error}</h3> : null}

      <AddPost
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <PostList loading={loading} posts={posts} error={error} />
    </div>
  );
};

export default Posts;
