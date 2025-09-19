import React, { useState } from "react";
import API from "../API";
const AddProjects = ({ projects, setProjects,user }) => {
  // const user = JSON.parse(localStorage.getItem("user"))
  const [title, setTitle] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handler = async(e) => {
    e.preventDefault();
      try {
        const res = await API.post("/Projects", {
          title,
          supervisor,
          startDate,
          endDate,
        },
      {
        headers: {
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
      );
        setProjects([...projects, res.data]);
        setTitle("");
        setSupervisor("");
        setStartDate("");
        setEndDate("");
        alert("Project added successfully ✅");
      } catch (err) {
        console.error(err);
      }
    }
  return (
    <div className="gap-2 px-3 py-2 text-black bg-slate-300 rounded-md">
      <form onSubmit={handler} className="font-serif">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Supervisor"
          value={supervisor}
          onChange={(e) => {
            setSupervisor(e.target.value);
          }}
        ></input>
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        ></input>
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        ></input>
        {user && (<button type="submit" className="bg-emerald-500 px-4 py-3 rounded-lg ">Add Project</button> )}
      </form>
    </div>
  );
};


export default AddProjects;
