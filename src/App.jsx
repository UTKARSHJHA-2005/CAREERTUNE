import './App.css'
import Home from './pages/Home' // Home Page
import Signup from './pages/Signup' // Signup
import Savedjob from './pages/Savedjob' // Savedjob  
import Job from './pages/Job' // Jobs Page
import Review from './pages/Review' // Review Application 
import SavedjobPage from './pages/Savedjobpage' // SavedjobPage 
import MyJob from './pages/MyJob' // Applications Page
import PostJob from './pages/PostJob' // PostJob Page
import CareerResult from './pages/Career2' // CareerResult from AI component
import JobPage from './pages/JobPage' // JobPage 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // Routing
import JobApply from './pages/Applyjob' // JobApply Page
import Career from './pages/Career' // Career Advisory Page
import Info from './pages/Info' // AdviserInfo Page
import Createad from './pages/Createad' // Becoming an advisor page

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts-job" element={<PostJob />} />
          <Route path="/saved-jobs" element={<Savedjob />} />
          <Route path="/career-advice" element={<Career />} />
          <Route path="/create-adviser" element={<Createad />} />
          <Route path="/career-result" element={<CareerResult />} />
          <Route path="/my-jobs" element={<MyJob />} />
          <Route path='/applyjob/:jobid' element={<JobApply />} />
          <Route path='/review/:jobid' element={<Review />} />
          <Route path='/adviser/:index' element={<Info />} />
          <Route path='/saved-jobs/:jobid' element={<SavedjobPage />} />
          <Route path='/jobs' element={<Job />} />
          <Route path='/jobs/:jobid' element={<JobPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
