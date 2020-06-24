import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './buzzModal.module.css'
import { useEffect } from 'react'
import * as actions from '../../../store/actions/index.actions'
import Input from '../../UI/Input/input'
import { checkValidity } from '../../../Util/Utility'
import styles from '../Activities/activity.module.css'
import { set } from 'mongoose'

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
    const setModal = (activityId) => dispatch(actions.set_modal_state(activityId))
    const get_replies = (commentId) => dispatch(actions.get_replies(commentId))
    const show = useSelector(state => state.modal.show)
    const user = useSelector(state => state.user.user)
    const activity = useSelector(state => state.modal.activity)
    const [replyid, setreplyid] = useState(null)
    const [commentInput, setCommentInput] = useState(inputObj)

    useEffect(() => {

    }, [])


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
        setModal(activity._id)
        setreplyid(null)

    }
    const ref = React.createRef();
    const replyCommentHandler = (event, comment_id) => {
        setreplyid(comment_id)
        ref.current.focus()
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
                        return (<p>{eachreply.content}</p>)
                    }) : null}
                    <button onClick={(event) => replyCommentHandler(event, eachComment._id)}
                        className={classes.reply}>Reply</button>

                    {eachComment.commentRepliesCount.length > 0 ?
                        eachComment.commentRepliesCount[0].count > 0 ?
                            <p onClick={(event) => viewrepliesHandler(event, eachComment._id)}
                                className={classes.repliesCount}>-----view {eachComment.commentRepliesCount[0].count} replies</p> :
                            null :
                        null}
                </div>
            )
        })

        modalBody = (<div className={classes.backdrop}>

            <div className={classes.modalBody}>
                <i onClick={buzzCloseHandle} className="fas fa-times"></i>
                <div className={classes.image}>
                    <img src={activity.image.secure_url} />
                </div>
                <div className={classes.commentSection}>
                    <div className={classes.descriptionSection}>
                        <div>
                            <h6>caption:</h6>
                            <p>{activity.content}</p>
                        </div>
                    </div>
                    <div className={classes.comments}>
                        {comments.length > 0 ? comments : <span>no comments</span>}
                        <p>--View More Comments--</p>
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