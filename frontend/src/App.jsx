import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Project from './pages/Project'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'


function App() {
  
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/project' element={<Project />} />
        <Route path='/post/:slug' element={<PostPage />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
