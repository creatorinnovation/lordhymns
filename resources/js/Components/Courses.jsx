import React from 'react'
import CourseCard from '../components/CourseCard';


const Courses = () => {
    return (
        <section id="courses" className="relative pt-0 pb-0 bg-zinc-100 dark:bg-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Our Popular Courses</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Explore our wide range of music courses designed for all skill levels.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    <CourseCard
                        title="Acoustic Guitar"
                        img="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=500&q=60"
                        desc="Master chords, strumming patterns, and fingerstyle techniques with our expert guitarists."
                    />
                    <CourseCard
                        title="Classical Piano"
                        img="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=500&q=60"
                        desc="From Beethoven to Mozart, learn the foundations of music theory and piano performance."
                    />
                    <CourseCard
                        title="Vocal Training (Singing)"
                        img="https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=500&q=60"
                        desc="Improve your range, breath control, and pitch accuracy with our professional vocal coaches."
                    />
                    <CourseCard
                        title="Drums and percussion instruments"
                        img="https://images.unsplash.com/photo-1519892300165-cb5542fb4747?auto=format&fit=crop&w=500&q=60"
                        desc="Find your rhythm and beat. Learn rock, jazz, and fusion drumming styles."
                    />
                    <CourseCard
                        title="mastery of violin"
                        img="https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=500&q=60"
                        desc="Learn proper bowing technique and finger placement for classical and contemporary violin."
                    />
                    <CourseCard
                        title="Music Production"
                        img="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=60"
                        desc="Learn how to record, mix, and master your own tracks using industry-standard software."
                    />
                </div>
            </div>
        </section>
    )
}

export default Courses