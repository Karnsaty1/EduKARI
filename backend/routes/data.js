const express=require('express');
const router=express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/multer');
const fs = require('fs');

router.post('/upload', upload.single('video'), async (req, res) => {
    try {

      const {title,description}=req.body;
      const email = req.cookies.email;
      const name = req.cookies.name;

      if (!email) {
        return res.status(401).json({ message: "Unauthorized: No email found in cookies" });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
        folder: 'videos',
      }); 
  
      fs.unlinkSync(req.file.path); 

      const videoData = {
        title,
        description,
        name,
        videoUrl: result.secure_url,
        uploadedAt: new Date(),
      };
  
      
      const db = getDb("videos"); 
      const updatedDoc = await db.updateOne(
        { email: email }, 
        { $push: { videos: videoData } }, 
        { upsert: true } 
      );
  
      res.status(200).json({ videoUrl: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  });

  router.get('/fetch', async (req, res) => {
    try {
      const db = getDb("videos");

      const users = await db.find().toArray();

      let allVideos = [];
      users.forEach(user => {
          if (user.videos) {
              allVideos.push(...user.videos);
          }
      });

      allVideos = allVideos.sort(() => Math.random() - 0.5);
      allVideos.reverse();

      res.status(200).json(allVideos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
    }
});

  module.exports=router;