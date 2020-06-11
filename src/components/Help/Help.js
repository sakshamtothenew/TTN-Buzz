import React from 'react'
import classes from './help.module.css'
import support from '../../assets/support.png'
import contact from '../../assets/contact.png'
import suggestion from '../../assets/suggestion.png'

const HelpPage = () => {

    return (
        <div className={classes.container}>
            <div className={classes.banner}>
                <div className = {classes.tint}>
                    <h1>WE ARE HERE TO HELP YOU</h1>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.card}>
                    <img src={contact} alt="contact" />
                    <p>email1</p>
                    <p>email2</p>
                    <p>tothnewLink</p>
                </div>
                <div className={classes.card}>
                    <img src={support} alt="support" />
                    <p>email1</p>
                    <p>email2</p>
                    <p>tothnewLink</p>
                </div>
                <div className={classes.card}>
                    <img src={suggestion} alt="suggestions" />
                    <p>email1</p>
                    <p>email2</p>
                    <p>tothnewLink</p>
                </div>
            </div>
        </div>
    )
}


export default HelpPage