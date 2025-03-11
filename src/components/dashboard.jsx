import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import './comp.css';
import loader from './ballsparade.gif';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const [loading ,setLoading]=useState(true);
=======
import "./dashboard.css";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState({}); 
>>>>>>> 65e8777cdc53d385e420ddfb1ebe99212bee9703

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
      finally{
        setLoading(false);
      }
    };

    getData();
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  

  return (
<<<<<<< HEAD
    loading ? (
      <div>
        <img src={loader} alt='loader' className="loading-image"/>
      </div>
    ) : (
      <div className="dashboard">
        <Link to="/upload">
          <button className="add-video-btn">Add video</button>
        </Link>
        <div className="videos-container">
          {videos.length > 0 ? (
            Array.from({ length: Math.ceil(videos.length / 3) }).map((_, rowIndex) => (
              <div key={rowIndex} className="video-row">
                {videos.slice(rowIndex * 3+3, rowIndex * 3).map((video, index) => (
                  <div key={index} className="video-card">
                    <h3>{video.name}</h3>
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                    <video controls>
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    <button
                      className="share-button"
                      onClick={() => setShowShareOptions(showShareOptions === index ? null : index)}
                    >
                      Share
                    </button>

                    {showShareOptions === index && (
                      <div className="share-options">
                        <button onClick={() => shareVideo("whatsapp", video.videoUrl)}>WhatsApp</button>
                        <button onClick={() => shareVideo("facebook", video.videoUrl)}>Facebook</button>
                        <button onClick={() => shareVideo("twitter", video.videoUrl)}>Twitter</button>
                        <button onClick={() => shareVideo("telegram", video.videoUrl)}>Telegram</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="no-videos">No videos available</p>
          )}
        </div>
      </div>
    )
=======
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
>>>>>>> 65e8777cdc53d385e420ddfb1ebe99212bee9703
  );
};
export default Dashboard;