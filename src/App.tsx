import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./common/hooks/hooks";
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "./reducers/appReducer";
import CustomizedSnackbars from "./common/ErrorSnacbar/ErrorSnacbar";
import Header from "./components/Header/Header";
import TodoLists from "./components/TodoLists/TodoLists";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/Login/LoginPage";


const App = () => {

    let status = useAppSelector<RequestStatusType>(state => state.app.status)

    const dispatch = useAppDispatch()

    return (
        <div className="App">
            <Header/>
            <div style={{height: '10px'}}>
                {status === 'loading' && <LinearProgress/>}
            </div>
            <CustomizedSnackbars/>
            <Routes>
                <Route path='/' element={<TodoLists/>}></Route>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/404' element={<div>404: page not found</div>}></Route>
                <Route path='/*' element={<Navigate to='/404'/>}/>
            </Routes>
        </div>
    );
}

export default App;




