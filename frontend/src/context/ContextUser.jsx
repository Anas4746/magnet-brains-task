
import axios from 'axios'
import React, { useState } from 'react'
import { createContext } from 'react'

export let UserContext = createContext()

function UserState(props) {

    let host = "http://localhost:9000/user"
    let [signinUser, setSignUser] = useState()

    let getUser = async (email, pass, cpass)=>{
        try{
            let {data} = await axios.post(
                `${host}/register`,
                {email, pass, cpass}
            )
            console.log(data); 
            return data
        }
        catch(err){
            if (err.response?.data?.message){
                let data = err.response.data
                return data
            }
            console.log(err)
        }
    }

    let loginUser = async (email, password)=>{
        try{
            let {data} = await axios.post(
                `${host}/login`,
                {email, password}
            )
            console.log(data); 
            return data
        }
        catch(err){
            if (err.response?.data?.message){
                let data = err.response.data
                return data
            }
            console.log(err)
        }
    }

    let getLoginUser = async ()=>{
        try{
            let {data} = await axios.get(
                `${host}/getLoginUser`,
                {
                    headers:{
                        "Content-Type":"application/json",
                        "token": localStorage.getItem('token')
                    }
                }
            )
            // console.log(data.user);
            setSignUser(data.user)
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    
    <UserContext.Provider value={{getUser, loginUser, getLoginUser, signinUser}}>
        {props.children}
    </UserContext.Provider>
    
  )
}

export default UserState