
import ParcelBackground from './components/ParcelBackground'
import NavBar from "./components/Navbar.jsx";
import Home from './section/Home'
import About from './section/About'
import Skill from './section/Skill'
import Projects from './section/Projects'
import Testimonial from './section/Testimonial'
import Contact from './section/Contact'
import Footer from './section/Footer'
import CustomCursor from './components/CustomCursor';
import IntroAnimation from './components/IntroAnimation';
import React from 'react'

export default function App() {

  const [introDone, setIntroDone] = React.useState(false);
  return (
    <>

    {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}

      {introDone &&(
    <div className='relative'>
      {/* <ParcelBackground /> */}
      <CustomCursor />
      <NavBar />
      <Home />
      <About />
      <Skill />
      <Projects />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
    )}
    </>
  )
}