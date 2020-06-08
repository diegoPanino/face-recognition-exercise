import React from 'react';
import Tilt from 'react-tilt';
import brain from './img/brainIco.png';

import './css/logo.css';

export const Logo =()=>{
	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-3" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner">
					<img src={brain} alt="logo"/>
				</div>
			</Tilt>
		</div>	
		)
}