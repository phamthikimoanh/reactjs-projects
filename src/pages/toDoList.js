import React, { useState, useReducer, useEffect, createRef } from "react";
import { ThemeProvider } from "styled-components";
import { Button, Input, InputCheckbox } from "../utils/style-components";
import { theme } from "../utils/constants";
import {
  BsFillTrashFill,
  BsPlusLg,
  BsFillFileEarmarkPostFill,
} from "react-icons/bs";

const InputForm = (props) => {
  const { handleSubmit, handleChange, value } = props;
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="text-center">
      <Input
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder="Add new task"
      />
      <Button type="submit" value="Submit">
        <BsPlusLg /> Add New
      </Button>
    </form>
  );
};
const ListButton = (props) => {
  const { handleDelete, handleMarkDone, handleEdit, id, refButton, status } =
    props;
  let isChecked = status ? "checked" : "";
  return (
    <div className="list-button" ref={refButton}>
      <InputCheckbox
        type="checkbox"
        onChange={handleMarkDone}
        checked={isChecked}
      />
      <Button className={`btn-edit-${id}`} onClick={handleEdit}>
        <BsFillFileEarmarkPostFill /> Edit
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
    <div className="list-button-show-task  text-center">
      <Button onClick={handleShowAllTasks}>Show all tasks</Button>
      <Button onClick={handleShowCompletedTasks}>Show complete tasks</Button>
      <Button onClick={handleShowUncompletedTasks}>
        Show uncompleted tasks
      </Button>
    </div>
  );
};

let initialState = [
  { task: "Bush one's teeth", status: false },
  { task: "Comb", status: false },
  { task: "Have breakfast", status: false },
];

export default function ToDoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateShowTodo, dispatchShowTodo] = useReducer(reducerShowTodo, []);
  const [value, setValue] = useState("");
  const [formInput, setFormInput] = useState("");
  const [elRefs, setElRefs] = React.useState([]);
  const [editElRefs, setEditElRefs] = React.useState([]);

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) => state.map((_, i) => elRefs[i] || createRef()));
    setEditElRefs((editElRefs) =>
      state.map((_, i) => editElRefs[i] || createRef())
    );
  }, [state]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    let newTodo = { task: value, status: false };
    dispatch({ type: "addTodo", payload: newTodo });
    setValue("");
  };

  const handleDelete = (task) => {
    console.log("handleDelete=>", task);

    dispatch({ type: "removeTodo", payload: task });
  };
  let isClicked = false;

  const handleEdit = (id) => {
    let value = elRefs[id].current.value;
    elRefs[id].current.readOnly = !elRefs[id].current.readOnly;
    console.log("handleEdit editElRefs[id]", value);
    editElRefs[id].current.children[0].innerHTML = !isClicked ? "Save" : "Edit";
    isClicked &&
      editElRefs[id].current.children[0].innerHTML === "Edit" &&
      dispatch({ type: "editTodo", payload: { id, value } });
    elRefs[id].current.value = null;
    isClicked = !isClicked;
  };

  const handleMarkDone = (task) => {
    console.log("handleMarkDone=>", task);

    dispatch({ type: "markDoneTodo", payload: task });
  };

  const handleShowCompletedTasks = (list, status) => {
    console.log("completedTodo =>", status, list);

    dispatchShowTodo({ type: "completedTodo", payload: { list, status } });
  };

  const handleShowUncompletedTasks = (list, status) => {
    console.log("uncompletedTodo =>", list, status);

    dispatchShowTodo({ type: "uncompletedTodo", payload: { list, status } });
  };

  const handleShowAllTasks = (list) => {
    console.log("allTodo =>", list);

    dispatchShowTodo({ type: "allTodo", payload: list });
  };
  let currentTodoList =
    Array.isArray(stateShowTodo) && stateShowTodo.length > 0
      ? stateShowTodo
      : state;
  // console.log("stateShowTodo=>", stateShowTodo);
  // console.log("elRefs=>", elRefs);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 className="text-center">To Do List</h1>
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
        <ul className="show-todos">
          {Object.entries(currentTodoList).map(([key, value], index) => {
            return (
              <li key={index} className={`${key}-${index}`}>
                <Input
                  ref={elRefs[index]}
                  readOnly
                  type="text"
                  placeholder={value.task}
                />
                <ListButton
                  id={index}
                  status={value.status}
                  refButton={editElRefs[index]}
                  handleDelete={() => handleDelete(value.task)}
                  handleEdit={() => handleEdit(index)}
                  handleMarkDone={() => handleMarkDone(value.task)}
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
    case "addTodo": {
      return [...state, action.payload];
    }
    case "removeTodo":
      return state.filter((item) => item.task !== action.payload);

    case "editTodo": {
      // state[action.payload.id].task = action.payload.value;
      state = state.filter((item, index) => index !== action.payload.id);
      let newValue = { task: action.payload.value, status: false };
      return [...state, newValue];
    }

    case "markDoneTodo":
      return state.map((item) =>
        item.task === action.payload ? { ...item, status: !item.state } : item
      );

    default:
      break;
  }
};
const reducerShowTodo = (state, action) => {
  switch (action.type) {
    case "allTodo":
      return action.payload.list;

    case "completedTodo": {
      return action.payload.list.filter(
        (item) => item.status === action.payload.status
      );
    }

    case "uncompletedTodo": {
      return action.payload.list.filter(
        (item) => item.status === action.payload.status
      );
    }
    default:
      break;
  }
};


setTimeout(() => {
  
}, 2000);
curl --request GET \
  --url 'https://api.hubapi.com/cms/v3/hubdb/tables/2680813/rows?limit=100&one_off_purchase_id__in=RGG%20Digital%20Dentistry,RGG%20Restorative&hapikey=a75affba-c493-42d2-9aac-ccca8dcd1ecf'




&orderBy=heading&starter_content=true&one_off_purchase_id=RGG%20Digital%20Dentistry;Posterior%20Dentistry%20Lecture&visible_on_fronend=true
&orderBy=heading&starter_content=true&one_off_purchase_id_contains=Fast%20Natural%20Posterior%20Fillings;RGG%20Digital%20Dentistry&visible_on_fronend=true