import React, { useState } from 'react'
import API from '../API'
const DeleteFeedback = ({feedList,setFeedList,feedId}) => {
    const user = JSON.parse(localStorage.getItem("user"))

    //const [feedbackId, setFeedbackId] = useState("")
    const handler = (e) => {
        e.preventDefault()
        try{
        API.delete(`/Feedbacks/${feedId}`)
        const updatedFeedback = feedList.filter((e)=> e.feedbackId !== feedId)
        setFeedList(updatedFeedback)
        setFeedbackId("")
        }
        catch(err)
        {
            console.error(err)
        }
    }
  return (
    <div>
   {user &&   
   (
    <button onClick={handler} className='bg-red-400 rounded-md' type='submit' value={feedId}>Delete</button> )
   }
    </div>
  )
}

export default DeleteFeedback
