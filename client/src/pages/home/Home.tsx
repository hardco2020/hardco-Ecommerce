import React from 'react'
import Announcement from '../../components/announcement/Announcement'
import Categories from '../../components/categories/Categories'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Newsletter from '../../components/newsletter/Newsletter'
import Products from '../../components/products/Products'
import Slider from '../../components/slider/Slider'
import Email from '../../components/email/Email'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { useGetCartByIDQuery } from '../../redux/api'
import {skipToken} from '@reduxjs/toolkit/query'
import { initProduct } from '../../redux/cartRedux'
import ChatBot from '../../components/chatbot/Chatbot'

const Home = () => {
    const user = useAppSelector(state=>state.auth)
    const dispatch = useAppDispatch();
    const {data} = useGetCartByIDQuery(user.user ? user.user._id: skipToken); 
    if(data){
        console.log(data);
        dispatch(initProduct(data))
    }
    return (
        <>
            <Navbar/> 
            <Announcement/>
            <Slider/>
            <Categories/>
            <Products/>
            <Newsletter/>
            <ChatBot/>
            <Footer/>
        </> 
    )
}

export default Home
