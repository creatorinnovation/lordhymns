import React from 'react'

const WhyLearnCard = ({ Icon, title, description }) => {
    return (
        <div className="p-6 bg-zinc-50 dark:bg-zinc-700 rounded-xl shadow-lg border-t-4 border-blue-500 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-none">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-full">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
    )
}

export default WhyLearnCard