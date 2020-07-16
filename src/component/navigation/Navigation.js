import React from 'react';

import './css/navigation.css';

export const Navigation = ({onRouteChange, route}) =>{
	return(
		route === 'signin' 
		?	 <nav>
				<p onClick={()=>onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
		 	 </nav>
		: 	route === 'register'
				? 	<nav>
						<p onClick={()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign in</p>
		  			</nav>
		  		: 	<nav>
		  				<p onClick={()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign out</p>
		  			</nav>
		)}
