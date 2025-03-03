import React,{useEffect, useEffect, useState} from 'react';

const [videos, setVideos]=useState([]);

useEffect(()=>{
  try {
    const getData=async()=>{
        const resp1=await fetch(`${process.env.BACKEND}/data/fetch`,{
            method:'GET',
        });
        if(resp1.ok){
            const data=await resp1.json();
            setVideos(data);
        }
    }
  } catch (error) {
    console.log("Error is : ",error);
  }
},[]);

const dashboard = () => {
  return (
    <div>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <video key={index} controls width="400">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  )
}

export default dashboard;
