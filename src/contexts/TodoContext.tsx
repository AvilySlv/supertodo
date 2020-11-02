import React, { createContext, useEffect, useState } from 'react';
import TodoContextType from '../interfaces/TodosContextType';
import Todo from './../interfaces/Todo';
import { get, save } from './../services/TodosServices';

export const TodosContext = createContext<TodoContextType>({
    todos: [],
    deleteEnabled: false,
    toggleDelete: () => {},
    addTodo: () => {},
    removeTodo: () => {},
    toggleTodo: () => {}
});

const TodoContextProvider = (props: any) => {

    const [todos, setTodos] = useState<Todo[]>(get);

    useEffect(() => {
        save(todos);
        console.log("Changed");
    }, [todos]);

    const [deleteEnabled, setDeleteEnabled] = useState(false);

    const toggleDelete = (toggle: boolean) => {
        setDeleteEnabled(toggle);
        setTodos([...todos]);
    }

    const addTodo = (title: string) => {
        const todo = { id: todos.length+1, title, done: false }
        setTodos([...todos, todo]);
        return;
    }

    const removeTodo = (todo: Todo) => {
        const index = todos.indexOf(todo);
        setTodos(todos.filter((i, item) => item !== index));
        console.log(todos);
    }

    const toggleTodo = (todo: Todo) => {
        const index = todos.indexOf(todo);
        todos[index].done = !todo.done;
        setTodos([...todos]);
    }


    return (
        <TodosContext.Provider value={{ todos, toggleDelete, deleteEnabled, addTodo, removeTodo, toggleTodo }}>
            {props.children}
        </TodosContext.Provider>
    )
}

export default TodoContextProvider;