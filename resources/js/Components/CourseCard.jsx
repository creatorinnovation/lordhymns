import React from 'react'
import {
  ArrowRight,
} from 'lucide-react';

const CourseCard = ({ title, img, desc }) => {
    return (
        <div className="group bg-white dark:bg-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-zinc-100 dark:border-zinc-600">
            <div className="h-48 overflow-hidden relative">
                <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">{title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">{desc}</p>
                <button className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default CourseCard