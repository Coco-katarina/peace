import React, { Suspense, useRef, useState } from 'react';
import ThreeSetup from '../three-setup';
import HeatModel from './heat-model';


const ThreeHeatMap = (props) => {
   
    return (
      
        <ThreeSetup {...props}  controls={false} style={{ background: '#60718c' }}>
          <Suspense fallback={null}>
              <HeatModel {...props} spotOnlyShow={true}  />
          </Suspense>
        </ThreeSetup> 
      
        
    )
}

export default ThreeHeatMap;
