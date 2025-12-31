import { Canvas } from '@react-three/fiber'
import React from 'react'
import { ContactBoy } from './ContactBoy'

function ContactExperience() {
    return (
        <Canvas
            camera={{
                position: [0, 0, 5],
            }}
        >
            <ambientLight intensity={2} />
            <directionalLight position={[-5, 5, 5]} intensity={10} color={'#798191'} />

            <group>
                <ContactBoy scale={3.8} position={[0, -3.1, 0]} />
            </group>
        </Canvas>
    )
}

export default ContactExperience