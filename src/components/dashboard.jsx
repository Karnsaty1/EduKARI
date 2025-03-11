import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState({}); 

  useEffect(() => {
    const getData = async () => {
      try {
        const resp1 = await fetch(`${import.meta.env.VITE_BACKEND}/data/fetch`, {
          method: "GET",
        });

        if (resp1.ok) {
          const data = await resp1.json();
          setVideos(data);
        } else {
          console.log(resp1);
          const r = await resp1.text();
          console.log(r);
        }
      } catch (error) {
        console.error("Error is:", error);
      }
    };

    getData();
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  

  return (
    <div className="dashboard-container">
      <Link to="/upload">
        <button className="add-video-btn">Add Video</button>
      </Link>

      <div className="video-grid">
        {videos.length > 0 ? (
          videos.map((video, index) => {
            const words = video.description.split(" ");
            const shortDesc = words.slice(0, 10).join(" ");
            const isExpanded = expanded[index];

            return (
              <div key={index} className="video-card">
                <div className="video-header">
                  <div className="name-circle" style={{ backgroundColor: "#8E44AD" }}>
                    {getInitials(video.name)}
                  </div>
                  <h3>{video.name}</h3>
                </div>

                <video
                  controls
                  onLoadedMetadata={(e) => {
                    const videoElement = e.target;
                    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
                    videoElement.parentElement.classList.add(
                      aspectRatio > 1 ? "full-width-video" : "small-video"
                    );
                  }}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <h4>{video.title}</h4>
                <p className="description">
                  {isExpanded ? video.description : `${shortDesc}...`}{}
                  {words.length > 10 && (
                    <span className="read-more" onClick={() => toggleReadMore(index)}>
                      {isExpanded ? " Read Less" : " Read More"}
                    </span>
                  )}
                </p>
              </div>
            );
          })
        ) : (
          <p className="no-videos">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
