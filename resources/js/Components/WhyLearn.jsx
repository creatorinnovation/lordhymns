import React from 'react'
import {
  Award,
  Users,
  Feather,
  Headset,
} from 'lucide-react';
import CardWhyLearn from './CardWhyLearn';



const WhyLearn = () => {
  return (
    <section id="why-learn" className="pt-20 pb-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Why Learn With Us</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              At Lord Hymns, we prioritize your music education, providing you with the tools and guidance you need for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CardWhyLearn
              Icon={Award}
              title="Certified Courses"
              description="Our courses are in line with international standards, preparing you for a career in the music industry."
            />
            <CardWhyLearn
              Icon={Users}
              title="Expert Faculty"
              description="Learn from award-winning musicians and experienced teachers who genuinely care about you succeeding."
            />
            <CardWhyLearn
              Icon={Headset}
              title="Modern Studio"
              description="Gain access to our state-of-the-art studio equipped with the best acoustics and recording facilities."
            />
            <CardWhyLearn
              Icon={Feather}
              title="Flexible Learning"
              description="With both online and offline options, you can learn at your own pace and convenience."
            />
          </div>
        </div>
      </section>
  )
}

export default WhyLearn