// This is the first page which wil be seen to the user.
import Navbar from '../components/Navbar' // Navbar component
import Hero from '../components/Hero' // Hero component
import View from '../components/View' // View component

export default function Home() {
  return (
    <div className="overflow-x-hidden m-0 p-0">
      <Navbar />
      <Hero />
      <View />
    </div>

  )
}
