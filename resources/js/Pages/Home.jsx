import React from 'react'
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Hero';
import Courses from '@/Components/Courses';
import WhyLearn from '@/Components/WhyLearn';
import ExamBoards from '@/Components/ExamBoard';
import Stats from '@/Components/Stats';


const Home = () => {
    return (
        <div>
            <MainLayout>
                <Head title="Home" />

                {/* --- Hero Section --- */}
                <Hero />

                {/* --- Courses Section --- */}
                <Courses />

                {/* --- Why Learn With Us Section --- */}
                <WhyLearn />

                {/* --- Exam Boards Section --- */}
                <ExamBoards />

                {/* --- Stats/Features --- */}
                <Stats />
            </MainLayout>
        </div>
    )
}

export default Home