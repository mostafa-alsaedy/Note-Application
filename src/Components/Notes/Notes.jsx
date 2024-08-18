import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'



export default function Notes({ noteId, noteTitle, noteContent, deleteNote, getUserNotes }) {
  const [modal, setModal] = useState(false);
  const [errorMsg, setErrMsg] = useState("");


  const closeModal = () => {
    setErrMsg("");
    updNoteFormikObj.resetForm()
    setModal(false)
  }



  const updateNote = async (values) => {
    try {
      const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, values, {
        headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
      })
      console.log(data);
      setModal(false)
      getUserNotes()

    } catch (error) {
      console.log(error);

    }

  }

  const updNoteFormikObj = useFormik({
    initialValues: {
      title: noteTitle,
      content: noteContent
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required")
    }),
    onSubmit: updateNote
  })

  return (<>




    <div className={`fixed left-0 right-0 top-0 bottom-0 bg-stone-700 bg-opacity-70 flex items-center justify-center ${modal ? "block" : "hidden"}`}>
      <div id='addNote' className='bg-stone-200 rounded-lg w-5/12 mb-16 ms-20'>
        <header id='noteHeader' className='text-center font-bold text-xl py-5 font-serif'>Update Note</header>
        <div className='pt-5 px-5 border-t-2 border-b-2 border-black border-opacity-20'>
          <form>
            <div>
              <input
                onBlur={updNoteFormikObj.handleBlur}
                onChange={updNoteFormikObj.handleChange}
                value={updNoteFormikObj.values.title}
                type="text"
                id="title"
                name='title'
                className="bg-stone-300 outline-none placeholder:text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-300 focus:border-stone-300 block w-full p-2.5 my-3"
                placeholder="Note Title"
                required
              />
              {updNoteFormikObj.errors.title ? <p className='text-gray-300 bg-red-700 text-sm px-4 py-2 rounded-lg my-2 w-fit'>{updNoteFormikObj.errors.title}</p> : ""}
              <textarea
                onBlur={updNoteFormikObj.handleBlur}
                onChange={updNoteFormikObj.handleChange}
                value={updNoteFormikObj.values.content}
                type="text"
                rows="3"
                id="content"
                name='content'
                className="bg-stone-300 outline-none placeholder:text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-300 focus:border-stone-300 block w-full p-2.5 my-3 "
                placeholder="Note Content"
                required
              />
            </div>
            {updNoteFormikObj.errors.content ? <p className='text-gray-300 bg-red-700 text-sm px-4 py-2 rounded-lg my-2 w-fit'>{updNoteFormikObj.errors.content}</p> : ""}
          </form>
          {errorMsg && <p className='text-gray-300 bg-red-700 text-sm px-4 py-2 rounded-lg my-4 ms-auto w-fit'>{errorMsg}</p>}
        </div>
        <footer className='text-center flex items-center justify-end gap-5 p-5'>
          <button onClick={closeModal} className='bg-stone-500 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded-md text-sm'>Close</button>
          <button type='submit' className='bg-stone-700 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-md text-sm' onClick={updNoteFormikObj.handleSubmit}>Update Note</button>
        </footer>
      </div>
    </div>

    <div key={noteId} className="w-1/2 p-4">
      <div className='bg-white p-4 m-2 rounded-md shadow-sm capitalize'>
        <h1 className='text-gray-600 font-bold text-2xl'>{noteTitle}</h1>
        <p className='my-5 text-gray-400 text-md'>{noteContent}</p>
        <div className='flex justify-end gap-3'>
          <i onClick={() => setModal(true)} className="fa-solid fa-pen-to-square cursor-pointer"></i>
          <i onClick={() => deleteNote(noteId)} className="fa-solid fa-trash-can pe-2 cursor-pointer"></i>
        </div>
      </div>
    </div>



  </>)
}
