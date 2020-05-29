import React, { useState } from 'react'
import {Route , Switch} from 'react-router-dom'
import Activities from '../ArticleSection/Activities/Activities.Article'
import ActivityForm from '../Forms/Buzz/buzz.form'
import LostnFound from '../ArticleSection/Lost-Found/LostnFound'
import classes from './BuzzPage.module.css'

const BuzzPage = (props) => {
const [buzz , setBuzz] = useState("Activity")

const onBuzzSelectHandler = (Buzz) => {
    setBuzz(Buzz)
}
    return (
        <div>
            <ActivityForm />
            <div className = {classes.switchbtn}>
                <div onClick = {() => onBuzzSelectHandler("Activity")} className = {classes.activity}>Activities</div>
                <div onClick = {() => onBuzzSelectHandler("LostnFound")}className = {classes.lostnfound}>Lost n Found</div>
            </div>
          { buzz === "Activity" ? <Activities user={props.user} /> : <LostnFound />}
        </div>
    )
}


export default BuzzPage