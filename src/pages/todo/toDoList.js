import React, { useState, useReducer, useEffect, createRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { Button, Input, InputCheckbox } from '../../utils/style-components';
import { theme } from '../../utils/constants';
import {
	BsFillTrashFill,
	BsPlusLg,
	BsFillFileEarmarkPostFill,
} from 'react-icons/bs';

const InputForm = (props) => {
	const { handleSubmit, handleChange, value } = props;
	return (
		<form onSubmit={(e) => handleSubmit(e)} className='text-center'>
			<Input
				type='text'
				value={value}
				onChange={(e) => handleChange(e)}
				placeholder='Add new task'
			/>
			<Button type='submit' value='Submit'>
				<BsPlusLg /> Add New
			</Button>
		</form>
	);
};
const ListButton = (props) => {
	const { handleDelete, handleMarkDone, handleEdit, id, refButton, status } =
		props;
	let isChecked = status ? 'checked' : '';
	return (
		<div className='list-button' ref={refButton}>
			<InputCheckbox
				type='checkbox'
				onChange={handleMarkDone}
				checked={isChecked}
			/>
			<Button className={`btn-edit-${id}`} onClick={handleEdit}>
				Edit
			</Button>
			<Button onClick={handleDelete}>
				<BsFillTrashFill /> Delete
			</Button>
		</div>
	);
};
const ListButtonShowTask = (props) => {
	let {
		handleShowUncompletedTasks,
		handleShowCompletedTasks,
		handleShowAllTasks,
	} = props;
	return (
		<div className='list-button-show-task  text-center'>
			<Button onClick={handleShowAllTasks}>Show all tasks</Button>
			<Button onClick={handleShowCompletedTasks}>Show complete tasks</Button>
			<Button onClick={handleShowUncompletedTasks}>
				Show uncompleted tasks
			</Button>
		</div>
	);
};

let initialState = {
	toDoList: [
		{ task: "Bush one's teeth", status: false },
		{ task: 'Comb', status: false },
		{ task: 'Have breakfast', status: false },
	],
	completed: [],
	uncompleted: [],
};

export default function ToDoList() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [value, setValue] = useState('');
	const [elRefs, setElRefs] = React.useState([]);
	const [editElRefs, setEditElRefs] = React.useState([]);
	const STATUS = { ALL: 1, COMPLETED: 2, UNCOMPLETED: 3 };
	const [statusFilter, setStatusFilter] = React.useState(STATUS.ALL);
	const [currentTodoList, setCurrentTodoList] = React.useState(state.toDoList);

	useEffect(() => {
		if (statusFilter == 1) {
			setCurrentTodoList(state.toDoList);
		}
		if (statusFilter == 2) {
			setCurrentTodoList(state.completed);
		}
		if (statusFilter == 3) {
			setCurrentTodoList(state.uncompleted);
		}
	}, [state.completed, state.toDoList, state.uncompleted, statusFilter]);

	useEffect(() => {
		// add or remove refs
		setElRefs((elRefs) =>
			currentTodoList.map((_, i) => elRefs[i] || createRef())
		);
		setEditElRefs((editElRefs) =>
			currentTodoList.map((_, i) => editElRefs[i] || createRef())
		);
	}, []);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		let newTodo = { task: value, status: false };
		dispatch({ type: 'addTodo', payload: newTodo });
		setValue('');
	};

	const handleDelete = (task) => {
		console.log('handleDelete=>', task);

		dispatch({ type: 'removeTodo', payload: task });
	};
	let isClicked = false;

	const handleEdit = (id) => {
		let value = elRefs[id].current.value;
		elRefs[id].current.readOnly = !elRefs[id].current.readOnly;
		console.log(
			'handleEdit editElRefs[id]',
			editElRefs[id].current.children[0]
		);
		editElRefs[id].current.children[1].innerHTML = !isClicked ? 'Save' : 'Edit';
		isClicked &&
			editElRefs[id].current.children[1].innerHTML === 'Edit' &&
			dispatch({ type: 'editTodo', payload: { id, value } });
		elRefs[id].current.value = null;
		isClicked = !isClicked;
	};

	const handleMarkDone = (id) => {
		console.log('handleMarkDone=>', id);

		dispatch({ type: 'markDoneTodo', payload: id });
	};

	const handleShowCompletedTasks = (list, status) => {
		console.log('completedTodo =>', status, list);
		setStatusFilter(STATUS.COMPLETED);

		dispatch({ type: 'completedTodo', payload: { list, status } });
	};

	const handleShowUncompletedTasks = (list, status) => {
		console.log('uncompletedTodo =>', list, status);
		setStatusFilter(STATUS.UNCOMPLETED);

		dispatch({ type: 'uncompletedTodo', payload: { list, status } });
	};

	const handleShowAllTasks = (list) => {
		console.log('allTodo =>', list);
		setStatusFilter(STATUS.ALL);

		dispatch({ type: 'allTodo', payload: list });
	};

	return (
		<ThemeProvider theme={theme}>
			<div>
				<h1 className='text-center'>To Do List</h1>
				<InputForm
					handleSubmit={(e) => handleSubmit(e)}
					handleChange={handleChange}
					value={value}
				/>
				<br />
				<ListButtonShowTask
					handleShowCompletedTasks={() => handleShowCompletedTasks(state, true)}
					handleShowUncompletedTasks={() =>
						handleShowUncompletedTasks(state, false)
					}
					handleShowAllTasks={() => handleShowAllTasks(state)}
				/>
				<br />
				<h3>List</h3>
				<ul className='show-todos'>
					{Object.entries(currentTodoList).map(([key, value], index) => {
						return (
							<li key={index} className={`${key}-${index}`}>
								<Input
									ref={elRefs[index]}
									readOnly
									type='text'
									placeholder={value.task}
								/>
								<ListButton
									id={index}
									status={value.status}
									refButton={editElRefs[index]}
									handleDelete={() => handleDelete(value.task)}
									handleEdit={() => handleEdit(index)}
									handleMarkDone={() => handleMarkDone(index)}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</ThemeProvider>
	);
}
const reducer = (state, action) => {
	switch (action.type) {
		case 'addTodo': {
			return { ...state, ...{ toDoList: [...state.toDoList, action.payload] } };
		}
		case 'removeTodo':
			let newValue = state.toDoList.filter(
				(item) => item.task !== action.payload
			);
			return { ...state, ...{ toDoList: [...newValue] } };

		case 'editTodo': {
			state.toDoList[action.payload.id].task = action.payload.value;
			return { ...state, ...{ toDoList: state.toDoList } };
		}

		case 'markDoneTodo':
			let index = action.payload;
			state.toDoList[index].status = true;
			return { ...state, ...{ toDoList: state.toDoList } };

		case 'allTodo':
			return state;

		case 'completedTodo': {
			let completedList = state.toDoList.filter((item) => item.status === true);
			return { ...state, ...{ completed: [...completedList] } };
		}

		case 'uncompletedTodo': {
			let unCompletedList = state.toDoList.filter(
				(item) => item.status === false
			);
			return { ...state, ...{ uncompleted: [...unCompletedList] } };
		}

		default:
			break;
	}
};
