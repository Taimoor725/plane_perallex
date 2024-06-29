
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function AirPlane(props) {
  const { nodes, materials } = useGLTF('./airplane/Airplane.glb')
const helix=useRef();
const HelixSpeed=5;
useFrame((_state,delta)=>{
    helix.current.rotation.x += delta* HelixSpeed
})


  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PUSHILIN_Plane_Circle000.geometry}
        material={materials.plane}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        ref={helix}
        castShadow
        receiveShadow
        geometry={nodes.PUSHILIN_Plane_Circle001.geometry}
        material={materials.plane}
        position={[0, -0.01, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('./airplane/Airplane.glb')

