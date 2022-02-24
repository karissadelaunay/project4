import Header from "../../components/Header/Header";
import { useNavigate, Link } from "react-router-dom";
import userService from "../../utils/userService";
import { Grid } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import * as juiceAPI from "../../utils/juiceApi";

const Juice = (props) => {
    const [juice, setJuice] = useState([])
    const [error, setError] = useState("");

    // const imgData = [{
    //     imgUrl: ''
        
    // }]

    async function getJuice() {
        console.log(juice, "this is the juicesss")
        try {
          const data = await juiceAPI.getAll();
          console.log(data, " this is data,");
          setJuice([...data.imgUrl]);
        } catch (err) {
          console.log(err.message, " this is the error");
          setError(err.message);
        }
      }

      useEffect(() => {
        getJuice();
      }, []);

    // useEffect(() => {
        // async function getJuice(imgData) {
        //     try {
        //       const data = await userService.getJuice(imgData);
        //       console.log(data, " <- data");
        //       setJuice(() => imgData);
        //       console.log(imgData, 'this is the data in the images array')
              
        //     } catch (err) {
        //       console.log(err);
        //       setError("No juices here!");
        //     }
        //   }
      
        //   getJuice(imgData);
        // console.log(juice, "this is the juicesss")
    // },[])

    return (
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header handleLogout={props.handleLogout} user={props.user}/>
            </Grid.Column>
          </Grid.Row>
          {/* <Image src={ props.juice.imgUrl } /> */}
         </Grid>
      );
    }


export default Juice