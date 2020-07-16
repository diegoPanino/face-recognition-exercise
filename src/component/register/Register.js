import React,{Component} from 'react';

export class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			name:"",
			email:"",
			password:"",
		}
	}

	onNameChange=(e)=>{
		this.setState({name:e.target.value})
	}

	onEmailChange=(e)=>{
		this.setState({email:e.target.value})
	}

	onPasswordChange=(e)=>{
		this.setState({password:e.target.value})
	}

	onSubmitRegister=()=>{
		const {name,email,password} = this.state;
		this.setState({name:"",email:"",password:""})
		fetch('http://localhost:3001/register',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				name:name,
				email:email,
				password:password
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)
				data === 1
					?	this.props.onRouteChange('signin')
					: 	this.props.onRouteChange('register')
		})
		.catch(err=>console.log(err))
			
	}

	render(){
		
		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">	
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        		type="text"
				        		name="name"  
				        		id="name"
				        		onChange = {this.onNameChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        		type="email"
				        		name="email-address"  
				        		id="email-address"
				        		onChange = {this.onEmailChange} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        		type="password" 
				        		name="password"
				        		id="password" 
				        		onChange = {this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
						       onClick={this.onSubmitRegister}
						       >Register</button>
				    </div>
				    
				  </div>
				</main>
			</article>
			);}
}