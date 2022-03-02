// import PostCard from '../../components/PostCard/PostCard'
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// import Loading from "../../components/Loader/Loader";
// import * as postsAPI from "../../utils/postApi";
// import * as likesAPI from "../../utils/likeApi";
// import React, { useState, useEffect } from "react";
// import Header from "../../components/Header/Header";
// import { Grid } from "semantic-ui-react";
// import "./Featured.css";


// export default function Featured({
//     user,
//     handleLogout

// }) {
//     const [RandomPost, setRandomPost] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     async function addLike(postId) {
//         console.log(postId, "<-----this is the id of the post")
//         try {
//             setLoading(true)
//             const data = await likesAPI.create(postId);
//             console.log(data, " this is from addLike");
//             localStorage.setItem('featured', JSON.stringify(data.post))
//             setRandomPost(data.post);
//         } catch (err) {
//             console.log(err.message);
//             setError(err.message);
//         }
//     }

//     async function removeLike(likeId) {
//         console.log(likeId, "<----- this is the id of the like")
//         try {
//             setLoading(true)
//             const data = await likesAPI.removeLike(likeId);
//             console.log(data)
//             localStorage.setItem('featured', JSON.stringify(data.post))
//             setRandomPost(data.post);
//         } catch (err) {
//             console.log(err.message);
//             setError(err.message);
//         }
//     }


//     async function getRandomPostFromPosts() {
//         try {
//             const data = await postsAPI.getRandomPost();
//             console.log(data, " this is data,");
//             localStorage.setItem('featured', JSON.stringify(data.post[0]))
//             setRandomPost(localStorage.featured);
//         } catch (err) {
//             console.log(err.message, " this is the error");
//             setError(err.message);
//         }
//     }

//     function hasOneDayPassed() {
//         let date = new Date().toLocaleDateString();

//         if (localStorage.yourapp_date === date && localStorage.featured !== null) {
//             console.log(localStorage.yourapp_date, date, "<---this is local storage date")
//             return false;
//         }

//         localStorage.yourapp_date = date;
//         console.log(localStorage.yourapp_date, "<----the local storage stuff")
//         return true;
//     }

//     function runOncePerDay() {
//         if (hasOneDayPassed() === false) return false;
//         console.log("running get random posts")

//         localStorage.removeItem('featured')
//         getRandomPostFromPosts();
//     }

//     // useEffect(() => {
//     //     console.log("we are in the useEffect ayy")
//     //     runOncePerDay();
//     //     if(localStorage.featured) {
            
//     //         setRandomPost(JSON.parse(localStorage.featured._id));
//     //         const showPost = postsAPI.show(showPost._id).then((showPost) => setRandomPost(showPost))
//     //         console.log(showPost, "<------this is the post showing")
//     //     console.log(showPost._id, "<---this is the id of the post that I need to get from the backend")
//     //     }
//     //     setLoading(false);

//     // }, [loading]);

//     // useEffect(() => {
//     //     runOncePerDay();
//     //     if (localStorage.featured) {
//     //         const showPost = JSON.parse(localStorage.getItem('featured'));
//     //         console.log(showPost, "<-----this is showPost")
//     //         if (showPost) {
                
//     //             postsAPI.show(showPost._id).then((res) => setRandomPost(res))
//     //             console.log(RandomPost, "random stuff <----")
                
//     //         }
            
//     //     }else{
//     //         getRandomPostFromPosts();
//     //     }
//     //     setLoading(false)


//     // }, [getRandomPostFromPosts, runOncePerDay]);


//     useEffect(() => {
//         console.log("we are in the useEffect ayy")
//         runOncePerDay();
//         if (localStorage.featured){
//             const post = JSON.parse(localStorage.featured)
//             //setRandomPost(JSON.parsed(localStorage.featured._id))
//             console.log(post._id, "<---this is the id of the post that I need to get from the backend")
//             const showPost = postsAPI.show(post._id).then((showPost) => setRandomPost(showPost))
//             console.log(showPost, "<-----this is the post showing")
//             console.log(RandomPost, "<---this is the random post")
//             //if this is true I have to make my request to get the post with the same ID that is in JSON.parsed(localStorage.featured._id)
//         } 
//         setLoading(false);

//     }, [loading]);

import PostCard from '../../components/PostCard/PostCard'
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";
import "./Featured.css";


export default function Featured({
    getRandomPostFromPosts,
    user,
    handleLogout,
    addLike,
    removeLike

}){
    const [RandomPost, setRandomPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    console.log(RandomPost, "<---this is the random post")
  
    async function addLike(postId) {
        console.log(postId, "<-----this is the id of the post")
      try {
          setLoading(true)
        const data = await likesAPI.create(postId);
        console.log(data, " this is from addLike");
        localStorage.setItem('featured', JSON.stringify(data.post))
        // setRandomPost(localStorage.featured);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }
  
    async function removeLike(likeId) {
        console.log(likeId, "<----- this is the id of the like")
      try {
        setLoading(true)
        const data = await likesAPI.removeLike(likeId);
        console.log(data)
        localStorage.setItem('featured', JSON.stringify(data.post))
        // setRandomPost(localStorage.featured);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    }
  
  
    async function getRandomPostFromPosts() {
      try {
        const data = await postsAPI.getRandomPost();
        console.log(data, " this is data,");
        localStorage.setItem('featured', JSON.stringify(data.post[0]))
        setRandomPost(localStorage.featured);
      } catch (err) {
        console.log(err.message, " this is the error");
        setError(err.message);
      }
    }

    function hasOneDayPassed(){
  let date = new Date().toLocaleDateString();

  if( localStorage.yourapp_date == date && localStorage.featured != null) {
  console.log(localStorage.yourapp_date, date, "<---this is local storage date")
      return false;
  }

  localStorage.yourapp_date = date;
  console.log(localStorage.yourapp_date, "<----the local storage stuff")
  return true;
}

function runOncePerDay(){
    if( hasOneDayPassed() === false ) return false;
    console.log("running get random posts")
    
    localStorage.removeItem('featured')
    getRandomPostFromPosts();
  }


    useEffect(() => {
        console.log("we are in the useEffect ayy")
        runOncePerDay();
        if(localStorage.featured) setRandomPost(JSON.parse(localStorage.featured));
        setLoading(false);

    }, [loading]);

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
            <Grid centered>
                <Grid.Row>
                    <Grid.Column>
                        <Header handleLogout={handleLogout} user={user} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <h1>Featured Photo of the Day</h1>
                        <PostCard post={RandomPost} user={user} addLike={addLike} removeLike={removeLike} />
                        <h4>Check and see if YOUR photo is featured!</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}