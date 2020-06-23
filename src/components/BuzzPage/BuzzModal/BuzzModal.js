import React from 'react'
import classes from './buzzModal.module.css'
import { useEffect } from 'react'

const BuzzModal = (props) => {

    useEffect(() => {

        console.log("here im going to call some actions")
    }, [])
    return (
        <div className={classes.backdrop}>
            <div className={classes.modalBody}>
                <div className={classes.image}>

                </div>
                <div className={classes.commentSection}>
                    <div className={classes.descriptionSection}></div>
                    <div className={classes.comments}>
                        {/* {comments} */}
                    </div>

                </div>
            </div>
        </div>
    )
}


export default BuzzModal