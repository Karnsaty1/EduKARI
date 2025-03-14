import React from 'react'
import {Link} from 'react-router-dom';
import './comp.css'
const NavbarBeforeLog = () => {
  return (
    <div>
        <div>
      <nav className='navbar-forul'>
        <ul type='none'>
            <li className='Tagile'><strong>EduKARI</strong></li>
             <li><Link to='/sign'><button>SignUp</button></Link></li>
            
          
        </ul>
      </nav>
    </div>
    </div>
  )
}

export default NavbarBeforeLog
