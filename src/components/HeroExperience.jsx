import { Canvas } from '@react-three/fiber'
import React from 'react'
import { HeroBoy } from './HeroBoy'

function HeroExperience() {
    return (
        <Canvas
            camera={{
                position: [0, 2, 10], // ↑ increase Y to move camera above
                fov: 45,
                near: 0.1,
                far: 1000,
            }}
        >
            <ambientLight />

            <directionalLight />
            <directionalLight />

            <group>
                <HeroBoy scale={3.7} position={[0.5, -4.4, 0]} rotation={[-0.6, 0, 0]} />
            </group>
        </Canvas>
    )
}

export default HeroExperience