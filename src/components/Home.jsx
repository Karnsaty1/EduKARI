import React from 'react'
import Navbar from './Navbar'
import './Home.css'
const Home = () => {
  return (
    <div className='div-home'>
        <header>
        <Navbar/>
        <img src="https://th.bing.com/th/id/R.8107a38af6851e818b451bd64056be02?rik=mbAmoNwWMdHXFg&pid=ImgRaw&r=0" alt="" />
        </header>
        <footer className='home-footer'>
          <span style={{fontWeight:'500', fontSize:'larger'}}>Contact Us : </span>
            <ul type='none'>
                <li><img src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338509_1280.png" alt="fb.logo" /></li>
                <li><img src="https://www.kindpng.com/picc/m/618-6187794_instagram-logo-for-contact-hd-png-download.png" alt="insta.logo" /></li>
                <li><img src="https://pluspng.com/img-png/logo-snapchat-png-fichier-logo-snapchat-png-2100.png" alt="snapchat.logo" /></li>
                <li><img src="https://static.vecteezy.com/system/resources/previews/021/460/383/original/whatsapp-logo-free-png.png" alt="whatsapp.logo" /></li>
                
            </ul>
        </footer>
    </div>
  )
}

export default Home
