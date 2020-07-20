import React from 'react';

export const Rank=({name,rank})=>{
	return(
		<div className="center">
			<div className="white f3">
				{name} you recognize { Number(rank) === 1 ? rank+" face" : rank+" faces"}
			</div>
		</div>
		);
}