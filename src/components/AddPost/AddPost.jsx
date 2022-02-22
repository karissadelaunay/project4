import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddJuiceForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    caption: '',
    location: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile); // this key matches the key in multer in the 
	// routes/api/posts create route upload.single('photo')
    formData.append('caption', state.caption)
    formData.append('location', state.location)
   
	props.handleAddPost(formData)
    // Have to submit the form now! We need a function!
  }


  return (
    
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="caption"
                  value={state.caption}
                  placeholder="Tell us about your juice pic!"
                  onChange={handleChange}
                  required
              />   
              <Form.Input
                  className="form-control"
                  name="location"
                  value={state.location}
                  placeholder="Tell us where you are!"
                  onChange={handleChange}
                  required
              />  
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />   
              <Button
                type="submit"
                className="btn"
              >
                POST YOUR JUICES PIC!
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}