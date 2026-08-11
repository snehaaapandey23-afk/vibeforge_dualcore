import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

function Blob() {
  const ref = useRef<Mesh>()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.15
      const s = 1 + Math.sin(t * 1.2) * 0.06
      ref.current.scale.set(s, s, s)
    }
  })
  return (
    <mesh ref={ref} position={[0,0,0]}>
      <icosahedronGeometry args={[1.2, 32]} />
      <meshStandardMaterial color="#6C63FF" transparent opacity={0.85} metalness={0.6} roughness={0.2} envMapIntensity={0.6} />
    </mesh>
  )
}

export default function ThreeBlob(){
  return (
    <div className="w-full h-64 rounded-xlpanel overflow-hidden glass">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 5]} intensity={0.8} />
        <Blob />
      </Canvas>
    </div>
  )
}
