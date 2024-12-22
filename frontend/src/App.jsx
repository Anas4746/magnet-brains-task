
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddTask from './components/AddTask'
import Task from './components/Task'
import TaskState from './context/ContextTask'
import SignUp from './components/SignUp'
import Login from './components/Login'
import UserState from './context/ContextUser'
import Pnf from './components/Pnf'
import TaskDetails from './components/TaskDetails'
import EditTask from './components/EditTask'

function App() {

  return (
    <>
    <Router>
      <UserState>
        <TaskState>
          <Routes>
            <Route path='/' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/getTask' element={<Task/>}/>
            <Route path='/addtask' element={<AddTask/>}/>
            <Route path='/task/:id' element={<TaskDetails/>}/>
            <Route path='/edittask/:id' element={<EditTask/>}/>

            <Route path='*' element={<Pnf/>}/>
          </Routes>
        </TaskState>
      </UserState>
    </Router>
    </>
  )
}

export default App
