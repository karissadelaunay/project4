import PostCard from '../../components/PostCard/PostCard'
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";


export default function Featured({
    getRandomPostFromPosts,
    user,
    handleLogout,
    addLike,
    removeLike

}){
    const [RandomPost, setRandomPost] = useState(null); 
    // const [intervalCall, setInterval] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    console.log(RandomPost, "<---this is the random post")
  
    async function addLike(postId) {
      try {
        const data = await likesAPI.create(postId);
        console.log(data, " this is from addLike");
        getRandomPostFromPosts(); 
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }
  
    async function removeLike(likeId) {
      try {
        const data = await likesAPI.removeLike(likeId);
        getRandomPostFromPosts(); 
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }
  
  
    async function getRandomPostFromPosts() {
      try {
        const data = await postsAPI.getRandomPost();
        console.log(data, " this is data,");
        setRandomPost(data.post[0]);
        setLoading(false);
      } catch (err) {
        console.log(err.message, " this is the error");
        setError(err.message);
      }
    }
  
    // useEffect(() => {
    //     const intervalCall = setInterval(() => {
    //       getRandomPostFromPosts();
    //     }, 1000);
    //     return () => {
    //       // clean up
    //       clearInterval(intervalCall);
    //     };
    //   }, []);

    useEffect(() => {
        getRandomPostFromPosts();
    }, []);

    if (loading) {
        return (
          <>
            <Header handleLogout={handleLogout} user={user} />
            <Loading />
          </>
        );
      }
    
      if (error) {
        return (
          <>
            <Header handleLogout={handleLogout} user={user} />
            <ErrorMessage error={error} />;
          </>
        );
      } else {
    return (
        <>
        <Header handleLogout={handleLogout} user={user} />
        <h1>Featured Photo of the Day</h1>
        <PostCard post={RandomPost} user={user} addLike={addLike} removeLike={removeLike}/>
        </>
    )}
}