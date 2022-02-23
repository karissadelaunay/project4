import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";

import { useNavigate } from "react-router-dom";


export default function SignUpPage(props) {

  const [error, setError] = useState('')
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio: ''
  })

  const [selectedFile, setSelectedFile] = useState('')


  const navigate = useNavigate() 
 
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault();

    const formData = new FormData();

    formData.append('photo', selectedFile);

    for (let key in state){
      formData.append(key, state[key])
    }

    console.log(formData, ' <--- This Will show nothing!!')

    console.log(formData.forEach((item) => console.log(item)), " <-- this is how you look inside form data")

    try {

      await userService.signup(formData)
      props.handleSignUpOrLogin() 
      navigate('/') 

    } catch(err){
      setError(err.message)
    }

  }

  function handleFileInput(e){
    console.log(e.target.files);
    setSelectedFile(e.target.files[0])
  }

  return (
    <Grid
      style={{ backgroundImage: `url("https://imgur.com/APMUZfm.jpg")`, 
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh' }}
        textAlign="center"
       
        verticalAlign="middle"
      >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="grey" textAlign="center">
          <Image src="https://imgur.com/2vJhvOV.png" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              placeholder="Tell us more about your favorite juice..."
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
                required
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
