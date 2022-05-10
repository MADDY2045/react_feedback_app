import React,{ useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext);

  const getAverageRating = () =>{
      let sum = feedback.map( item=> item.rating ).reduce((a,b)=> a+b,0 );
      return Math.abs(parseInt(sum)/feedback.length).toFixed(1);
  }  
  
  return (
    <div className='feedback-stats'>
        <h4>{ feedback.length } reviews</h4>
        <h4>Average Rating: {feedback.length > 0 ? getAverageRating():0}</h4>
    </div>
  )
}

export default FeedbackStats;