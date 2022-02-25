import Header from "../../components/Header/Header";
import React, { useEffect, useState } from "react";
import * as juiceAPI from "../../utils/juiceApi";
import * as favoritesAPI from "../../utils/favoriteApi";
import JuiceImgs from "../../components/JuiceImgs/JuiceImgs";
import { Grid } from "semantic-ui-react";



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
      }, []);

    return (
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header handleLogout={props.handleLogout} user={props.user}/>
              {juices.map((juice) => (
                <JuiceImgs juice={juice} addFavorite={addFavorite} removeFavorite={removeFavorite} user={props.user}/>
              ))
              }
              
            </Grid.Column>
          </Grid.Row>
         </Grid>
      );
    }


export default Juice