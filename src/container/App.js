import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import {Navigation} from '../component/navigation/Navigation';
import {Logo} from '../component/logo/Logo';
import {ImageLinkForm} from '../component/imageLinkForm/ImageLinkForm.js';
import {Rank} from '../component/rank/Rank.js';
import {FaceRecognition} from '../component/faceRecognition/FaceRecognition.js';
import {SignIn} from '../component/signIn/SignIn.js';
import {Register} from '../component/register/Register.js';

import '../css/App.css';

const app = new Clarifai.App({
	apiKey:"69b3ec3d9f8f446bb0ac60c9bc1f2524"
})

const particlesOption = {
	particles: {
		number:{
			value:100,
			density:{
				enable:true,
				value_area:800
			}
		}
	}
}

const initialState = {
					imageUrl:"",
					input:"",
					box:{},
					route:'signin',
					isLoggedIn:false,
					user:{
						id:"",
						name:"",
						email:"",
						signed:"",
						count:""
					}
		}

export default class App extends Component{

	constructor(props){
		super(props);
		this.state = {
					imageUrl:"",
					input:"",
					box:{},
					route:'signin',
					isLoggedIn:false,
					user:{
						id:"",
						nome:"",
						email:"",
						signed:"",
						count:""
					}
		}
	}
	
	calculateFaceLocation = (data)=>{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol:clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height),
		}
	}

	displayFaceBox = (box) =>{
		this.setState({box:box});
	}

	onInputChange = (e)=>{
		this.setState({input:e.target.value})
	}

	onImageSubmit = () =>{
		this.setState({ imageUrl:this.state.input })

		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => {
				if(response){
					fetch("http://localhost:3001/image",{
						method:"put",
						headers:{'Content-Type':"application/json"},
						body:JSON.stringify({id:this.state.user.id})
					})
					.then(response => response.json())
					.then(count =>{
						this.setState(Object.assign(this.state.user, { count: count}))
					})
				}
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
    		.catch(err=>console.log(err))
	}

	onRouteChange = (route) =>{
		if(route === "home"){
			this.setState({isLoggedIn:true,route:route})
		}
		else if (route === "signin"){
			this.setState(Object.assign(this.state,initialState))
		}
		else{
			this.setState({isLoggedIn:false,route:route})
		}
		
	}

	loadUser=(data)=>{
		this.setState({user:{
			id:data.user_id,
			nome:data.name.charAt(0).toUpperCase()+data.name.slice(1),
			email:data.email,
			signed:data.signed,
			count:data.count
			}
		})
	}

	render(){
		const {route,user,box,imageUrl} = this.state
	return(
		<div>
			<Particles className="particles"
						params={particlesOption} />
			<Navigation onRouteChange={this.onRouteChange} route = {route} />
			{route === 'signin'
				? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
				: route === 'register'
					? <Register onRouteChange = {this.onRouteChange} />
					: <div>
						<Logo />
						<Rank name={user.nome}rank={user.count} />
						<ImageLinkForm onInputChange={this.onInputChange} onImageSubmit ={this.onImageSubmit}/>
						<FaceRecognition box={box} url={imageUrl} />
					  </div>
			}
		</div>
		)
	}
}