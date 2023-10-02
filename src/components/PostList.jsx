import axios from "axios";
import React, { useState } from "react";

const PostList = ({ posts }) => {
  const [contact, setContact] = useState({
    favorite: false,
  });

  return (
    <div>
      {posts.length > 0 ? (
        <div className="cards">
          {posts.map((post) => (
            <div className="card" key={post.id}>
              <h2>{post.name}</h2>
              <h3>{post.username}</h3>
              <h6>{post.phone}</h6>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PostList;
