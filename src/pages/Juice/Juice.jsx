import Header from "../../components/Header/Header";
import React, { useEffect, useState } from "react";
import * as juiceAPI from "../../utils/juiceApi";
import * as favoritesAPI from "../../utils/favoriteApi";
import JuiceImgs from "../../components/JuiceImgs/JuiceImgs";
import { Grid, Sidebar, SidebarPushable, SidebarPusher } from "semantic-ui-react";



const Juice = (props) => {
    const [juices, setJuices] = useState([])
    const [error, setError] = useState("");

    async function getJuice() {
        try {
          const data = await juiceAPI.getAll();
          console.log(data, " this is data,");
          setJuices(data.juices);
          console.log(juices, "these are the juices")
        } catch (err) {
          console.log(err.message, " this is the error");
          setError(err.message);
        }
      }

      async function addFavorite(juiceId) {
        try {
          const data = await favoritesAPI.create(juiceId);
          console.log(data, " this is from addLike");
          getJuice(); 
        } catch (err) {
          console.log(err.message);
          setError(err.message)
        }
      }
    
      async function removeFavorite(favoritesId) {
        try {
          const data = await favoritesAPI.removeFavorite(favoritesId);
          console.log(data, '<-----delete data')
          getJuice(); 
        } catch (err) {
          console.log(err.message);
          setError(err.message)
        }
      }
    

      useEffect(() => {
        getJuice();
      });

    return (
        <Grid centered Column={2}>
            <Grid.Row>
                <Grid.Column>
            <Header handleLogout={props.handleLogout} user={props.user}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column style={{ maxWidth: 650 }}>
              {juices.map((juice) => (
                <JuiceImgs key={juice._id} juice={juice} addFavorite={addFavorite} removeFavorite={removeFavorite} user={props.user} />
              ))
              }
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>
            <SidebarPushable>Buy in stores at Alana's Coffee Roaster</SidebarPushable>
            <SidebarPusher>Located in West Hollywood and Venice</SidebarPusher>
            <SidebarPusher>Venice Location: 12511 Venice Blvd, Los Angeles, CA 90066</SidebarPusher>
            <SidebarPusher>WEHO Location: 634 N Robertson Blvd, West Hollywood, CA 90069</SidebarPusher>
            </Grid.Column>
            </Grid.Row>
        </Grid>
      );
    }


export default Juice