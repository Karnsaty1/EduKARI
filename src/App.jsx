import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ContentWrapper from './components/ContentWrapper'
import Sign from './components/Sign';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <ContentWrapper>
      <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sign' element={<Sign/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/upload' element={<Upload/>}/>
      </Routes>
    </ContentWrapper>
  
    </>
  );
}

export default App
