import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './buzzModal.module.css'
import { useEffect } from 'react'
import * as actions from '../../../store/actions/index.actions'
import Input from '../../UI/Input/input'
import { checkValidity } from '../../../Util/Utility'
import styles from '../Activities/activity.module.css'
import placeholder from '../../../assets/placeholder.png'

const BuzzModal = (props) => {

    const inputObj = {
        elementType: "textarea",
        elementConfig: {
            type: "textarea",
            placeholder: "Add Comment..",
        },
        validation: {
            required: true
        },
        value: "",
        label: "",
        classname: "Comment",
        valid: false,
        touched: false
    }
    const dispatch = useDispatch();

    const close_modal = () => dispatch(actions.close_modal())
    const post_comments = (data) => dispatch(actions.post_comments(data))
    const get_replies = (commentId) => dispatch(actions.get_replies(commentId))
    const get_paginated_comments = (activityId, pageno) => dispatch(actions.getPaginatedcomments(activityId, pageno))
    const update_activity = (payload) => dispatch(actions.update_activity_content(payload))

    const show = useSelector(state => state.modal.show)
    const user = useSelector(state => state.user.user)
    const editable = useSelector(state => state.modal.edit)
    const activity = useSelector(state => state.modal.activity)
    
    const [replyid, setreplyid] = useState(null)
    const [commentInput, setCommentInput] = useState(inputObj)
    const [pageno, setPageNo] = useState(2);
    const [editing, setEditing] = useState({ bool: false, color: "orange" })
    const [inputArea, setInputArea] = useState({
        elementType: "textarea",
        elementConfig: {
            type: "textarea",
            placeholder: "Caption",
        },
        validation: {
            required: true
        },
        value: "",
        label: "",
        classname: "Caption",
        valid: false,
        touched: false
    })

    useEffect(() => {
        setPageNo(2);
        setEditing({ bool: false, color: "orange" })
    }, [show])


    const buzzCloseHandle = () => {
        close_modal()
    }

    const commentChangedHandler = (event, inputIdentifier) => {
        const currstate = { ...commentInput };
        currstate.value = event.target.value;
        currstate.valid = checkValidity(currstate.value, currstate.validation)
        setCommentInput(currstate)
    }


    const viewrepliesHandler = (event, commentId) => {
        get_replies(commentId)
    }
    const postCommentHandler = () => {
        const commentPostData = {};
        setCommentInput(inputObj)
        commentPostData.content = commentInput.value
        commentPostData.post_id = activity._id;
        commentPostData.pushed_by = user._id
        if (replyid !== null) {
            commentPostData.parent = replyid
        }
        post_comments(commentPostData);
        setreplyid(null)

    }

    const getPaginatedComment = (activityId) => {
        get_paginated_comments(activityId, pageno)
        setPageNo(pageno + 1)
    }
    const ref = React.createRef();
    const replyCommentHandler = (event, comment_id) => {
        setreplyid(comment_id)
        ref.current.focus()
    }

    const EditBtnHandler = () => {
        if (editing.bool) {

            const captionValue = inputArea.value;
            const payload = {
                _id: activity._id,
                content: captionValue
            }
            update_activity(payload)
            setEditing({ bool: false, color: "orange" })
        }
        else {
            setEditing({ bool: true, color: "green" })
        }
    }

    const captionChangeHandler = (event) => {
        const currstate = { ...inputArea };
        currstate.value = event.target.value;
        setInputArea(currstate)
    }

    let modalBody = null
    if (show) {
        const comments = activity.comments.map(eachComment => {
            return (
                <div className={classes.eachCommentDiv}>
                    <img className={classes.userimg} src={eachComment.commentUser.picture} />
                    <p className={classes.eachComment}>
                        <strong>{eachComment.commentUser.name} </strong>
                        {eachComment.content}
                    </p>
                    {eachComment.replies ? eachComment.replies.map((eachreply) => {
                        return (<p className={classes.eachReply}><strong>{eachreply.replyUser.name} </strong>{eachreply.content}</p>)
                    }) : null}
                    <button onClick={(event) => replyCommentHandler(event, eachComment._id)}
                        className={classes.reply}>Reply</button>

                    {!eachComment.replies ? eachComment.commentRepliesCount.length > 0 ?
                        eachComment.commentRepliesCount[0].count > 0 ?
                            <p onClick={(event) => viewrepliesHandler(event, eachComment._id)}
                                className={classes.repliesCount}>-----view {eachComment.commentRepliesCount[0].count} replies</p> :
                            null :
                        null :
                        null}
                </div>
            )
        })

        modalBody = (<div className={classes.backdrop}>

            <div className={classes.modalBody}>
                <i onClick={buzzCloseHandle} className="fas fa-times"></i>
                <div className={classes.image}>
                    <img src={activity.image.secure_url ? activity.image.secure_url : placeholder} />
                </div>
                <div className={classes.commentSection}>

                    <div className={classes.descriptionSection}>
                        {editable ?
                            <button onClick={EditBtnHandler}
                                className={[classes.editBtn, classes[editing.color]].join(' ')}>
                                {editing.bool ? "Save" : "Edit"}
                            </button>
                            : null}
                        <div>
                            <h6>caption:</h6>
                            {!editing.bool ?
                                <p>{activity.content}</p> :
                                <Input type={inputArea.elementType}
                                    elementConfig={inputArea.elementConfig}
                                    label={inputArea.label}
                                    ref={ref}
                                    changed={captionChangeHandler}
                                    classname={inputArea.classname}
                                    value={inputArea.value}
                                />}
                        </div>
                    </div>
                    <div className={classes.comments}>
                        {comments.length > 0 ? comments : <span>no comments</span>}
                        <p onClick={() => getPaginatedComment(activity._id)} >--View More Comments--</p>
                    </div>
                    <div className={classes.commentInputSection}>
                        <Input type={commentInput.elementType}
                            elementConfig={commentInput.elementConfig}
                            label={commentInput.label}
                            ref={ref}
                            changed={commentChangedHandler}
                            classname={commentInput.classname}
                            value={commentInput.value}
                        />
                        <button disabled={!commentInput.valid}
                            onClick={postCommentHandler}
                            className={styles.postButton}>Post</button>

                    </div>
                </div>
            </div>
        </div>)
    }


    return modalBody
}


export default BuzzModal