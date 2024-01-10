import React from 'react' 
import About from '../components/About'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const AboutPage = () => {
  return (
    <div>
      <Navbar/>
      <About style={{ marginTop: '50px' }}/>
      <Footer/>
    </div>
  )
}

export default AboutPage