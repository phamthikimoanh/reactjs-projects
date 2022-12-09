import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages/home/Home.js';
import ToDoList from './pages/todo/toDoList.js';
import ColorPallettes from './pages/convert_color/ColorPallettes.js';
import DrumMachine from './pages/drumMarchine/index';

const StyleBody = styled.div`
	padding: 0 3rem;
	width: 80%;
	max-width: 100%;
	position: relative;
	right: 0;
	top: 0;
	margin: 2rem;
`;

export default function Body() {
	return (
		<StyleBody>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='to-do-list' element={<ToDoList />} />\{' '}
				<Route path='color-pallettes' element={<ColorPallettes />} />\{' '}
				<Route path='drum-machine' element={<DrumMachine />} />\{' '}
			</Routes>
		</StyleBody>
	);
}
