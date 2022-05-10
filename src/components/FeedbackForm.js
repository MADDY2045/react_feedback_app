import React,{ useState,useContext,useEffect } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => { 
  const { addFeedback,feedbackEdit,updateFeedback } = useContext(FeedbackContext);

  const [ text,setText ] = useState('');
  const [ btnDisabled,setBtnDisabled  ] = useState(true);
  const [ message,setMessage ] = useState('');
  const [ rating,setRating ] = useState(10);

  useEffect(()=>{
    if(feedbackEdit.edit === true){
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  },[feedbackEdit])

  const handleTextChange = ({ target: { value } }) => {
    if(text === ''){
      setBtnDisabled(true)
      setMessage(null)
    }else if(value.length < 10){
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    }else{
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(value);
  }

  const handleSubmit = (e) => {
      //console.log("clicked...",text,rating);
      e.preventDefault();
      if(text.length > 10){
        let newFeedback = {
          text,
          rating
        }
        ////console.log("feedbackEdit:",feedbackEdit);
        //console.log("newFeedback",newFeedback);
        if (feedbackEdit.edit === true) {
          updateFeedback(feedbackEdit.item.id, newFeedback)
        } else {
          addFeedback(newFeedback)
        }
        // NOTE: reset to default state after submission
        setBtnDisabled(true) 
        setRating(10) 
        setText('');
      }
  }
  return (
    <Card>
      <form onSubmit={ handleSubmit }>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select = {(rating)=> setRating(rating)}/>
        <div className='input-group'>
            <input
            onChange= { handleTextChange } 
            type="text"
            value={ text } 
            placeholder='Write a review'/>
            <Button type="text" isDisabled={btnDisabled}>
              SEND
            </Button>
        </div>
        {message && <div className="message">{ message }</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm;