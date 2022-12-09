import React from 'react';

export default function ColorPallettes() {
	return (
		<div className='wrapper-main-color'>
			<h2>Color Pallettes</h2>
			<form id='formColor'>
				<input
					type='text'
					id='color'
					name='color'
					placeholder='Input color type  #000000 or rgb(0, 0, 0)'
				/>
				<br />
				<input id='submit' type='submit' value='Submit' />
			</form>

			<div id='list-color'></div>
		</div>
	);
}
