// This is the first page which wil be seen to the user.
import Navbar from '../components/Navbar' // Navbar component
import Hero from '../components/Hero' // Hero component

export default function Home() {
  return (
  <div className="overflow-hidden">
   <Navbar />
   <br />
   <br />
   <Hero />
  </div>
  )
}
