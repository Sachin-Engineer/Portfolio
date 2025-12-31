import React from 'react';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projectsData';

const Projects = () => {
    return (
        <section id="projects" className="py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-12 relative z-10 bg-[#111]">
                    <h2 className="text-4xl md:text-5xl font-bold inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                        Projects
                    </h2>
                </div>

                {/* Projects List */}
                <div className="projects-container">
                    {projectsData.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Connecting line (fade/blur at both ends) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#9098A6] to-transparent"/>
            </div>
        </section>
    );
};

export default Projects;