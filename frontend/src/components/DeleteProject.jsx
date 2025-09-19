import React from "react";
import API from "../API";

const DeleteProject = ({ projectId, projects, setProjects }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    try {
      await API.delete(`/Projects/${projectId}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const updatedProjects = projects.filter((p) => p.projectId !== projectId);
      setProjects(updatedProjects);
      alert(`Project with ID ${projectId} deleted successfully ✅`);
    } catch (err) {
      console.error(err);
      alert(`❌ Failed to delete project with ID ${projectId}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded-md font-bold"
    >
      Delete
    </button>
  );
};

export default DeleteProject;
