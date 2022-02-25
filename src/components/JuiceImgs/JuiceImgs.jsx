import React from "react";
import { Link } from "react-router-dom";
import { Grid, GridColumn, GridRow, Image, Icon, Card } from "semantic-ui-react";


function JuiceImgs({ 
    juices,
    addFavorite,
    removeFavorite,
    user
}) {
    const favoriteIndex = juices.favorite.findIndex(favorite => favorite.username === user.username)


  const favoriteColor = favoriteIndex > -1 ? 'yellow' : 'grey';

  const clickHandler = favoriteIndex > -1 ? () => removeFavorite(juices.favorite[favoriteIndex]._id) : () => addFavorite(juices._id)

    return (
        <Grid columns={2}>
            <GridRow columns={2}>
                <GridColumn>
                <Image
                    src={juices?.imgUrl ? juices.imgUrl : ''}
                />
                </GridColumn>
            </GridRow>
                <GridColumn extra textAlign={"right"}>
	                <Icon name={"heart"} size="large" color={favoriteColor} onClick={clickHandler}/>
	                {juices.favorites.length} Favorites
	            </GridColumn>
        </Grid>
    )
}

export default JuiceImgs