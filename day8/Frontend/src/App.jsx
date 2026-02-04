import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState("");

  console.log("hello integration")
  
  function fetchNotes() {
    axios.get("https://backend-ykb5.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(()=>{
    fetchNotes();
  }, [])

  function handleSubmit(e){
    e.preventDefault()

    const {title, description} = e.target.elements

    console.log(title.value, description.value)

    axios
      .post("https://backend-ykb5.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });

  }

  function handleDeleteNote(noteId){
    axios
      .delete("https://backend-ykb5.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleUpdate(id) {
    axios
      .patch(`https://backend-ykb5.onrender.com/api/notes/${id}`, {
        description: editDesc,
      })
      .then(() => {
        fetchNotes(); // refresh notes
        setEditId(null); // exit edit mode
        setEditDesc("");
      })
      .catch((err) => console.log(err));
  }



  return (
    <>

    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter title" />
      <input name="description" type="text" placeholder="Enter description" />
      <button>Create Note</button>
    </form>

    <div className="notes">
      {notes.map(note => {
       return (
         <div className="note">
           <h1>{note.title}</h1>
           {editId === note._id ? (
             <>
               <input
                 type="text"
                 value={editDesc}
                 onChange={(e) => setEditDesc(e.target.value)}
               />
               <button onClick={() => handleUpdate(note._id)}>Save</button>
               <button onClick={() => setEditId(null)}>Cancel</button>
             </>
           ) : (
             <p>{note.description}</p>
           )}
           <div className="btn">
             <button
               onClick={() => {
                 handleDeleteNote(note._id);
               }}
             >
               Delete
             </button>
             <button
               onClick={() => {
                 setEditId(note._id);
                 setEditDesc(note.description);
               }}
             >
               Edit Description
             </button>
           </div>
         </div>
       );
      })}
    </div>
    </>
  )
}

export default App
