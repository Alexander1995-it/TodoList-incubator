import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./components/EtidTitle";
import s from './Task.module.css'
import {changeStatusAC, editTaskAC, removeTaskAC} from "./reducers/tasksReducer";
import {useDispatch} from "react-redux";
import {TaskType} from "./api/todolistsApi";


export type TaskPropsType = {
    task: TaskType
    todoListID: string
}

const Task = React.memo(({task, todoListID}: TaskPropsType) => {
    const dispatch = useDispatch()

    const editTaskHandler = (taskID: string, newTitle: string) => {
        dispatch(editTaskAC(todoListID, taskID, newTitle))
    }
    const onClickHandler = () => dispatch(removeTaskAC(todoListID, task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC(todoListID, task.id, e.currentTarget.checked))
    }

    return (
        <li className={task.status === 1 ? "is-done" : ""}>
            <Checkbox defaultChecked onChange={onChangeHandler} checked={task.status === 2}/>
            <EditableSpan callBack={(title) => editTaskHandler(task.id, title)} title={task.title}/>
            <button onClick={onClickHandler}>x</button>
        </li>
    );
});

export default Task;