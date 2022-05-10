import React,{ useContext } from 'react';
import { FaTimes,FaEdit } from 'react-icons/fa';
import Card from './shared/Card';
import PropTypes from 'prop-types';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackItem = ({ item:{rating,id,text} }) => {    
  const { deleteFeedback,editFeedback } = useContext(FeedbackContext);
  const data = {rating,id,text}
  return (
    <Card> 
        <div className='num-display'>
            { rating }
        </div>
        <button 
          onClick={()=>deleteFeedback(id)}
          className='close'>
          <FaTimes color='purple'/>
        </button>
        <button 
        onClick={()=>editFeedback(data)}
        className="edit">
          <FaEdit color='purple'/>
        </button>
        <div className='text-display'>
            { text }
        </div> 
    </Card>
  )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default FeedbackItem