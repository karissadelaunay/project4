import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function PostCard({post, isProfile, user, addLike, removeLike}) { 


  const likedIndex = post.likes.findIndex(like => like.username === user.username)


  const likeColor = likedIndex > -1 ? 'yellow' : 'grey';


  // step 3 onClick Handler
  // if the user has liked the post, 
  // clickHandler = removeLike
  const clickHandler = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)
  // if the user hasn't liked the post
  // clickHandler = addLike


	
  return (
	<Card key={post._id} raised>
	{isProfile ? (
	  ""
	) : (
	  <Card.Content textAlign="left">
		<Card.Header>
		  <Link to={`/${post.user.username}`}>
			<Image
			  size="large"
			  avatar
			  src={
				post.user.photoUrl
				  ? post.user.photoUrl
				  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
			  }
			/>
			{post.user.username}
		  </Link>
		</Card.Header>
	  </Card.Content>
	)}
	<Image src={`${post.photoUrl}`} wrapped ui={false} />
	<Card.Content>
	  <Card.Description>{post.caption}</Card.Description>
      <Card.Description>{post.location}</Card.Description>
	</Card.Content>
	<Card.Content extra textAlign={"right"}>
	  <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler}/>
	  {post.likes.length} Likes
	</Card.Content>
  </Card>
  )
}

export default PostCard;