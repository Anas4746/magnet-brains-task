
import React, { useContext } from 'react'
import Style from "../css/Login.module.css"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/ContextUser'

function Login() {

    let navigate = useNavigate()

    let {register, handleSubmit, formState:{errors}, setError} = useForm()
    
    let {loginUser} = useContext(UserContext)
    
    let signinForm = async (data)=>{
        console.log(data);
        let {email, password} = data
        // getUser(email, pass, cpass)
        let userData = await loginUser(email, password)
        console.log(userData);
        if(userData?.message){
            if(userData.message == "No User found with this given email"){
                return setError("email", {
                    type: "manual",
                    message: "No User found with this given email",
                })
            }
            setError("password", {
                    type: "manual",
                    message: userData?.message,
            })
            return setError("email", {
                    type: "manual",
                    message: userData?.message,
            })
        }
        localStorage.setItem('token',userData?.data)
        navigate('/getTask')
    }

    let naivgateLogin = ()=>{
        navigate('/')
    }

  return (
     <div className={Style.main}>
            <div className={Style.container}>
            <div className={Style.right}>
                    <form className={Style.form} onSubmit={handleSubmit(signinForm)}>
                        <h1>Sign in</h1>
                            <span className={Style.loginSpan}>{errors.email&&"*"+errors.email?.message}</span>
                            <input placeholder='email' {...register('email', 
                                {required: {value:true, message: "Enter email"}}
                            )}/>
                            <span className={Style.loginSpan}>{errors.password&&"*"+errors.password?.message}</span>
                            <input placeholder='password' {...register('password',
                                {required: {value:true, message: "Enter password"}}
                            )} />
                        <button className={Style.signinbutton}>SIGN IN</button>
                    </form>
                </div>
                <div className={Style.left}>
                    <div className={Style.leftcontent}>
                    <h1>Hello Friend!</h1>
                    <p>Enter Your personal details and start journey with us.</p>
                    <button className={Style.signin} onClick={naivgateLogin}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login