import React, { useState } from "react";
import API from "../API";
import { useEffect } from "react";
const AddFeedback = ({ feedList, setFeedList }) => {
  const [dropValues, setDropValues] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [projectId, setProjectId] = useState("");
  useEffect(() => {
    const drop = async () => {
      try {
        const res = await API.get("/Projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Projects for dropdown:", res.data); // 👈 check shape here

        setDropValues(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    drop();
  }, []);

  // ✅ Added projectId state because feedback should belong to a project
console.log("userhere", localStorage.getItem("user"));

  const writeFeed = async (e) => {
    e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
console.log({
  ProjectId: parseInt(projectId),
  UserId: user.userId,
  FeedbackText: newFeedback
});

    try {
      const res = await API.post("/Feedbacks", {
        ProjectId : parseInt(projectId),
       UserId: user.userId,
        FeedbackText: newFeedback
      },
    {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }
    );

      // ✅ Updated feedList with newly created feedback
      setFeedList([...feedList, res.data]); // ensure res.data is feedback object
      setNewFeedback(""); // reset text
      setProjectId(""); // reset project id
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* ✅ Styled inputs and arranged them in flex row */}
      <form onSubmit={writeFeed} className="flex gap-2">
        {/* <input
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="border px-2 py-1 rounded"
        /> */}
        <select
          className="text-black"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Choose Id</option>
          {dropValues.map((e) => (
            <option key={e.projectId} value={e.projectId}>
              {e.title}
            </option>
          ))}
        </select>
        <input
          placeholder="Enter feedback"
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          className="border px-2 py-1 rounded text-black"
        />
        <button className="bg-red-400 px-3 rounded text-white" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFeedback;
