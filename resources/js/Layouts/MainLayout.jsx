import Footer from '@/Components/Footer'
import NavBar from '@/Components/NavBar'
import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout