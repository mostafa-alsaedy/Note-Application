import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { AuthContext } from '../Context/AuthContext'
import { Helmet } from 'react-helmet'



export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (values) => {
    setIsLoading(true)
    setErrorMsg("")
    setSuccessMsg("")

    try {
      const { data } = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signin", values)
      console.log(data);
      if (data.msg == "done") {
        localStorage.setItem("userToken", data.token)
        setIsLoading(false)
        setToken(data.token)
        setSuccessMsg("Account Logged In Successfully!")
        setTimeout(() => {
          navigate("/")
        }, 1500)
      }


    } catch (error) {
      setIsLoading(false)
      setErrorMsg("Invalid Email or Password")
      console.log(error);

    }

  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().matches(/^[a-zA-Z0-9]{6,20}$/, "Password must be between 6 and 14 characters").required("Password is required"),
  })


  const loginFormikObj = useFormik({
    initialValues: {

      email: "",
      password: "",

    },
    validationSchema: validationSchema,
    onSubmit: handleLogin
  })

  return (
    <>
<Helmet>
  <title>Login</title>
</Helmet>
      <section className="authentication h-screen flex">
        <div className="w-full pt-20 mb-10 flex justify-end items-end px-16 ">
          <div className="bg-stone-200 border-t border-b border-stone-200 px-4 py-3 text-gray-700 rounded-lg w-2/3">
            <div className='flex justify-between items-center'>
              <h1 className='font-bold text-2xl my-5 ms-2 uppercase text-sky-950'>Login</h1>
              {successMsg ? <p className='text-gray-300 bg-green-800 px-4 py-2 rounded-xl'>{successMsg}</p> : null}
              {errorMsg ? <p className='text-gray-300 bg-red-800 px-4 py-2 rounded-xl'>{errorMsg}</p> : null}
            </div>
            <form onSubmit={loginFormikObj.handleSubmit}>
              <div className="relative my-2 ">
                <input onBlur={loginFormikObj.handleBlur} onChange={loginFormikObj.handleChange} name='email' type="email" id="userEmail" className="block px-2.5 pb-2.5 py-7 w-full bg-stone-300 text-sm text-stone-600 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label htmlFor="userEmail" className="absolute text-md font-semibold text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-semibold  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
              </div>
              {loginFormikObj.touched.email && loginFormikObj.errors.email ? <div className="p-2 my-1 text-sm font-semibold text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">{loginFormikObj.errors.email}</div> : ""}
              <div className="relative my-2 ">
                <input onBlur={loginFormikObj.handleBlur} onChange={loginFormikObj.handleChange} name='password' type="password" id="userPassword" className="block px-2.5 pb-2.5 py-7 w-full bg-stone-300 text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label htmlFor="userPassword" className="absolute text-md font-semibold text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-semibold  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
              </div>
              {loginFormikObj.touched.password && loginFormikObj.errors.password ? <div className="p-2 my-1 text-sm font-semibold text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">{loginFormikObj.errors.password}</div> : ""}
              <div className='flex justify-between items-center px-2'>
                <button type="submit" disabled={!loginFormikObj.isValid || !loginFormikObj.dirty} className=" disabled:bg-stone-400 disabled:text-gray-500 text-white bg-stone-500 hover:bg-stone-600  font-medium rounded-lg text-sm w-full sm:w-auto my-5 px-20 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading ? <i className='fa-solid fa-circle-notch fa-spin'></i> : "Login"}</button>
                <p className='pt-2 font-semibold '>Don't have an account?<Link className='font-bold text-stone-800 underline ms-2' to='/register'>Register</Link> </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>

  )
}
