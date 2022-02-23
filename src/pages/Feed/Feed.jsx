import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostFeed from "../../components/PostFeed/PostFeed";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";
import "./Feed.css";
import { Grid } from "semantic-ui-react";

export default function Feed({ user, handleLogout }) {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId);
      console.log(data, " this is from addLike");
      getPosts(); 
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      getPosts(); 
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  async function handleAddPost(post) {
    try {
      setLoading(true);
      const data = await postsAPI.create(post); 
      console.log(data, " this is response from the server, in handleAddPost");
      setPosts([data.post, ...posts]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setError(err.message);
    }
  }

  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      console.log(data, " this is data,");
      setPosts([...data.posts]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  useEffect(() => {
    getPosts();
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
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Header user={user} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPost handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostFeed
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            user={user}
            addLike={addLike}
            loading={loading}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}