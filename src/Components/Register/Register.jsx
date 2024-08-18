import React, { useEffect, useState } from 'react'
// import "./Register.module.css"
import notesLogo from "../../assets/Images/notesBlack.png"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'




export default function Register() {

  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (values) => {
    setIsLoading(true)
    setErrorMsg("")
    setSuccessMsg("")
    try {
      const { data } = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      console.log(data);
      if (data.msg === "done") {
        setTimeout(() => {
          navigate("/login")
        }, 1500)
        setIsLoading(false)
        setSuccessMsg("Account Created Successfully")
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      setErrorMsg(error.response.data.msg)
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters").max(12, "Name must be less than 12 characters").required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().matches(/^[a-zA-Z0-9]{6,20}$/, "Password must be between 6 and 14 characters").required("Password is required"),
    age: Yup.string().matches(/^1[89]|[2-9][0-9]$/ , "Age must be above 18 years").required("Age is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}}$/, "Phone number must be 11 digits").required("Phone number is required"),
  })



  const regFormikObj = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister
  })

  return (
    <>

    <Helmet>
      <title>Register</title>
    </Helmet>

      <section className="authentication flex">
        <div className="w-full pt-20 mb-10 flex justify-end items-end px-16">
          <div className="bg-stone-200 border-t border-b border-stone-200 px-4 py-3 text-gray-700 rounded-lg w-2/3">
            <div className='flex justify-between items-center'>
              <h1 className='font-bold text-2xl my-5 ms-2 uppercase text-sky-950'>Sign Up Now!</h1>
              {successMsg ? <p className='text-green-500'>{successMsg}</p> : null}
              {errorMsg ? <p className='text-red-500'>{errorMsg}</p> : null}
            </div>
            <form onSubmit={regFormikObj.handleSubmit}>
              <div className="relative my-2 ">
                <input onBlur={regFormikObj.handleBlur} onChange={regFormikObj.handleChange} name='name' type="text" id="userName" className="block px-2.5 pb-2.5 py-7 w-full bg-stone-300 text-sm  text-stone-600  rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label htmlFor="userName" className="absolute text-md font-semibold text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-semibold  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
              </div>
              {regFormikObj.touched.name && regFormikObj.errors.name ? <div className="p-2 my-1 text-sm font-semibold text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">{regFormikObj.errors.name}</div> : ""}
              <div className="relative my-2 ">
                <input onBlur={regFormikObj.handleBlur} onChange={regFormikObj.handleChange} name='email' type="email" id="userEmail" className="block px-2.5 pb-2.5 py-7 w-full bg-stone-300 text-sm text-stone-600 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label htmlFor="userEmail" className="absolute text-md font-semibold text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-semibold  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
              </div>
              {regFormikObj.touched.email && regFormikObj.errors.email ? <div className="p-2 my-1 text-sm font-semibold text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">{regFormikObj.errors.email}</div> : ""}
              <div className="relative my-2 ">
                <input onBlur={regFormikObj.handleBlur} onChange={regFormikObj.handleChange} name='password' type="password" id="userPassword" className="block px-2.5 pb-2.5 py-7 w-full bg-stone-300 text-sm text-stone-600 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label htmlFor="userPassword" className="absolute text-md font-semibold text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-semibold  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
              </div>
              {regFormikObj.touched.password && regFormikObj.errors.password ? <div className="p-2 my-1 text-sm font-semibold text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">{regFormikObj.errors.password}</div> : ""}

              <div className="relative my-2 ">
                <input onBlur={regFormikObj.handleBlur} onChange={regFormikObj.handleChange} name='age' type="number" id="userAge" className="block px-2.5 pb-2.5 py-7 w-full bg-stone-300 text-sm text-stone-600 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label htmlFor="userAge" className="absolute text-md font-semibold text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-semibold  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Age</label>
              </div>
              {regFormikObj.touched.age && regFormikObj.errors.age ? <div className="p-2 my-1 text-sm font-semibold text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">{regFormikObj.errors.age}</div> : ""}
              <div className="relative my-2 ">
                <input onBlur={regFormikObj.handleBlur} onChange={regFormikObj.handleChange} name='phone' type="tel" id="userPhone" className="block px-2.5 pb-2.5 py-7 w-full bg-stone-300 text-sm text-stone-600 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label htmlFor="userPhone" className="absolute text-md font-semibold text-black dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:font-semibold  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone Number</label>
              </div>
              {regFormikObj.touched.phone && regFormikObj.errors.phone ? <div className="p-2 my-1 text-sm font-semibold  text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400" role="alert">{regFormikObj.errors.phone}</div> : ""}
              <div className='lg:flex justify-between items-center px-2'>
                <button type="submit" disabled={!regFormikObj.isValid || !regFormikObj.dirty} className="disabled:bg-stone-400 disabled:text-gray-500 text-white bg-stone-500 hover:bg-stone-600  font-medium rounded-lg text-sm w-full sm:w-auto my-5 px-20 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading ? <i className='fa-solid fa-circle-notch fa-spin'></i> : "Register"}</button>
                <p className='pt-2 font-semibold '>Have already an account?<Link className='font-bold text-stone-800 underline ms-2' to='/login'>Login</Link> </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>

  )
}
