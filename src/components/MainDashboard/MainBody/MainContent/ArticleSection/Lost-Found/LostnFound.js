import React, { useState, useEffect } from "react";
import axios from 'axios';
import Wrapper from '../../../../UI/Wrapper/Wrapper'
import classes from './LostnFound.module.css'
import activityClasses from '../Activities/activity.module.css'
const LostnFound = () => {
  
  const [lostnfounds, setlostnfounds] = useState([])
  

  const dateConverter = (date) => {
    console.log(date);
    const month = date.split('-')[1];
    const day = date.split('-')[2].split('T')[0]

    return {
      day: day,
      month: month
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

    let { day, month } = dateConverter(eachValuable.createdDate)
    return (<div className={classes.container}>
      <div className={[activityClasses.date, classes.date].join(' ')}>
        <p><span className={activityClasses.dt}>{day}</span>
          <span className={activityClasses.slash}>/ </span>{month}</p>
      </div>
      <div className={classes.content}>
        <div className={classes.header}>
          <h2 className={[classes.type, classes[eachValuable.category]].join(' ')}>{eachValuable.category}</h2>
          <div className={classes.contactDetails}>
            <p>{eachValuable.userDetails.email}</p>
            <p>{eachValuable.userDetails.name}</p>
          </div>

        </div>
        <img className={classes.img} src={process.env.PUBLIC_URL + imagepath} alt="itemImage" />
        <p className={classes.description}>{eachValuable.description}</p>
      </div>
      {/* <div onClick={infohandler} className={classes.contactInfo}>
        <i class="fas fa-chevron-right"></i>
        <p>Contact info</p>
      </div> */}

    </div>)
  })


  return (
    <Wrapper heading="Lost n Found Buzz">
      <div className={activityClasses.outercontainer}>
        {lostnfoundlist}
      </div>

    </Wrapper>

  );
};

export default LostnFound;
