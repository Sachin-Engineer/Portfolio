import React, { useEffect, useRef, useState } from 'react';

const ProjectCard = ({ project }) => {
    const { title, titleColor, subtitle, subtitleColor, description, technologies, image, link, alignment } = project;

    const rootRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        // If already triggered, nothing to do
        if (mounted) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // run after first paint so transitions apply
                    requestAnimationFrame(() => setMounted(true));
                    observer.unobserve(entry.target); // animate only once
                    observer.disconnect();
                }
            },
            {
                threshold: 0.25,          // trigger when ~25% visible
                rootMargin: '0px 0px -10% 0px', // slightly earlier/later control
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [mounted]);

    const imageEnterFrom =
        alignment === 'right'
            ? 'md:translate-x-[-60px]' // from left when image is on the right
            : 'md:translate-x-[60px]';  // from right when image is on the left

    const lineOrigin = alignment === 'right' ? 'origin-left' : 'origin-right';

    return (
        <div
            ref={rootRef}
            className={`project-card flex flex-col md:flex-row gap-10 md:gap-40 items-center mb-16 ${alignment === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Project Image */}
            <a
                href={`${link}`}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 project-image w-full md:w-1/2"
            >
                {/* Yellow Glow Layer - Static */}
                <div className="absolute inset-0 -z-10">
                    <div className="w-full h-full rounded-full bg-yellow-500/20 blur-2xl"></div>
                </div>

                {/* Laptop Image - Slides In when card enters viewport */}
                <div
                    className={[
                        'relative',
                        'transition-all duration-700 ease-out hover:scale-102 md:hover:scale-105',
                        mounted
                            ? 'opacity-100 translate-y-0 md:translate-x-0'
                            : `opacity-0 translate-y-2 ${imageEnterFrom}`,
                    ].join(' ')}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto rounded-lg shadow-2xl"
                    />
                </div>
            </a>

            {/* Project Details */}
            <div className="project-details w-full md:w-1/2">
                <div className="flex items-baseline gap-2 mb-2">
                    <h3 className={`text-2xl md:text-3xl font-bold text-[${titleColor}]`}>{title}</h3>
                </div>
                <p className={`text-[${subtitleColor}] text-sm mb-4`}>{subtitle}</p>

                <p className="text-gray-300 mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Connecting Line - slower than image, triggers on view */}
            <div
                className={[
                    'hidden md:block absolute',
                    alignment === 'right' ? 'left-1/2' : 'right-1/2',
                    'h-[1px] w-1/4 bg-[#9098A6]',
                    'transform-gpu',
                    lineOrigin,
                    'transition-transform ease-out',
                    'duration-1000',
                    'delay-100',
                    mounted ? 'scale-x-100' : 'scale-x-0',
                ].join(' ')}
            />
        </div>
    );
};

export default ProjectCard;