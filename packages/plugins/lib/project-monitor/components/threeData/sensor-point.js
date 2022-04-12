 import React from 'react';
 import { connect } from 'react-redux';
 import { MinusCircleOutlined } from '@ant-design/icons';
 import * as THREE from 'three';

 import boxStyle from './style.css'
 
 class SensorPoint extends React.Component {
    
 
     constructor(props) {
         super(props);
         this.state = {
             isDragging: false,
             labelPosition: new THREE.Vector2()
         }
     }
 
     _onPointClick = (event) => {
         const { mouseInput, info, hasSetted, getRightSpot, user, onInfoClick } = this.props;
 
         const resources = user.resources;
         const LayoutHotspot3D = resources.length == 0 ? false : resources.indexOf("007002") > -1 ? true : false;
 
         if (hasSetted) {
             getRightSpot(info)
         } else {
             if (LayoutHotspot3D) {
                 event.preventDefault();
                 event.stopPropagation();
                 onInfoClick(info);
             }
         }
     };
 
    
 
    
 
     _deleteSpot = (e) => {

        e.stopPropagation();
         const { info, deleteSpot } = this.props;
         deleteSpot(info);
     }
 
     render() {
         const { isDragging, labelPosition } = this.state;
         const { info, hasSetted, user, selected } = this.props;
 
         const opacity = isDragging ? 0.4 : 1;
         const resources = user.resources;
         const DeleteConfiguredHotspots = resources.length == 0 ? false : resources.indexOf("007002") > -1 ? true : false;
      
         return (<div>
             {hasSetted ?
                 <p  onClick={this._onPointClick} className={boxStyle['threeIcon']} >
                     <span>{info.location}</span>
                     {DeleteConfiguredHotspots ? <MinusCircleOutlined className={boxStyle['threeTip']} onClick={this._deleteSpot} /> : null}
                 </p>
                 :
                 <p  className={boxStyle['threeIcon']}
                     onClick={this._onPointClick} >
                     <span className={selected ? boxStyle['station-tree-selected']  :boxStyle['station-tree-normal']}>{info.location}</span>
                 </p>
             }
         </div>)
     }
 }
 
 function mapStateToProps(state) {
     const { auth } = state;
 
     return {
         user: auth.user
     }
 }
 
 export default connect(mapStateToProps)(SensorPoint)