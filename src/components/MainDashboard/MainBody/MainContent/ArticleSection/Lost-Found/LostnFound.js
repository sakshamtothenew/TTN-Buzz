import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../../../../UI/Wrapper/Wrapper'
import classes from './LostnFound.module.css'
import activityClasses from '../Activities/activity.module.css'
import * as actions from '../../../../../../store/actions/index.actions'
const LostnFound = () => {

  const dispatch = useDispatch();
  const getValuables = () => dispatch(actions.get_valuables())


  const lostnfounds = useSelector(state => state.valuables);
  const toasts = useSelector(state => state.toasts)

  if (toasts.show) {

    toast.error(toasts.message)
  }
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
    getValuables()
  }, [])

  const lostnfoundlist = lostnfounds.map((eachValuable) => {

    console.log(eachValuable)
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
        <img className={classes.img} src={eachValuable.image["secure_url"]} alt="itemImage" />
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
      <ToastContainer />
    </Wrapper>

  );
};

export default LostnFound;
