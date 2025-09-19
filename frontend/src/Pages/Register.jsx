import { useState } from "react"
import React from 'react'
import API from "../API"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [message, setmessage] = useState("")
    const navigate = useNavigate(); 
const handlerLogin = async(e) => {
 e.preventDefault()
 try{
 const res = await API.post("/Auth/register",{username,email,password})
 setmessage("User Registered Successfully")
 setTimeout(() => navigate("/login"),1500)
 }
 catch(err)
 {
    setmessage("Registration Failed : " +err.response?.data)
 }
}
  return (
    <div className="text-black px-6 py-6 allign-middle w-1/3 mx-auto my-20 bg-white rounded-lg m-4 text-2xl ">
<form onSubmit={handlerLogin}>
    <input onChange={(e)=> {
        setUserName(e.target.value)
    }}
    value={username}
    placeholder="Enter username"
    ></input>
<br></br>
    <input onChange={(e)=> {
        setEmail(e.target.value)
    }}
    value={email}
    placeholder="Enter your Email address"
    ></input>
<br></br>
    <input onChange={(e)=> {
        setPassword(e.target.value)
    }}
    value={password}
    placeholder="Create password"
    ></input>
    <br></br>
    <br></br>
    <button type="submit" className="bg-white px-2 py-2 rounded-lg w-full">Register</button>
    </form>  
    {message && <p>{message}</p>}
 
     </div>
  )
}

export default Register
