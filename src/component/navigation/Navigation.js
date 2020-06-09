import React from 'react';

import './css/navigation.css';

export const Navigation = ({onRouteChange}) =>{
	return(
		<nav>
			<p onClick={()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign out</p>
		</nav>
		)
}