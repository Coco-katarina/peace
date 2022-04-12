/**
 * Created by Xumeng 
 * on 2021/3/17. 初始化3d渲染器插槽组件
 */
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls } from "@react-three/drei";

const ThreeSetup = ({
  children,
  cameraFov = 75,
  cameraPosition = [-5,5,7],
  controls = true,
  ...restProps
}) => {
  const canvasRef = useRef(null);

  return (
    <React.Fragment>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: cameraPosition, fov: cameraFov }}
        pixelRatio={window.devicePixelRatio}
        ref={canvasRef}
        {...restProps}
      >
        {children}
        <ambientLight intensity={0.8} />
        <pointLight intensity={1} position={[0, 6, 0]} />
        {controls && <OrbitControls />}
      </Canvas>
      <Loader />
     </React.Fragment>
  )
}
export default ThreeSetup;