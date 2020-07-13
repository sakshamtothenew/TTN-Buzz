import React from 'react'
import classes from './RolePage.module.css'
import Input from '../UI/Input/input'
const RolePage = (props) => {
    const inputObj = {
        elementType: "select",
        elementConfig: {
            type: "text",
            placeholder: "Status",
            options: ["SuperAdmin", "Admin"],
        },
        validation: {
            required: true,
            checkOptions: true
        },
        value: "Select Role",
        label: "",
        classname: "PCSelect",
        valid: true,
        touched: false
    }

    return (
        <div className={classes.SelectRoleBox}>
            <h4>Please Select Your Role</h4>
            <Input
                type={inputObj.elementType}
                elementConfig={inputObj.elementConfig}
                placeholder={inputObj.elementConfig.placeholder}
                value={inputObj.value}
                invalid={!inputObj.valid}
                changed = {props.setRoleHandler}
                classname={inputObj.classname} />
        </div>)
}


export default RolePage