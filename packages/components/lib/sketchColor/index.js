'use strict'
import React from 'react';
import { SketchPicker } from 'react-color';

class SketchColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: "#fff",
        };
        
    }
    componentDidMount() {
      const { color } = this.props;
      
      color && this.setState({
        color: color
      })

   }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    const {onChangeComplete} = this.props;
    this.setState({ color: color.hex });
    onChangeComplete && onChangeComplete(color)
  };

  render() {
    const { color } = this.state;
    const styles = {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: color,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      
    };
    
    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker width={300} color={ color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default SketchColor