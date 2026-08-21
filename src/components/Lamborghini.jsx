import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Placeholder 3D Lamborghini Model
 * This uses stylized primitives (boxes, cylinders) to represent the car parts.
 * Once you have a real 'lambo.glb', you would use:
 *   const { nodes, materials } = useGLTF('/lambo.glb')
 * and replace these primitive meshes with the actual nodes.
 */
const Lamborghini = forwardRef((props, ref) => {
  const carGroup = useRef();
  const doorGroup = useRef(); // Left door
  const bonnetGroup = useRef(); // Rear engine bonnet
  
  const wheelFL = useRef();
  const wheelFR = useRef();
  const wheelRL = useRef();
  const wheelRR = useRef();

  // Expose these refs to the parent component (Landing.jsx) for GSAP animations
  useImperativeHandle(ref, () => ({
    car: carGroup.current,
    door: doorGroup.current,
    bonnet: bonnetGroup.current,
    wheels: [wheelFL.current, wheelFR.current, wheelRL.current, wheelRR.current],
  }));

  // Materials
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.3, metalness: 0.8 });
  const glassMaterial = new THREE.MeshPhysicalMaterial({ color: '#000000', transmission: 0.9, opacity: 1, transparent: true, roughness: 0.1 });
  const wheelMaterial = new THREE.MeshStandardMaterial({ color: '#222222', roughness: 0.8 });
  const rimMaterial = new THREE.MeshStandardMaterial({ color: '#555555', metalness: 1, roughness: 0.2 });
  const brakeMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000', roughness: 0.4 });
  const engineMaterial = new THREE.MeshStandardMaterial({ color: '#ff6600', emissive: '#aa2200', metalness: 0.8, roughness: 0.4 });

  // A helper component to draw a detailed placeholder wheel
  const Wheel = ({ wheelRef, position }) => (
    <group position={position} ref={wheelRef}>
      {/* Tire */}
      <Cylinder args={[0.35, 0.35, 0.25, 32]} rotation={[Math.PI / 2, 0, 0]} material={wheelMaterial} />
      {/* Rim */}
      <Cylinder args={[0.25, 0.25, 0.26, 16]} rotation={[Math.PI / 2, 0, 0]} material={rimMaterial} />
      {/* Brake Caliper */}
      <Box args={[0.1, 0.2, 0.05]} position={[0, 0.2, 0.1]} material={brakeMaterial} />
    </group>
  );

  return (
    <group {...props} ref={carGroup}>
      
      {/* Main Body (Chassis) */}
      <Box args={[1.8, 0.3, 4.2]} position={[0, 0.3, 0]} material={bodyMaterial} castShadow receiveShadow />
      
      {/* Front Nose */}
      <Box args={[1.7, 0.2, 1.0]} position={[0, 0.25, 2.6]} rotation={[-0.1, 0, 0]} material={bodyMaterial} castShadow />

      {/* Cabin / Roof */}
      <Box args={[1.4, 0.45, 1.8]} position={[0, 0.67, 0.2]} material={glassMaterial} />

      {/* Driver Side Door (Scissor Door - rotates up/forward) */}
      {/* The hinge is positioned at the front bottom of the door opening */}
      <group position={[0.9, 0.3, 1.0]} ref={doorGroup}>
        {/* We offset the door mesh so the rotation happens exactly at the hinge position */}
        <Box args={[0.05, 0.5, 1.2]} position={[0, 0.25, -0.6]} material={bodyMaterial} castShadow />
        {/* Door Window */}
        <Box args={[0.04, 0.35, 1.0]} position={[0, 0.67, -0.5]} material={glassMaterial} />
      </group>

      {/* Passenger Side Door (Static) */}
      <Box args={[0.05, 0.5, 1.2]} position={[-0.9, 0.55, 0.4]} material={bodyMaterial} />

      {/* Rear Engine Bonnet (Opens upwards from the rear) */}
      <group position={[0, 0.8, -0.7]} ref={bonnetGroup}>
        <Box args={[1.3, 0.05, 1.2]} position={[0, 0, -0.6]} material={bodyMaterial} castShadow />
      </group>

      {/* Exposed Engine (Visible when bonnet opens) */}
      <Box args={[0.8, 0.4, 1.0]} position={[0, 0.5, -1.3]} material={engineMaterial} castShadow />

      {/* Wheels */}
      <Wheel position={[0.9, 0.35, 1.6]} wheelRef={wheelFL} />
      <Wheel position={[-0.9, 0.35, 1.6]} wheelRef={wheelFR} />
      <Wheel position={[0.9, 0.35, -1.4]} wheelRef={wheelRL} />
      <Wheel position={[-0.9, 0.35, -1.4]} wheelRef={wheelRR} />
      
    </group>
  );
});

export default Lamborghini;
