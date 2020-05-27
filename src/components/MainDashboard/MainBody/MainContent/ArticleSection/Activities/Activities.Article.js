import React, { useState } from "react";
import Wrapper from "../../../../UI/Wrapper/Wrapper";
import classes from "./activity.module.css";
import sample from '../../../../../../assets/banner.jpg'
import { set } from "mongoose";
const Activities = () => {

  const [actions, setactions] = useState({
    likes: 0,
    dislikes: 0,
    disliked: false,
    liked: false
  })

  const onlikehandler = (action) => {
    const state = { ...actions };
    if (action == "Like") {
      if (actions.liked) {
        state.likes -= 1;
        state.liked = !state.liked
      }
      else {
        if (state.disliked) {

          state.likes += 1;
          state.liked = !state.liked;
          state.dislikes -= 1;
          state.disliked = !state.disliked
        }
        else {
          state.likes += 1;
          state.liked = !state.liked;
        }
      }
    }
    else {
      if (state.disliked) {
        state.dislikes -= 1;
        state.disliked = !state.disliked
      }
      else {
        if (state.liked) {

          state.likes -= 1;
          state.liked = !state.liked
          state.dislikes += 1;
          state.disliked = !state.disliked;

        }
        else {
          state.dislikes += 1;
          state.disliked = !state.liked;
        }
      }
    }
    console.log(state)
    setactions(state);
  }


  return (

    <Wrapper heading="Recent Buzz">
      <div className={classes.outercontainer}>
        <div className={classes.container}>
          <div className={classes.date}>
            <p><span className={classes.dt}>15</span>
              <span className={classes.slash}>/ </span>20</p>

          </div>
          <div className={classes.content}>

            <div className={classes.imagediv}>
              <img src={sample} alt="img" />
            </div>
            <div className={classes.userInfo}>
              <p className={classes.username}>saksham123
              <span className={classes.email}>saksham5ssachdeva</span>
                <span className={classes.time}>2h</span>
              </p>

            </div>
            <div className={classes.caption}>
              <p>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog.
              Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs.
              Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz.
              Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack.
              Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim.
              Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex.
              Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs!
              "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed.
              Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk.
              A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box.
              Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack!
              Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck.
                     A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!",</p>
            </div>
            <div className={classes.like}>
              <p>{actions.likes}</p>
              <button className={[classes.likebtn, (actions.liked ? classes.orange : classes.gray)].join(' ')}
                onClick={() => onlikehandler("Like")}>
                <i className="fas fa-thumbs-up"></i>
              </button>
              <p>{actions.dislikes}</p>
              <button className={[classes.likebtn, (actions.disliked ? classes.orange : classes.gray)].join(' ')}
                onClick={() => onlikehandler("Dislike")}>
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    </Wrapper>



  );
};

export default Activities;
