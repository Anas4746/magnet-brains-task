
import React, { useContext } from 'react'
import Style from "../css/Signup.module.css"
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { UserContext } from '../context/ContextUser'

function SignUp() {

    let navigate = useNavigate()

    let {register, handleSubmit, formState:{errors}, setError} = useForm()
    let {getUser} = useContext(UserContext)

    let signupForm = async (data)=>{
        console.log(data);
        let {email, pass, cpass} = data
        // getUser(email, pass, cpass)
        let userData = await getUser(email, pass, cpass)
        console.log(userData);
        if(userData.message){
            if(userData.message == "Users validation failed: email: Invalid email format"){
                return setError("email", {
                    type: "manual",
                    message: "Invalid email format",
                })
            }else if (userData.message == "Password and confirm password is not matching."){
                return setError("cpass", {
                    type: "manual",
                    message: userData.message,
                })
            }else if (userData.message ==  "Email already taken."){
                return setError("email", {
                    type: "manual",
                    message: userData.message,
                })
            }
        }
        navigate('/login')
    }

    let passwordValidation = {required:{value:true, message:"Create password"}}
    let cpasswordValidation = {required:{value:true, message:"Enter confirm password"}}

    let naivgateLogin = ()=>{
        navigate('/login')
    }

  return (
    <div className={Style.main}>
        <div className={Style.container}>
            <div className={Style.left}>
                <div className={Style.leftcontent}>
                <h1>Webcome Back!</h1>
                <p>To keep connected with us please login with your personal info.</p>
                <button className={Style.signin} onClick={naivgateLogin}>SIGN IN</button>
                </div>
            </div>
            <div className={Style.right}>
                <form onSubmit={handleSubmit(signupForm)} className={Style.form}>
                    <h1>Sign up</h1>
                    <span className={Style.signuperr}>{errors.email&&"*"+errors.email?.message}</span>
                        <input placeholder='email' {...register("email",
                            {required:{value:true, message:"Enter email"}
                        })
                         }/>
                         
                        <span className={Style.signuperr}>{errors.pass&&"*"+errors.pass?.message}</span>
                        <input placeholder='password' {...register("pass",passwordValidation)}/>
                        <span className={Style.signuperr}>{errors.cpass&&"*"+errors.cpass?.message}</span>
                        <input placeholder='confirm password' {...register("cpass",cpasswordValidation)}/>
                    <button className={Style.signup}>SIGN UP</button>
                </form>

            </div>
        </div>
    </div>
  )
}

export default SignUp