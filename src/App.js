import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";



const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box:{},
      route : "signin",
      isSignedIn : false,
      user : {
        id: "",
        name:"",
        email: "",
        entries : 0,
        joined : ""
      }
    }
  }


  loadUser = (data)=>{
    this.setState({user:{
        id: data.id,
        name:data.name,
        email: data.email,
        entries : data.entries,
        joined : data.joined
    }});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data)=>{
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : faceData.left_col * width,
      topRow : faceData.top_row * height,
      rightCol : width - (faceData.right_col * width),
      bottomRow : height - (faceData.bottom_row * height),
    }
  }

  displayFaceBox = (box)=>{
    this.setState({box:box});
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://evening-bayou-63561.herokuapp.com/imageDetectAPI",{
            method:"post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
              input : this.state.input,
            })
          }).then(response =>response.json())
      .then(response =>{
        if(response){
          fetch("https://evening-bayou-63561.herokuapp.com/image",{
            method:"put",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
              id : this.state.user.id,
            })
          }).then(response => response.json())
          .then(count => {
            console.log();
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
        .catch((err) => console.log(err));
      };


  onRouteChange = (route)=>{
    if(route === "signout"){
      this.setState({isSignedIn : false,imageUrl:""});
    }
    else if(route === "home"){
      this.setState({isSignedIn : true});
    }
    this.setState({route : route});
  }
  
      
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          this.state.route === "home" ? 
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
          :(
             this.state.route === "signin"
             ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
        
      </div>
    );
  }
}

export default App;
