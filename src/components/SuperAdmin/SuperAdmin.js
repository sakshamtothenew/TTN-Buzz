import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/index.actions'
import Wrapper from '../UI/Wrapper/Wrapper'
import { Table, Tab } from 'react-bootstrap'
import Input from '../UI/Input/input'
const SuperAdmin = () => {


    const dispatch = useDispatch();
    const get_all_users = () => dispatch(actions.get_all_users())
    const update_user = (updationObj) => dispatch(actions.update_userDetails(updationObj))
    const allUsers = useSelector(state => state.superAdmin.users)


    const inputState = {
        Role: {
            elementType: "select",
            elementConfig: {
                type: "text",
                placeholder: "Status",
                options: ["Employee", "Admin"],
            },
            value: "",
            label: "",
            classname: "CTSelect"
        },
        department: {
            elementType: "select",
            elementConfig: {
                type: "text",
                placeholder: "Status",
                options: ["HR", "Admin", "Transport", "Finance"],
            },
            value: "",
            label: "",
            classname: "CTSelect"
        }

    }


    useEffect(() => {
        get_all_users()
    }, [])


    const departmentChangedHandler = (event, index) => {
        const updationObj = {
            _id: allUsers[index]._id,
            department: event.target.value,
            Role: allUsers[index].type
        }
        update_user(updationObj);

    }

    const roleChangedHandler = (event, index) => {
        const updationObj = {
            _id: allUsers[index]._id,
            department: allUsers[index].department,
            Role: event.target.value
        }
        update_user(updationObj);
    }

    let usersList = [];
    if (allUsers) {
        usersList = allUsers.map((eachUSer, index) => {

            return (
                <tr>
                    <td>{eachUSer.name}</td>
                    <td>{eachUSer.email}</td>
                    <td><Input
                        type={inputState.department.elementType}
                        elementConfig={inputState.department.elementConfig}
                        label={inputState.department.label}
                        classname={inputState.department.classname}
                        value={eachUSer.department}
                        changed={(event) => departmentChangedHandler(event, index)}
                    /></td>
                    <td> <Input
                        type={inputState.Role.elementType}
                        elementConfig={inputState.Role.elementConfig}
                        label={inputState.Role.label}
                        classname={inputState.Role.classname}
                        value={eachUSer.type}
                        changed={(event) => roleChangedHandler(event, index)}
                    /></td>
                </tr>
            )
        })
    }

    return (
        <Wrapper heading="All Users">
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>department</td>
                        <td>Role</td>
                    </tr>
                </thead>
                <tbody>
                    {usersList}
                </tbody>
            </Table>
        </Wrapper>
    )
}


export default SuperAdmin