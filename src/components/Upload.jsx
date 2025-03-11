import React,{useState} from 'react'
import './comp.css'
import loader from './Lightning.gif'
const Upload = () => {

  const [loading ,setLoading]=useState(false);

 const [formData, setFormData] = useState({
   title: "",
    description: "",
    video: null,
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("video", formData.video);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
        const resp1=await fetch(`${import.meta.env.VITE_BACKEND}/data/upload`,{
            method:'POST',
           
            credentials:'include',
            body:data
        });
        if(!resp1.ok){
            console.log(resp1);
            const text=await resp1.text();
            console.log(text);   
        }
        else{
          alert("Uploaded Successfully !!!");
        }
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }


  return (

    loading?(

      <div>
        <img src={loader} alt='loader' className='loading-image'/>
      </div>
    )
    
    
    :
    
    
    
    (<div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
   <input
     type="text"
     name="title"
     placeholder="Video Title"
     value={formData.title}
     onChange={handleChange}
     required
   />
   <textarea
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
 
     </div>)



    
  )
}
}

export default Upload;
