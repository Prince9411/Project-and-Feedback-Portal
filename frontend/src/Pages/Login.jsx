import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import API from '../API'
const Login = ({setUser}) => {
  const [usernameoremail, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [message, setmessage] = useState("")
    const navigate = useNavigate();
const loginController = async(e) => {
e.preventDefault()
try{
const res =  await API.post("Auth/login",{usernameoremail,password})
console.log("data: "+res.data);

setmessage("Login Successfull")
localStorage.setItem("token",res.data.token)
localStorage.setItem("user",JSON.stringify(res.data))
setUser(res.data)
setTimeout(() => navigate('/projects'),1500)
}
catch(err){
  if(err.response)
  {
    setmessage(err.response.data.message || "Login Failed")
  }
  else{
    setmessage("Network Error")
  }
}
}
  return (
    <div className="text-black px-6 py-6 allign-middle w-1/3 mx-auto my-20 bg-white rounded-lg m-4 text-2xl ">
      <form onSubmit={loginController}>
        <input onChange={(e) => {
     setUserName(e.target.value)
        }}
        placeholder='Enter your Username'
        value={usernameoremail}
        ></input>

         <input onChange={(e) => {
     setPassword(e.target.value)
        }}
        placeholder='Enter your Password'
        value={password}
        ></input>
        <button type='submit' className="bg-white px-2 py-2 rounded-lg w-full">Login</button>
      </form><br></br>
  {message && <p>{message}</p>}
      
    </div>
  )
}

export default Login
