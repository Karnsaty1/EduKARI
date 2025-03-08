import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  

  useEffect(() => {
    const getData = async () => {
      try {
        const resp1 = await fetch(`${import.meta.env.VITE_BACKEND}/data/fetch`, {
          method: 'GET',
        });

        if (resp1.ok) {
          const data = await resp1.json();
          setVideos(data);
        }
        else{
          console.log(resp1);
          
          const r=await resp1.text();
          console.log(r);

        }
      } catch (error) {
        console.error("Error is:", error);
      }
    };

    getData(); 
  }, []);

  return (
    <div>
      <Link to='/upload'><button>Add video</button></Link>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index} className="video-card" style={{border:'2px solid black', margin:'10px 0px'}}>
          <h3 style={{margin:'20px auto'}}>{video.name}</h3>
          <h4 style={{margin:'20px auto'}}>{video.title}</h4>
          <p style={{margin:'20px auto'}}>{video.description}</p>
          <video controls width="50%">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default Dashboard;
