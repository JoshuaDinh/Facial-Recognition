import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';
// import axios from 'axios';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'

// const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'e090a0ce4cab4a7cb72c2fe565bf00b2'
});


const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        }
      }
    }
  }

 


  
class App extends React.Component{
  state = { 
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false

}
calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
  
}

  
  

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange= (route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  
  

  render() {
    
  return (
    <div>
         <Particles className='particles'
              params={particlesOptions}
          />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home' 
      ? <div>
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onSubmit={this.onSubmit} />
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>}
      </div>
      : 
        this.state.route ==='signin' 
      ? <SignIn onRouteChange={this.onRouteChange} />
      : <Register onRouteChange={this.onRouteChange} />
      
    }
  </div>
  );
 }
}

export default App;
