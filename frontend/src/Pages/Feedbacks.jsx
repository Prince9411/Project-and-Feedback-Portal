import React, { useState, useEffect } from "react";
import API from "../API";
import AddFeedback from "../components/AddFeedback";
import DeleteFeedback from "../components/DeleteFeedback";

const Feedbacks = () => {
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/Feedbacks",{
          headers : {
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log("Feedbacks:", res.data);
        
        setFeedList(res.data);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  feedList.map((e)=>console.log("Projectid",e.projectId))
  // <DeleteFeedback feedList={feedList} setFeedList={setFeedList}/>

  return (
    <div className="text-white">
      <h1 className="text-2xl px-5 py-6">Feedbacks</h1>

      {/* ✅ Moved AddFeedback form outside the list (global form instead of per-row) */}
      <AddFeedback feedList={feedList} setFeedList={setFeedList} />

      {/* ✅ Changed grid-cols-5 → grid-cols-4 (header had 4 items, not 5) */}
      <div className="grid grid-cols-4 gap-4 bg-white text-black font-bold border-b-2 pb-2 mb-4 mt-6">
        <span>Project Name</span>
        <span>Feedback Id</span>
        <span>Feedback Text</span>
        <span>Action</span>
      </div>

      <div>
        <ul>
          {feedList.map((feed) => (
            <li
              key={feed.feedbackId}
              className="grid grid-cols-4 gap-4 bg-white text-black rounded-lg shadow-md py-2"
            >
              <span className="text-gray-700">{feed.projectName}</span>

              <span className="text-gray-700">{feed.feedbackId}</span>
              <span className="text-gray-700">{feed.feedbackText}</span>
              {/* ✅ Replaced AddFeedback here with placeholder for future Delete/Edit actions */}
              <span className="gap-3"><DeleteFeedback feedList={feedList} setFeedList={setFeedList} feedId={feed.feedbackId}/></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feedbacks;
