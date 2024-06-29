"use client"
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, ScrollControls, useScroll } from "@react-three/drei";
import Background from "@/components/home/Background";
import AirPlane from "@/components/home/AirPlane"
import Cloud from '@/components/home/Cloud';
import * as THREE from 'three'

function page() {
  

  return (
    <div className="w-screen h-screen ">
      <Canvas>
        
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={5} damping={0.3}>
          <OrbitControls enableZoom={false} />
          <Enviroment/>
          </ScrollControls>
      </Canvas>
    </div>
  )
}

export default page


const Enviroment=()=>{


  const No_Of_Points = 43;

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(-2, 0, -20),
      new THREE.Vector3(-3, 0, -30),
      new THREE.Vector3(0, 0, -40),
      new THREE.Vector3(5, 0, -50),
      new THREE.Vector3(7, 0, -60),
      new THREE.Vector3(5, 0, -70),
      new THREE.Vector3(0, 0, -80),
      new THREE.Vector3(0, 0, -90),
      new THREE.Vector3(0, 0, -100)
    ], false, 'catmullrom', 0.5);
  }, []);

  const LinePoints = useMemo(() => {
    return curve.getPoints(No_Of_Points);
  }, [curve, No_Of_Points]);


  const Shape = useMemo(() => {
    const Shape = new THREE.Shape();
    Shape.moveTo(0, -0.2)
    Shape.lineTo(0, 0.2);
    return Shape
  }, [curve])

  const camerGroup=useRef();
  const scroll =useScroll();
  const airPlane=useRef()

  useFrame((_state, delta) => {
    const currPointIndex = Math.min(
      Math.round(scroll.offset * LinePoints.length),
      LinePoints.length - 1
    );
    const currPoint = LinePoints[currPointIndex];
    const PointAhead=LinePoints[Math.min(currPointIndex+1),LinePoints.length-1];
    const xDisplacment=(PointAhead.x-currPoint.x)*80;
    const angelRotation=(xDisplacment < 0 ? 1 : -1)*Math.min(Math.abs(xDisplacment),Math.PI/3)
    const TargetAirPlane=new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airPlane.current.rotation.x,
        airPlane.current.rotation.y,
        angelRotation,
      )
    )

    airPlane.current.quaternion.slerp(TargetAirPlane,delta*2)
    camerGroup.current.position.lerp(currPoint, delta * 24);

});

  return(
    <>
    <group ref={camerGroup}>
    <perspectiveCamera position={[0,0,10]} fov={40} makeDefault />
    <Background />
    <group ref={airPlane}>
    <Float floatIntensity={2} speed={2}>
      <AirPlane rotation-y={Math.PI / 2} scale={[1, 1, 1]} position-y={-0.2}
      />
    </Float>
    </group>
    </group>
    <group position-y={-2}>
      {/* <Line transparent color={'white'} opacity={0.7} lineWidth={8} points={LinePoints}/> */}

      <mesh>
        <extrudeGeometry args={[Shape, { steps: No_Of_Points, bevelEnabled: false, extrudePath: curve }]} />
        <meshStandardMaterial color={'white'} opacity={0.7} transparent />
      </mesh>
    </group>
    <Cloud opacity={0.7} scale={[0.5, 0.6, 0.5]} position={[-5, 2, -1]} />
    <Cloud opacity={0.7} scale={[0.5, 0.6, 0.5]} position={[4, 3, -1.5]} />
    <Cloud opacity={0.7} scale={[0.4, 0.5, 0.5]} position={[4, -0.4, 2]} rotation-y={Math.PI}/>
    <Cloud opacity={0.7} scale={[0.4, 0.4, 0.3]} position={[2, 2, -7]} rotation-y={Math.PI} />
    <Cloud opacity={0.5} scale={[0.4, 0.3, 0.3]} position={[3, 2.4, -7]} rotation-y={Math.PI} />
    <Cloud opacity={0.7} scale={[0.3, 0.4, 0.4]} position={[-2, -0.4, -2]} />
    <Cloud opacity={0.3} scale={[0.5, 0.5, 0.6]} position={[-3, 0.7, -10]} />

  </>
  )
}

