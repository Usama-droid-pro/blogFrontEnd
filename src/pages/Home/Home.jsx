import React from 'react'
import Header from '../../layout/Header/Header.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import Categories from '../../components/CategorySection/Categories.jsx'
import BlogComponent from '../../components/BlogsSection/BlogComponent.jsx'
 import Footer from '../../layout/Footer/Footer.jsx'
 import SubscriptionSection from '../../components/subscribe/SubscriptionSection.jsx'
export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <Categories />
    <BlogComponent />
    <SubscriptionSection />
    <Footer />
    </>
  )
}
