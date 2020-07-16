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

export default class App extends Component{

	constructor(props){
		super(props);
		this.state = {
					imageUrl:"",
					input:"",
					box:{},
					route:'signin',
		}
	}

	calculateFaceLocation = (data)=>{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(clarifaiFace,width,height);
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

	onBtnSubmit = () =>{
		this.setState({ imageUrl:this.state.input })

		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    		.catch(err=>console.log(err))
	}

	onRouteChange = (route) =>{
		this.setState({route:route})
	}

	render(){
	return(
		<div>
			<Particles className="particles"
						params={particlesOption} />
			<Navigation onRouteChange={this.onRouteChange} route = {this.state.route} />
			{this.state.route === 'signin'
				? <SignIn onRouteChange = {this.onRouteChange} />
				: this.state.route === 'register'
					? <Register onRouteChange = {this.onRouteChange} />
					: <div>
						<Logo />
						<Rank />
						<ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit ={this.onBtnSubmit}/>
						<FaceRecognition box={this.state.box} url={this.state.imageUrl} />
					  </div>
			}
		</div>
		)
	}
}