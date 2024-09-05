import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        todoIndex: undefined,
        edit:false,
        editSubtodo:false,
        subtodoIndex: undefined,
    },
    reducers: {
        getTodos: (state, action) => {
            state.todos = action.payload
        },
        addTodos: (state, action) => {
            const { todo } = action.payload
            state.todos = [...state.todos, todo];
        },
        deleteTodos: (state, action) => {

            state.todos = state.todos.filter(todo => todo._id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { todoId, input } = action.payload;
            let index = state.todos.findIndex(todo => todo._id === todoId)
            state.todos = state.todos.map((todo, i) => i === index ? { ...todo, name: input } : todo)
        },
        editTodo: (state, action) => {
            const { index,Edit } = action.payload
            state.edit = Edit;
            state.todoIndex = index
        },
        editSubTodo: (state, action) => {
            const { index,Edit } = action.payload
            state.editSubtodo = Edit;
            state.subtodoIndex = index
        },
        updateSubTodo: (state, action) => {
            const { todoId, subTodoId, input } = action.payload;
            let Todoindex = state.todos.findIndex(todo => todo._id === todoId);
            let subTodoIndex = state.todos[Todoindex].subTodo.findIndex(subtodo => subtodo._id === subTodoId);
            state.todos[Todoindex].subTodo = state.todos[Todoindex].subTodo.map((subtodo, i) => i === subTodoIndex ? { ...subtodo, content: input } : subtodo)
        },
        updateTodoIndex: (state, action) => {
            state.todoIndex = action.payload
        },
        addSubTodosinTodo: (state, action) => {
            // receive data from action.payload like todoId,subTodo,
            // find Index of todo Object by TodoId in state of todos
            // add subTodo in state.todos[index].subTodo
            const { todoId, subtodo } = action.payload;
            let index = state.todos.findIndex(todo => todo._id === todoId);
            state.todos[index].subTodo.push(subtodo);
        },
        deleteSubTodosinTodo: (state, action) => {
            const { todoId, subTodoId } = action.payload;
            let index = state.todos.findIndex(todo => todo._id === todoId);
            state.todos[index].subTodo = state.todos[index].subTodo.filter(minitodo => minitodo._id !== subTodoId);
        }
    }
})

export const { addTodos, deleteTodos, getTodos, addSubTodosinTodo, deleteSubTodosinTodo, updateSubTodo, updateTodo, editTodo,editSubTodo } = TodoSlice.actions;

const todo = TodoSlice.reducer

export { todo }