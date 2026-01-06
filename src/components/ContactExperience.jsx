import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { ContactBoy } from './ContactBoy'

function VisibilityDrivenRender({ active }) {
    const { invalidate } = useThree()

    // When active, request a new frame every render tick.
    useFrame(() => {
        if (active) invalidate()
    })

    return null
}

function ContactExperience() {
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                setIsVisible(Boolean(entry?.isIntersecting))
            },
            {
                root: null,
                // Any part visible should enable rendering.
                threshold: 0,
                // Start a bit early to avoid popping.
                rootMargin: '200px 0px 200px 0px'
            }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className='w-full h-full'>
            <Canvas
                frameloop='demand'
                camera={{
                    position: [0, 0, 5],
                }}
            >
            <ambientLight intensity={2} />
            <directionalLight position={[-5, 5, 5]} intensity={10} color={'#798191'} />

            <group>
                <ContactBoy active={isVisible} scale={3.8} position={[0, -3.1, 0]} />
            </group>

            <VisibilityDrivenRender active={isVisible} />
            </Canvas>
        </div>
    )
}

export default ContactExperience