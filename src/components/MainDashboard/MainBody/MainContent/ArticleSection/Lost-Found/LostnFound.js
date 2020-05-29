import React, { useState, useEffect } from "react";
import axios from 'axios';
import Wrapper from '../../../../UI/Wrapper/Wrapper'
import classes from './LostnFound.module.css'
import activityClasses from '../Activities/activity.module.css'
import sample from '../../../../../../assets/banner.jpg'
const LostnFound = () => {
  const [displayInfo, setDisplayInfo] = useState("hide")
  const [lostnfounds, setlostnfounds] = useState([])
  const infohandler = () => {
    if (displayInfo == "show") {
      setDisplayInfo("hide")
    }
    else {
      setDisplayInfo("show")
    }
  }


  useEffect(() => {
    axios.get('http://localhost:5000/valuables')
      .then(response => {
        console.log(response.data)
        setlostnfounds(response.data);
      })
  }, [])

  const lostnfoundlist = lostnfounds.map((eachValuable) => {
    let imagepath = eachValuable.image.path;
    const path = imagepath.split('/');
    imagepath = ["", path[path.length - 2], path[path.length - 1]].join('/')
    return (<div className={classes.container}>
      <div className={[activityClasses.date, classes.date].join(' ')}>
        <p><span className={activityClasses.dt}>15</span>
          <span className={activityClasses.slash}>/ </span>20</p>
      </div>
      <div className={classes.content}>
        <div className={classes.header}>
          <h2 className={classes.type}>{eachValuable.category}</h2>
          <div className={[classes.contactDetails, (displayInfo === "hide" ? classes.hide : classes.show)].join(' ')}>
            <p>saksham5sachdeva@gmail.com</p>
            <p>Contact: 9711224345</p>
          </div>

        </div>
        <img className={classes.img} src={process.env.PUBLIC_URL + imagepath} alt="itemImage" />
        <p className={classes.description}>{eachValuable.description}</p>
      </div>
      <div onClick={infohandler} className={classes.contactInfo}>
        <i class="fas fa-chevron-right"></i>
        <p>Contact info</p>
      </div>

    </div>)
  })


  return (
    <Wrapper heading="Lost n Found Buzz">
      <div className = {activityClasses.outercontainer}>
        {lostnfoundlist}
      </div>

    </Wrapper>

  );
};

export default LostnFound;
