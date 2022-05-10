import { createContext,useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) =>{
    const [feedback,setFeedback ] = useState([
        {
            id:1,
            text:"Coming From Context",
            rating:10
        },
        {
            id:2,
            text:"Coming From Maddy",
            rating:8
        },
    ])

    const [feedbackEdit,setFeedbackEdit ] = useState({
        item:{},
        edit:false
    })
    const addFeedback = (newFeedback) => {

        newFeedback.id = uuidv4();
        //console.log("adding new feedback",newFeedback);
        setFeedback([newFeedback,...feedback]);
      }

    const deleteFeedback = (id) => {
        if(window.confirm('Do you really want to delete?')){
          setFeedback(feedback.filter(item => item.id !== id))
        }
        
      }
    //Set item to be updated 
    const editFeedback = (item) =>{
        setFeedbackEdit({
            item,
            edit:true
        })
    } 

    const updateFeedback = (id,updateItem) => {
        setFeedback(feedback.map(item=> item.id === id ? {...item,...updateItem}:item))
    }
    return <FeedbackContext.Provider value={{
        feedback,deleteFeedback,addFeedback,editFeedback,feedbackEdit,updateFeedback
    }}>
        { children }
    </FeedbackContext.Provider>
}

export default FeedbackContext;