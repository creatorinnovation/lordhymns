import React from 'react'

const Stats = () => {
    return (
        <section className="py-16 bg-blue-600 dark:bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="p-4">
                    <div className="text-4xl font-bold mb-2">10+</div>
                    <div className="text-blue-100">Years of Experience</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl font-bold mb-2">5k+</div>
                    <div className="text-blue-100">Trained Student</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl font-bold mb-2">20+</div>
                    <div className="text-blue-100">Expert Faculty</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-blue-100">Certified Courses</div>
                </div>
            </div>
        </section>
    )
}

export default Stats