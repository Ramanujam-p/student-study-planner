import { useState, useEffect } from "react";
import API from "../services/api";
import MainNavbar from "../components/MainNavbar";

const Subjects = () => {

  const [subjects,setSubjects] = useState([]);
  const [name,setName] = useState("");

  useEffect(()=>{
    loadSubjects();
  },[]);

  const loadSubjects = async()=>{

    try{

      const res = await API.get("/subjects");
      setSubjects(res.data);

    }catch(err){

      console.error("Error loading subjects");

    }

  };

  const addSubject = async()=>{

    if(!name.trim()) return;

    try{

      const res = await API.post("/subjects",{name});

      setSubjects(prev=>[...prev,res.data]);

      setName("");

    }catch(err){

      console.error("Error adding subject");

    }

  };

  const deleteSubject = async(id)=>{

    try{

      await API.delete(`/subjects/${id}`);

      setSubjects(prev =>
        prev.filter(subject => subject._id !== id)
      );

    }catch(err){

      console.error("Error deleting subject");

    }

  };

  return(

    <div className="subjects-page">

      <MainNavbar/>

      <div className="subjects-container">

        <h1>Subjects Manager</h1>

        <div className="subject-input">

          <input
            type="text"
            placeholder="New Subject"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <button
            className="add-btn"
            onClick={addSubject}
          >
            Add
          </button>

        </div>

        <div className="subjects-grid">

          {subjects.length === 0 ? (

            <p className="empty-msg">
              No subjects added yet
            </p>

          ) : (

            subjects.map(subject => (

              <div
                key={subject._id}
                className="subject-card"
              >

                <span>{subject.name}</span>

                <button
                  className="delete-btn"
                  onClick={()=>deleteSubject(subject._id)}
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

};

export default Subjects;