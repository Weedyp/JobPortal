import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs();
  return (
    <div className='pt-16'>
      <Navbar />
      <HeroSection />
       <CategoryCarousel />
      <LatestJobs />
      <Footer /> 
    </div>
  )
}

export default Home