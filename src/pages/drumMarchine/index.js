import React, { Fragment, useEffect, useRef, useState } from 'react';

import { bankOne, bankTwo } from './data.js';
import './style.css';

const DrumPad = (props) => {
	const { power, volume, bank, updateDisplay } = props;
	let listMp3 = bank === true ? bankOne : bankTwo;
	if (!listMp3.length) {
		return "Don't have data";
	}
	const renderList = () => {
		return listMp3.map((el, index) => (
			<Fragment key={index}>
				<ButtonPad
					el={el}
					volume={volume}
					power={power}
					updateDisplay={updateDisplay}
				/>
			</Fragment>
		));
	};
	return <div className='drums'>{renderList()}</div>;
};

const ButtonPad = (props) => {
	let { el, volume, power, updateDisplay } = props;
	const divElement = useRef(null);
	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	});

	const handlePlayAudio = (name) => {
		var elAudio = divElement.current.children[0];
		const VOLUME = parseInt(volume) / 100 || 0;
		elAudio.volume = VOLUME;
		if (power === true) {
			elAudio.play();
		}
		updateDisplay(name);
	};

	function handleKeyPress(e) {
		if (e.keyCode === el.keyCode) {
			console.log(el.keyTrigger);
			handlePlayAudio(el.id);
		}
	}

	return (
		<div
			tabIndex='0'
			key={el.keyTrigger}
			className='drum-pad'
			id={el.id}
			onClick={() => handlePlayAudio(el.id)}
			ref={divElement}
		>
			<audio controls className='clip' id={el.keyTrigger} src={el.url}>
				<source src={el.url} type='audio/mpeg' />
				Your browser does not support the audio element.
			</audio>
			{el.keyTrigger}
		</div>
	);
};
function BtnSwitch(props) {
	const { name, isTurnOnOff, handleChangeCheck, inputRef } = props;
	const turnType = isTurnOnOff ? ' on' : ' off';
	return (
		<div>
			<p>
				{name}
				{name === 'Power' ? turnType : ''}
			</p>
			<label className='switch'>
				<input
					type='checkbox'
					ref={inputRef}
					onClick={() => handleChangeCheck(name)}
				/>
				<span className='slider'></span>
			</label>
		</div>
	);
}
const Slider = ({ value, handleVolume }) => {
	return (
		<div className='slidecontainer'>
			<p>Volume: {value}</p>
			<input
				type='range'
				min={0}
				max={100}
				className='custom-slider'
				id='myRange'
				onChange={(e) => handleVolume(e)}
			/>
		</div>
	);
};

function DrumMachine() {
	const [{ bank, isPower, volume, name }, setStateDrum] = useState({
		bank: true,
		isPower: true,
		volume: 50,
		name: '',
	});

	const handleChangeVolume = (event) => {
		setStateDrum(() => ({
			...{ bank, isPower, volume, name },
			volume: event.target.value,
		}));
	};
	const handleChecked = (name) => {
		if (name === 'Power') {
			setStateDrum((prevState) => ({
				...{ bank, isPower, volume, name },
				isPower: !prevState.isPower,
			}));
		} else {
			setStateDrum((prevState) => ({
				...{ bank, isPower, volume, name },
				bank: !prevState.bank,
			}));
		}
	};
	const updateNameDisplay = (name) => {
		setStateDrum(() => ({
			...{ bank, isPower, volume, name },
			name: name,
		}));
	};
	return (
		<div id='drum-machine'>
			<div>
				<DrumPad
					power={isPower}
					volume={volume}
					bank={bank}
					updateDisplay={(name) => updateNameDisplay(name)}
				/>
				<div>
					<BtnSwitch
						name='Power'
						isTurnOnOff={isPower}
						handleChangeCheck={() => handleChecked('Power')}
						inputRef={(e) => (e = isPower ? 'checked' : '')}
					/>
					<BtnSwitch
						name='Bank'
						isTurnOnOff={bank}
						handleChangeCheck={() => handleChecked('Bank')}
						inputRef={(e) => (e = bank ? 'checked' : '')}
					/>
					<p>Sound type: {name}</p>
					<Slider value={volume} handleVolume={(e) => handleChangeVolume(e)} />
				</div>
			</div>
		</div>
	);
}

export default DrumMachine;
