import React,{useState} from 'react'
import './comp.css'
const Upload = () => {


 const [formData, setFormData] = useState({
   title: "",
    description: "",
     video:null
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("video", formData.video);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=async()=>{
    try {
        const resp1=await fetch(`${process.env.VITE_BACKEND}/data/upload`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:data
        });
        if(!resp1.ok){
            console.log(resp1);
        }
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <div>
     <form onSubmit={handleSubmit} encType="multipart/form-data">
  <input
    type="text"
    name="title"
    placeholder="Video Title"
    value={formData.title}
    onChange={handleChange}
    required
  />
  <input
    type="text"
    name="description"
    placeholder="Video Description"
    value={formData.description}
    onChange={handleChange}
    required
  />
 
  <input
    type="file"
    name="video"
    accept="video/*"
    onChange={handleFileChange}
    required
  />
  <button type="submit">Submit</button>
</form>

    </div>
  )
}

export default Upload;
