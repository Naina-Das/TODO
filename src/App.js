import React from 'react';
import React, { useReducer } from 'react';
import ToDoList from './ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

const todosInitialState = {
  todos: [
    { id: 1, text: 'finishing writing hooks chapter' },
    { id: 2, text: 'play with kids' },
    { id: 3, text: 'read bible' },
  ],
};
export const TodosContext = React.createContext();

export default function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  function todosReducer(state, action) {
    switch (action.type) {
      case 'add':
        const newToDo = { id: uuidv4(), text: action.payload };
        // add new todo onto array
        const addedToDos = [...state.todos, newToDo];
        // spread our state and assign tod
        return { ...state, todos: addedToDos };
      case 'edit':
        const updatedToDo = { ...action.payload };
        const updatedToDoIndex = state.todos.findIndex(
          (t) => t.id === action.payload.id
        );
        const updatedToDos = [
          ...state.todos.slice(0, updatedToDoIndex),
          updatedToDo,
          ...state.todos.slice(updatedToDoIndex + 1),
        ];
        return { ...state, todos: updatedToDos };

      case 'delete':
        const filteredTodoState = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        return { ...state, todos: filteredTodoState };
      default:
        return todosInitialState;
    }
  }
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider> //to make state and dispatch available to child components
    // <h1>Hey</h1>
  );
}
