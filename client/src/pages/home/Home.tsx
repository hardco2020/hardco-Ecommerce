import React from 'react'
import Announcement from '../../components/announcement/Announcement'
import Categories from '../../components/categories/Categories'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Newsletter from '../../components/newsletter/Newsletter'
import Products from '../../components/products/Products'
import Slider from '../../components/slider/Slider'
import Stripe from '../../components/stripe/Stripe'
const Home = () => {
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/>
            <Newsletter/>
            <Stripe/>
            <Footer/>
        </div> 
    )
}

export default Home
