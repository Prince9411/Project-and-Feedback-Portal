import React from "react";
import AddProjects from "../components/AddProjects";
import DeleteProject from "../components/DeleteProject";
const Projects = ({ projects, setProjects,user }) => {

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Information of Projects
      </h1>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 border-b-2 pb-2 mb-4">
        <span>Id</span>
        <span>Title</span>
        <span>Supervisor</span>
        <span>Start Date</span>
        <span>End Date</span>
        <span>Action</span>
      </div>

      {/* Projects List */}
      <ul className="space-y-2">
        {projects.map((p) => (
          <li
            key={p.projectId}
            className="grid grid-cols-6 gap-4 bg-white p-3 rounded-lg shadow hover:shadow-lg transition"
          > 
            <span className="text-gray-700">{p.projectId}</span>
            <span className="text-gray-700">{p.title}</span>
            <span className="text-gray-500">{p.supervisor}</span>
            <span className="text-gray-500">{p.startDate}</span>
            <span className="text-gray-500">{p.endDate}</span>
            <span className="text-gray-500" >
              {user && (
            <DeleteProject   projectId={p.projectId} projects={projects} setProjects={setProjects}/> )}
            </span>
              
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <AddProjects projects={projects} setProjects={setProjects} user={user}  />
      </div>
    </div>
  );
};

export default Projects;
