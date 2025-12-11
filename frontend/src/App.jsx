import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast';
import New from './pages/New'
import { Edit } from 'lucide-react'
import ProductEdit from './pages/Edit'
import Feed from './pages/Feed'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <Routes>
      <Route path='/' element={<HomePage/>}/>
        <Route path='/feed' element={<Feed/>}/>
      <Route path='/:id' element={<ProductEdit/>}/>
      <Route path='/login' element={<Login></Login>}/>
       <Route path='/register' element={<Register/>}/>
        <Route path='/new' element={<New/>}/>
    </Routes>
     <Toaster/>
    </>
  )
}

export default App
