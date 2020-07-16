import React, {Component} from 'react';

export class SignIn extends Component {
	constructor(props){
		super(props);
		this.state = {
						 email:"",
						 password:""		
		}
	}

	onEmailChange=(e)=>{
		this.setState({email:e.target.value})
	}

	onPasswordChange=(e)=>{
		this.setState({password:e.target.value})
	}

	onSubmitForm=(e)=>{
		fetch('http://localhost:3001/signin',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		}).then(response => response.json())
		.then(data=>{
			data === 1
				? this.props.onRouteChange('home')
				: alert("Unable to log in")
					
			})
		
	}

	render(){
		const {onRouteChange} = this.props;
	return(
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">	
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        		type="email" 
			        		name="email-address"  
			        		id="email-address" 
			        		onChange = {this.onEmailChange}/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        		type="password" 
			        		name="password"  
			        		id="password"
			        		onChange = {this.onPasswordChange} />
			      </div>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      			onClick={this.onSubmitForm} 
			      			type="submit" 
			      			value="Sign in"/>
			    </div>
			    <div className="lh-copy mt3">
			      <a href="#0" 
			      		className="f6 link dim black db"
			      		onClick={()=>onRouteChange('register')} >Register</a>
			    </div>
			  </div>
			</main>
		</article>
		)
}
}