import React from 'react'
import {
  Star,
} from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative py-24 lg:py-32 px-4 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-l from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-purple-100 dark:bg-purple-900/10 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm">
                        <Star className="w-4 h-4 fill-current" /> India's premier music institute
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                        Unlock your <span className="text-blue-600">musical</span>  potential
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0">
                        Join Lord Hymns to learn from world-class faculty. Whether you're a beginner or an advanced musician, we have the right course for your journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button onClick={() => openAuth('register')} className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1">
                            Start
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                            Courses
                        </button>
                    </div>
                </div>

                <div className="lg:w-1/2 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-700 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="संगीतकार वाद्य यंत्र बजा रहे हैं"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <p className="font-bold text-xl">Learn. Practice. Perform.</p>
                                <p className="text-sm opacity-80">Join 1000+ students today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero