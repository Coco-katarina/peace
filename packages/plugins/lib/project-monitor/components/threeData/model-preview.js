import React, { Suspense, useEffect} from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Loader, OrbitControls, useGLTF} from "@react-three/drei";

const Model = (props) => {
    const { previewImgPath  } = props;
    const gltf = useGLTF(previewImgPath);
    const camera = useThree((state) => state.camera);
    useEffect(()=>{
        // 计算加载模型的包围盒，重新定义相机位置
        const boxHelper = new THREE.BoxHelper();
       
        const { scene: geometry } = gltf;
      
        boxHelper.setFromObject(geometry);
        const center =  boxHelper.geometry.boundingSphere.center;
      
        const radius = boxHelper.geometry.boundingSphere.radius;
       
        const cameraPos = new THREE.Vector3( center.x + geometry.position.x, center.y + geometry.position.y, radius * 2 + center.z + geometry.position.z)
        
        camera.position.x = cameraPos.x;
        camera.position.y = cameraPos.y;
        camera.position.z = cameraPos.z;
        
      },[])
    return (
        <mesh>
        <primitive object={gltf.scene}  dispose={null}  />
        </mesh>
    )
}

const HeatModel = (props) => {
  const { previewImgPath  } = props;
  return (
    <group   dispose={null}>
        {previewImgPath && <Model {...props} />}
    </group>
  );
}
const ThreeHeatMap = (props) => {
   
    return (
        <React.Fragment>
        <Canvas
          colorManagement
          shadowMap
          camera={{ position: [-5,5,7], fov: 75 }}
          pixelRatio={window.devicePixelRatio}
          style={{ background: '#60718c' }}
        >
          <Suspense fallback={null}>
            <HeatModel {...props} />
          </Suspense>
          <ambientLight intensity={0.8} />
          <pointLight intensity={1} position={[0, 6, 0]} />
          <OrbitControls />
        </Canvas>
        <Loader />
       </React.Fragment>
    )
}

export default ThreeHeatMap;


