import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(null);

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
    <div>
      <Link to="/upload">
        <button>Add video</button>
      </Link>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index} className="video-card" style={{ border: "2px solid black", margin: "10px 0px" }}>
            <h3 style={{ margin: "20px auto" }}>{video.name}</h3>
            <h4 style={{ margin: "20px auto" }}>{video.title}</h4>
            <p style={{ margin: "20px auto" }}>{video.description}</p>
            <video controls width="50%">
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

           
            <button onClick={() => setShowShareOptions(showShareOptions === index ? null : index)}>Share</button>

           
            {showShareOptions === index && (
              <div className="share-options" style={{ marginTop: "10px" }}>
                <button onClick={() => shareVideo("whatsapp", video.videoUrl)}>WhatsApp</button>
                <button onClick={() => shareVideo("facebook", video.videoUrl)}>Facebook</button>
                <button onClick={() => shareVideo("twitter", video.videoUrl)}>Twitter</button>
                <button onClick={() => shareVideo("telegram", video.videoUrl)}>Telegram</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default Dashboard;
