import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import ContentWrapper from './components/ContentWrapper'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ContentWrapper>
    <Home/>
    </ContentWrapper>
    </>
  )
}

export default App
