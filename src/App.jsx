import React from "react"
import {Routes, Route} from "react-router"
import Todo from "./pages/Todo"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute" 
import NotFound from "./components/NotFound"
import './components.css'

function App() {
  // console.log(import.meta.env.VITE_URL)
  return (
    <div className="todos">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="todo" element={<Todo/>}/>
        </Route>
        <Route path="register" element={<Register />}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/:id" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* <Login />
      <Register />
      <Todo/> */}
    </div>
  )
}

export default App