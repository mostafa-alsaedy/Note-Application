import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Notes from '../Notes/Notes';
import { ColorRing } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet';



export default function Home() {
  const [modal, setModal] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


 


  const addNote = async (values) => {
    try {
      let { data } = await axios.post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
        headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
      });
      if (data.msg === "done") {
        setErrMsg("");
        setModal(false);
        getUserNotes()
        addNoteFormikObj.resetForm()        
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.response.data.msg);
    }
  };

  const getUserNotes = async () => {
    setIsLoading(true)
    try {
      let { data } = await axios.get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
      })
      console.log(data);
      setNotes(data.notes);
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  const deleteMyNote = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 px-6 py-2 text-white rounded-md ms-3",
        cancelButton: "bg-red-600 px-6 py-2 text-white rounded-md"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  const deleteNote = async (noteId) => {
    setIsLoading(true)
    try {
      let { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
        headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
      })
      if (data.msg === "done") {
        getUserNotes();
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  const addNoteFormikObj = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    onSubmit: addNote,
  });



  useEffect(() => {
    getUserNotes();
  }, [])

  return (
    <>
    <Helmet>
      <title>Notes</title>
    </Helmet>
      {isLoading ? <> <div className='flex justify-center items-center h-screen'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div></> : ""}
      <section className=''>
        <div id='addNoteButton' className="flex justify-end p-10">
          <button onClick={() => {setModal(true)}} className='bg-stone-700 hover:bg-stone-800 text-white font-bold py-4 px-8 rounded-lg text-lg'>
            <i className='fa fa-plus-circle me-2'></i>Add New Note
          </button>
        </div>
        <div className='row'>
          {notes.map((note) => (
            <Notes key={note._id} noteId={note._id} noteTitle={note.title} noteContent={note.content} deleteNote={deleteMyNote} getUserNotes={getUserNotes} />
          ))}
        </div>
        <div className={`fixed left-0 right-0 top-0 bottom-0 bg-stone-700 bg-opacity-70 flex items-center justify-center ${modal ? "block" : "hidden"}`}>
          <div id='addNote' className='bg-stone-200 rounded-lg w-5/12 mb-16'>
            <header id='noteHeader' className='text-center font-bold text-xl py-5 font-serif'>New Note</header>
            <div className='pt-5 px-5 border-t-2 border-b-2 border-black border-opacity-20'>
              <form onSubmit={addNoteFormikObj.handleSubmit}>
                <div className='py-5'>
                  <input
                    onBlur={addNoteFormikObj.handleBlur}
                    onChange={addNoteFormikObj.handleChange}
                    value={addNoteFormikObj.values.title}
                    type="text"
                    id="title"
                    name='title'
                    className="bg-stone-300 outline-none placeholder:text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-300 focus:border-stone-300 block w-full p-2.5 my-3"
                    placeholder="Note Title"
                    required
                  />
                  <textarea
                    onBlur={addNoteFormikObj.handleBlur}
                    onChange={addNoteFormikObj.handleChange}
                    value={addNoteFormikObj.values.content}
                    rows="3"
                    id="content"
                    name='content'
                    className="bg-stone-300 outline-none placeholder:text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-300 focus:border-stone-300 block w-full p-2.5 my-3"
                    placeholder="Note Content"
                    required
                  />
                </div>
              </form>
              {errorMsg && <p className='text-gray-300 bg-red-700 text-sm px-4 py-2 rounded-lg my-4 ms-auto w-fit'>{errorMsg}</p>}
            </div>
            <footer className='text-center flex items-center justify-end gap-5 p-5'>
              <button onClick={() => {setModal(false); setErrMsg("");}} className='bg-stone-500 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded-md text-sm'>Close</button>
              <button type='submit' className='bg-stone-700 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-md text-sm' onClick={()=> {addNoteFormikObj.handleSubmit(); }}>Add Note</button>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}