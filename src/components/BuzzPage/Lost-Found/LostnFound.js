import React, { useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../../UI/Wrapper/Wrapper'
import classes from './LostnFound.module.css'
import activityClasses from '../Activities/activity.module.css'
import * as actions from '../../../store/actions/index.actions'

const LostnFound = () => {
  const dispatch = useDispatch();
  const getValuables = useCallback(() => dispatch(actions.get_valuables()), [dispatch])
  const lostnfounds = useSelector(state => state.valuables);
  const toasts = useSelector(state => state.toasts)

  if (toasts.show) {
    if (toasts.type === "error")
      toast.error(`${toasts.message}`)
    else {
      toast.success(`${toasts.message}`)
    }
  }

  const dateConverter = (date) => {
    const month = date.split('-')[1];
    const day = date.split('-')[2].split('T')[0]
    return {
      day: day,
      month: month
    }
  }

  useEffect(() => {
    getValuables()
  }, [getValuables])

    lostnfounds.sort((a , b) => {
      if(a.createdDate < b.createdDate)
      {
        return 1
      }
      else {
        return -1
      }
    })
  const lostnfoundlist = lostnfounds.map((eachValuable) => {

    let { day, month } = dateConverter(eachValuable.createdDate)
    return (<div className={classes.container} key={eachValuable._id}>
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
        {eachValuable.image["secure_url"] ?
          <img className={classes.img} src={eachValuable.image["secure_url"]} alt="itemImage" /> :
          null}
        <p className={classes.description}>{eachValuable.description}</p>
      </div>
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
