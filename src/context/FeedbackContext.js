import { createContext,useState ,useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) =>{
    const [isLoading,setIsLoading] = useState(true);
    const [feedback,setFeedback ] = useState([]);
    const [feedbackEdit,setFeedbackEdit ] = useState({
        item:{},
        edit:false
    })

    useEffect(()=>{
        fetchFeedback();
    },[]);

    const fetchFeedback = async ()=>{
        const response = await fetch("/feedback?_sort=id&_order=desc");
        const data = await response.json();
        setFeedback([...data]);
        setIsLoading(false);
    }

    const addFeedback = async (newFeedback) => {

        //newFeedback.id = uuidv4();
        const response = await fetch('/feedback',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newFeedback)
        })
        const data = await response.json();
        setFeedback([data,...feedback]);
      }

    const deleteFeedback = async (id) => {
        if(window.confirm('Do you really want to delete?')){
            await fetch(`/feedback/${id}`,{method:'DELETE'})
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

    const updateFeedback = async (id,updateItem) => {
        const response = await fetch(`/feedback/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updateItem)
        })
        const data = await response.json();
        // NOTE: no need to spread data and item
        setFeedback(feedback.map((item) => (item.id === id ? data : item)))

        // FIX: this fixes being able to add a feedback after editing
        // credit to Jose https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/29768200#questions/16462688
        setFeedbackEdit({
        item: {},
        edit: false,
        })
    }
    return <FeedbackContext.Provider value={{
        feedback,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        { children }
    </FeedbackContext.Provider>
}

export default FeedbackContext;