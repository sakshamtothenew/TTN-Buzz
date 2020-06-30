import React from 'react'
import classes from './Spinner.module.css'

const Spinner = (props) => {

    return (
        <div className={[classes.loader, classes[props.classname]].join(' ')}></div>
    )
}


export default Spinner