import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Network({ count = 80 }: { count?: number }) {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      arr.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6))
    }
    return arr
  }, [count])

  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const positionsRef = useRef<Float32Array | null>(null)

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.x * 0.6 + Math.sin(t * 0.06) * 0.04
      groupRef.current.rotation.x = mouse.y * 0.2 + Math.cos(t * 0.02) * 0.02
    }

    // animate points and update line geometry
    if (linesRef.current && positionsRef.current) {
      const pos = positionsRef.current
      let idx = 0
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        // subtle motion
        p.x += Math.sin(t * 0.7 + i) * 0.002
        p.y += Math.cos(t * 0.5 + i * 0.5) * 0.002
        p.z += Math.sin(t * 0.3 + i * 0.3) * 0.001
        // mouse push
        p.x += (mouse.x * 1.2) * 0.0006
        p.y += (mouse.y * 0.8) * 0.0006
      }

      // connections: connect to nearest few
      const maxConn = 3
      for (let i = 0; i < points.length; i++) {
        let connections = 0
        for (let j = i + 1; j < points.length && connections < maxConn; j++) {
          const d = points[i].distanceTo(points[j])
          if (d < 3.2) {
            pos[idx++] = points[i].x
            pos[idx++] = points[i].y
            pos[idx++] = points[i].z
            pos[idx++] = points[j].x
            pos[idx++] = points[j].y
            pos[idx++] = points[j].z
            connections++
          }
        }
      }
      // fill rest with zeros
      for (; idx < pos.length; idx++) pos[idx] = 0
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute attachObject={['attributes', 'position']} count={points.length} array={new Float32Array(points.flatMap(p=>[p.x,p.y,p.z]))} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={3} sizeAttenuation color={'#4F8CFF'} transparent opacity={0.9} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry attach="geometry">
          {/* allocate max pairs: count * maxConn */}
          <bufferAttribute attachObject={['attributes', 'position']} count={count * 3 * 2} array={new Float32Array(count * 3 * 2 * 3)} itemSize={3} ref={(attr: any) => { if (attr) positionsRef.current = attr.array }} />
        </bufferGeometry>
        <lineBasicMaterial color={'#4F8CFF'} transparent opacity={0.12} linewidth={1} />
      </lineSegments>
    </group>
  )
}

export default function NeuralNetwork() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{ height: '100vh' }}>
        <color attach="background" args={[0x050816]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <Network count={80} />
      </Canvas>
    </div>
  )
}
