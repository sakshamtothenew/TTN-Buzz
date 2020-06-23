import React, { useEffect , useCallback } from 'react'
import { useDispatch  } from 'react-redux'
import classes from './MainDashboard.module.css'
import Header from '../Header/Header'
import MainBody from '../MainBody/MainBody'
import * as actions from '../../store/actions/index.actions'
import BuzzModal from '../BuzzPage/BuzzModal/BuzzModal'
const MainDashboard = () => {

    const dispatch = useDispatch();
    const setUsers =  useCallback(() => dispatch(actions.setUser()) , [dispatch])

    useEffect(() => {
        setUsers();
    }, [setUsers])

    return (
        <div className={classes.mainBody}>
            {/* <BuzzModal /> */}
            <Header />
            <MainBody />
        </div>
    )
}

export default MainDashboard