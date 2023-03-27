import { useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];

const init = () => {
  return JSON.parse( localStorage.getItem('todos')) || [];
};

export const useTodos = () => {

  const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {
      localStorage.setItem( 'todos', JSON.stringify( todos ));
    }, [ todos ])
    
    const onNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add todo',
            payload: todo 
        }
        dispatch( action );
    };

    const onRemoveTodo = ( id ) => {
      dispatch({
        type: '[TODO] Remove todo',
        payload: id
      });
    };

    const onToggleTodo = ( id ) => {
      dispatch({
        type: '[TODO] Toggle todo',
        payload: id
      });
    };

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter( todo => !todo.done).length;
  
  return {
    todos,
    onNewTodo,
    onRemoveTodo,
    onToggleTodo,
    todosCount,
    pendingTodosCount
  }
}
