import NavBar from '@/Components/NavBar'
import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default MainLayout