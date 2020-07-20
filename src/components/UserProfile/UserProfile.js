import React, { useState } from 'react'
import classes from './Userprofile.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import * as forms from './userProfile.util'
import Input from '../UI/Input/input'
import * as actions from '../../store/actions/index.actions'
const UserProfile = () => {

    const dispatch = useDispatch();

    const update_user_details = (_id, updateObj) => dispatch(actions.update_user_details(_id, updateObj))

    const user = useSelector(state => state.user.user)
    const [basicInfoEditable, setbasicIntoEditable] = useState(false)
    const [dobInfoEditable, setdobInfoEditable] = useState(false)
    const [contactInfoEditable, setContactInfoEditable] = useState(false)

    const [basicInfoForm, setBasicInfoForm] = useState(forms.basicInfoForm)
    const [dobInfoForm, setdobInfoForm] = useState(forms.dobInfoForm)
    const [contactInfoForm, setContactInfoForm] = useState(forms.contactForm)


    const editableHandler = (index) => {

        const setEditableFunctions = [
            {
                value: basicInfoEditable,
                function: setbasicIntoEditable,
                formValue: basicInfoForm,
                formValuefn: setBasicInfoForm
            },
            {
                value: dobInfoEditable,
                function: setdobInfoEditable,
                formValue: dobInfoForm,
                formVauefn: setdobInfoForm
            },
            {
                value: contactInfoEditable,
                function: setContactInfoEditable,
                formValue: contactInfoForm,
                formValuefn: setContactInfoForm
            }
        ];



        setEditableFunctions[index].function(!setEditableFunctions[index].value)
    }

    const style = {
        background: `url(${user.picture}) center center/cover `,
        borderRadius: "50%",
        height: "200px",
        width: "200px",
    }

    const inputChangedHandler = (event, inputIdentifier, state, setstateFunction) => {

        const currState = { ...state };
        const currStateObj = { ...currState[inputIdentifier] }
        currStateObj.value = event.target.value;
        currState[inputIdentifier] = currStateObj;
        setstateFunction(currState)
    }

    const initialValueState = (formState, formFunction) => {

        
    }
    const formSubmitHandler = (state, setEditableFunction, editableState) => {

        const updationObj = {};
        Object.keys(state).forEach(keys => {
            updationObj[keys] = state[keys].value
        })
        console.log(updationObj)
        update_user_details(user._id, updationObj)
        setEditableFunction(!editableState)
    }

    const cancelEditHandler = (state, setStateFunction, editableState, setEditableStateFunction) => {
        setEditableStateFunction(!editableState)
        setStateFunction(forms[state])

    }

    const returnInputRow = (state, setStateFunction) => {
        const inputRowArray = []
        Object.keys(state).forEach(keys => {
            inputRowArray.push(<td><Input
                type={state[keys].elementType}
                key={keys}
                elementConfig={state[keys].elementConfig}
                changed={(event) => inputChangedHandler(event, keys, state, setStateFunction)}
                label={state[keys].label}
                value={state[keys].value}
                classname={state[keys].classname}
            /></td>)
        })

        return inputRowArray;
    }

    let basicInfoFormRow = returnInputRow(basicInfoForm, setBasicInfoForm)
    let dobInfoFormRow = returnInputRow(dobInfoForm, setdobInfoForm)
    let contactFormRow = returnInputRow(contactInfoForm, setContactInfoForm)


    return (
        <div className={classes.outerContainer}>
            <div className={classes.container}>
                <div style={style} className={classes.imageSection}>
                </div>
                <div className={classes.infoSection}>
                    <div className={classes.name}>
                        <h3>{user.name}</h3>
                        <h5>Trainee</h5>
                    </div>
                    <div className={classes.about}>
                        <p><i class="fa fa-building" aria-hidden="true"></i> To The New Pvt. Ltd</p>
                        <p><i class="fa fa-globe" aria-hidden="true"></i> Mean</p>
                        <p><i class="fa fa-id-card-o" aria-hidden="true"></i> 4113</p>
                    </div>
                </div>
            </div>
            <div className={classes.bio}>
                <div className={classes.basicInformation}>
                    <div className={classes.boxHeader}>
                        <h4>Basic Information</h4>
                        <div className={classes.icon}>
                            {!basicInfoEditable ?
                                <i onClick={() => editableHandler(0)} class="far fa-edit"></i> :
                                <div className={classes.checkIcon}>
                                    <i onClick={() => formSubmitHandler(basicInfoForm, setbasicIntoEditable, basicInfoEditable)}
                                        className="fas fa-check"></i>
                                    <i
                                        onClick={() => cancelEditHandler("basicInfoForm", setBasicInfoForm, basicInfoEditable, setbasicIntoEditable)}
                                        className="fas fa-times"></i>
                                </div>}
                        </div>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Newer Id</th>
                                <th>Gender</th>
                                <th>Nationality</th>
                                <th>Marital Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!basicInfoEditable ? <tr>
                                <td>{user.newerId}</td>
                                <td>{user.gender}</td>
                                <td>{user.nationality}</td>
                                <td>{user.maritalStatus}</td>
                            </tr> : <tr>{basicInfoFormRow}</tr>}
                        </tbody>
                    </Table>
                </div>
                <div className={classes.basicInformation}>
                    <div className={classes.boxHeader}>
                        <h4>DOB Information</h4>
                        <div className={classes.icon}>
                            {!dobInfoEditable ?
                                <i onClick={() => editableHandler(1)} class="far fa-edit"></i> :
                                <div className={classes.checkIcon}>
                                    <i onClick={() => formSubmitHandler(dobInfoForm, setdobInfoEditable, dobInfoEditable)} className="fas fa-check"></i>
                                    <i onClick={() => cancelEditHandler("dobInfoForm", setdobInfoForm, dobInfoEditable, setdobInfoEditable)}
                                        className="fas fa-times"></i>
                                </div>}
                        </div>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Date of Birth</th>
                                <th>Country of Birth</th>
                                <th>Place of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!dobInfoEditable ? <tr>
                                <td>{user.dob}</td>
                                <td>{user.birthCountry}</td>
                                <td>{user.birthPlace}</td>
                            </tr> : <tr>{dobInfoFormRow}</tr>}
                        </tbody>
                    </Table>
                </div>
                <div className={classes.basicInformation}>
                    <div className={classes.boxHeader}>
                        <h4>Contact Information</h4>
                        <div className={classes.icon}>
                            {!contactInfoEditable ?
                                <i onClick={() => editableHandler(2)} class="far fa-edit"></i> :
                                <div className={classes.checkIcon}>
                                    <i onClick={() => formSubmitHandler(contactInfoForm, setContactInfoEditable, contactInfoEditable)} className="fas fa-check"></i>
                                    <i
                                        onClick={() => cancelEditHandler("contactForm", setContactInfoForm, contactInfoEditable, setContactInfoEditable)}
                                        className="fas fa-times"></i>
                                </div>}
                        </div>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Personal Email</th>
                                <th>Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!contactInfoEditable ?
                                (<tr>
                                    <td>{user.personalEmail}</td>
                                    <td>{user.mobileNumber}</td>
                                </tr>) : <tr>{contactFormRow}</tr>}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div >
    )
}


export default UserProfile