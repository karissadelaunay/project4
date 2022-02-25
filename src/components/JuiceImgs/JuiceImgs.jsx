import React from "react";
import { Link } from "react-router-dom";
import { Grid, GridColumn, GridRow, Image, Icon, Card } from "semantic-ui-react";


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
        <Grid>
            <GridRow>
                <GridColumn>
                <Image
                    src={juice?.imgUrl ? juice.imgUrl : ''}
                />
                </GridColumn>
            </GridRow>
                <GridColumn extra textAlign={"right"}>
	                <Icon name={"heart"} size="large" color={favoriteColor} onClick={clickHandler}/>
	                {juice?.favorites.length} Favorites
	            </GridColumn>
        </Grid>
    )
}

export default JuiceImgs