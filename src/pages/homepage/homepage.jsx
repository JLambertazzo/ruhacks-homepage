import React from 'react'
import homepageimage from './homepageimage.png'
import './homepage.scss'
import { useHistory } from 'react-router-dom';

export const Homepage = () => {
  
  return (
    <div className='home-container'>
      <div className='image'>
        <img src={homepageimage} className="homepage-img" alt="Background" />
      </div>
      <div className='content'>
        <h1>Study <br /> Buddies</h1>
        <p>Find a study buddy and become more productive and <br /> improve your GPA in only 2 weeks!</p>
        <a href="https://studybuddies-tech.herokuapp.com/signUp" className='btn-main'>log in</a>
        <a href="https://studybuddies-tech.herokuapp.com/signUp" className='btn-main'>sign up</a>
      </div>
    </div>
  )
}

export default Homepage