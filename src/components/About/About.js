import React from 'react'
import classes from './About.module.css'


const AboutUs = () => {
  return (
    <div className={classes.conatiner}>
      <div className={classes.banner}>
        <div className={classes.tint}>
          <h1>About Us</h1>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.card}>
          <h3>TTND BUZZ</h3>
          <p>this is some static information about ttnBuzz app.
          this website keeps newer updated and helps to register and track Complaint
          It provides you a simple Interface to share your thought or any important information
            such as Lost anf Found</p>
        </div>
        <div className={classes.card}>
          <h3>About developer</h3>
          <p>this is some information about developer of this website.
             <strong>saksham sachdeva</strong>
            this info is static and fake to fill the gap.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
          </p>
        </div>
      </div>
    </div>
  )
}


export default AboutUs