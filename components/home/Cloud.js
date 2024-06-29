import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Cloud({opacity,...props}) {
  const { nodes, materials } = useGLTF('/cloud/Airplane.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cloud.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial {...materials['lambert2SG.001']}
        transparent opacity={opacity}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/cloud/Airplane.glb')
