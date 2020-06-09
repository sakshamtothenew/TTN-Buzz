import React from 'react'
import classes from './login.module.css'
import ttnlogo from '../../assets/ttnlogo.png'

const Login = () => {


    return (
        <React.Fragment>
            <div className={classes.container}>

            </div>
            <div className={classes.loginDiv}>
                <img src = {ttnlogo}  alt="ttnlogo"/>
                <p>Create your own buzz</p>
                <a href = "/auth/google" class="btn btn-block btn-social btn-google">
                    <span class="fa fa-google"></span> Sign in with google
                </a>
            </div>
        </React.Fragment>


    )
}


export default Login