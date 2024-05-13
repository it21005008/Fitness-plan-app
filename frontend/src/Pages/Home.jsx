import React, { useEffect, useState } from "react";
import Post from '../components/Home/Post'
import CreateNewPost from '../components/Home/CreateNewPost'
import { getPosts } from '../services/Posts'

function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  const listPosts = () => {
    return posts.map((post) => {
      return <Post post={post} key={post.id} />;
    });
  }

  return (
    <div className='space-y-3'>
      <CreateNewPost />
      {listPosts()}
    </div>
  )
}

export default Home;
