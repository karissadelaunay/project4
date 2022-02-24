import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import * as likesAPI from "../../utils/likeApi";

export default function ProfilePage(props) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { username } = useParams();

  console.log(username, " <----- this username");
  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " <- data");

      setLoading(() => false);
      setPosts(() => data.posts);
      setUser(() => data.user);
    } catch (err) {
      console.log(err);
      setLoading(() => false);
      setError("Profile Does not exist!");
    }
  }

  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId);
      console.log(data, " this is from addLike");
      getProfile(); 
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      getProfile(); 
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  // async function updateBio(userId) {
  //   try {
  //     const data = await userService.updateBio(userId)
  //     getProfile();
  //   } catch(err){
  //     console.log(err.message);
  //     setError(err.message)
  //   }
  // }

  useEffect(() => {

    async function getProfile() {
      try {
        const data = await userService.getProfile(username);
        console.log(data, " <- data");
  
        setLoading(() => false);
        setPosts(() => data.posts);
        setUser(() => data.user);
      } catch (err) {
        console.log(err);
        setLoading(() => false);
        setError("Profile Does not exist!");
      }
    }

    getProfile();
  }, [username]);

  if (loading) {
    return (
      <>
        <Header handleLogout={props.handleLogout} user={props.user} />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header handleLogout={props.handleLogout} user={props.user} />
        <ErrorMessage error={error} />;
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header handleLogout={props.handleLogout} user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostFeed
            isProfile={true}
            posts={posts}
            numPhotosCol={3}
            user={props.user}
            addLike={addLike}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}