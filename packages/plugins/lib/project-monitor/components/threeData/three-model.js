import React, { Suspense, useRef, useState } from 'react';
import ThreeSetup from '../three-setup';
import HeatModel from './heat-model';

const ThreeModel = (props) => {
  
    const newProps = {
      ...props,
      heatMap: JSON.parse(props.structSource),
      spotOnlyShow: false
    }
    return (
      <ThreeSetup controls={false} style={{ background: '#60718c' }}>
          <Suspense fallback={null}>
            <HeatModel  {...newProps} />
          </Suspense>
        </ThreeSetup> 
    )
}

export default ThreeModel;
