import React from "react"
import {Routes, Route} from "react-router"
import PrivateRoute from "./components/PrivateRoute" 
import Todo from "./components/Todo"
import Register from "./components/Register"
import './components.css'
import Login from "./components/Login"
import NotFound from "./components/NotFound"

function App() {
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