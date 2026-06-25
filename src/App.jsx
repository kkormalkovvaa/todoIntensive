import React from "react"
import {Routes, Route, Navigate} from "react-router"
import Todo from "./pages/Todo"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute" 
import NotFound from "./pages/NotFound"
import './components.css'

function App() {
  return (
    <div className="todos">
      <Routes>
        <Route path="/" element={<Navigate to={'register'}/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="todo" element={<Todo/>}/>
        </Route>
        <Route path="register" element={<Register />}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/:id" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App