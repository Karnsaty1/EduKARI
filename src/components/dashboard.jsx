import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './comp.css';
import loader from './ballsparade.gif';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const [loading ,setLoading]=useState(true);

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

  const shareVideo = (platform, videoUrl) => {
    const encodedUrl = encodeURIComponent(videoUrl);

    switch (platform) {
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${encodedUrl}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}`, "_blank");
        break;
      case "telegram":
        window.open(`https://t.me/share/url?url=${encodedUrl}`, "_blank");
        break;
      default:
        break;
    }
  };

  return (
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
  );
};
export default Dashboard;