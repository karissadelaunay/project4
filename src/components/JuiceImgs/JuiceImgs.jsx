import React from "react";
import { Link } from "react-router-dom";
import { Image, Icon, Card, CardContent } from "semantic-ui-react";


function JuiceImgs({ 
    juice,
    addFavorite,
    removeFavorite,
    user
}) {
    const favoriteIndex = juice?.favorites.findIndex(favorite => favorite.username === user.username)
console.log( favoriteIndex, "<-------index")


const favoriteColor = favoriteIndex > -1 ? 'yellow' : 'grey';

const clickHandler = favoriteIndex > -1 ? () => removeFavorite(juice?.favorites[favoriteIndex]._id) : () => addFavorite(juice._id)


    return (
        <Card>
            <CardContent>
                <Image
                    src={juice?.imgUrl ? juice.imgUrl : ''}
                />
            </CardContent>
                <CardContent extra textAlign={"right"}>
	                <Icon name={"heart"} size="large" color={favoriteColor} onClick={clickHandler}/>
	                {juice?.favorites.length} Favorites
	            </CardContent>
        </Card>
    )
}

export default JuiceImgs