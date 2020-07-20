import React from 'react';

import './css/faceRecognition.css';

export const FaceRecognition=({url,box})=>{
	return(
		url === "" ? ""
		:	<div className="center ma">
					<div className="absolute mt2">
						<img id="inputImage" src={url} alt="Face Recognise" width="500px" height="auto" />
						<div className="bounding-box" style={{top:box.topRow, right:box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
					</div>
				</div>
	
		);
}