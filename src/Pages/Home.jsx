import React from 'react'
import Carousel from '../components/Carousel'
import CarouselResposive from '../components/CarouselResponsive'
import Slider from '../components/Slider'

const Home = () => {
  
  return (
    <div>
      <div className='mt-12 sm:mt-28'>
        <Slider></Slider>
        <Carousel></Carousel>
        <CarouselResposive></CarouselResposive>
      </div>
    </div>
  )
}

export default Home
