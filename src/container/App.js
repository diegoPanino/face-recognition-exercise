import React,{Component} from 'react';
import Particles from 'react-particles-js';
import {Navigation} from '../component/navigation/Navigation';
import {Logo} from '../component/logo/Logo';
import {ImageLinkForm} from '../component/imageLinkForm/ImageLinkForm.js';
import {Rank} from '../component/rank/Rank.js';


import '../css/App.css';

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
					input:"",
		}
	}

	onInputChange = (e)=>{
		console.log(e.target.value)
	}

	onBtnSubmit = () =>{
		console.log("bnt click")
	}

	render(){
	return(
		<div>
			<Particles className="particles"
						params={particlesOption} />
			<Navigation />
			<Logo />
			<Rank />
			<ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit ={this.onBtnSubmit}/>
		</div>
		)
	}
}