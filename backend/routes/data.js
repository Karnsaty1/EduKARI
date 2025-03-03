const express=require('express');
const router=express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/multer');
const fs = require('fs');

router.post('/upload', upload.single('video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
        folder: 'videos',
      });
  
      fs.unlinkSync(req.file.path); 
  
      res.status(200).json({ videoUrl: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  });

  router.get('/fetch', async (req, res) => {
    try {
        const { resources } = await cloudinary.search
            .expression('resource_type:video AND folder=videos')
            .sort_by('created_at', 'desc')
            .max_results(20)
            .execute();

        const videos = resources.map(video => ({ videoUrl: video.secure_url }));
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
    }
});

  module.exports=router;