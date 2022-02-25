import Header from "../../components/Header/Header";
import { useNavigate, Link } from "react-router-dom";
// import userService from "../../utils/userService";
import { Grid } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import * as juiceAPI from "../../utils/juiceApi";
import * as favoritesAPI from "../../utils/favoriteApi";
import JuiceImgs from "../../components/JuiceImgs/JuiceImgs";



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

      async function addFavorite(postId) {
        try {
          const data = await favoritesAPI.create(juices);
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
              <JuiceImgs juices={juices[0]}/>
              <JuiceImgs juices={juices[1]} />
              <JuiceImgs juices={juices[2]} />
              <JuiceImgs juices={juices[3]} />
              <JuiceImgs 
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
            />
            </Grid.Column>
          </Grid.Row>
         </Grid>
      );
    }


export default Juice