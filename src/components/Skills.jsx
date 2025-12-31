import React from 'react'
import { skillsData } from '../data/skillsData';
import Skill from './Skill'

function Skills() {
    return (
        <section id="skills" className="py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 relative z-10 bg-[#111]">
                    <h2 className="text-4xl md:text-5xl font-bold inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                        Skills
                    </h2>
                </div>

                {/* Skills List */}
                <div className='flex flex-wrap justify-center items-center gap-10'>
                    {
                        skillsData.map((skill) => (
                            <Skill key={skill.id} name={skill.name} percent={skill.percent} />
                        ))
                    }       
                </div>
            </div>
        </section>
    )
}

export default Skills