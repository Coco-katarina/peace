import React, { Component } from 'react';

import styleBox from'../../style.css';

class ThreeSectionItem extends Component {
    
    constructor(props) {
        super(props);
    }

    _onClick = ()=>{
        const {onSectionClick,section} = this.props;
        onSectionClick(section);
    }

    render() {
        const {section, selectedSection} = this.props;

        return (
            <div className={styleBox.section_item} onMouseDown={this._onClick} style={selectedSection ? {color:'#0ae'} : null}>
                <div className={styleBox.section_img} style={selectedSection ? {border:'1px solid #0ae'} : null}>
                    <img src={section.portrait} width={94} height={68} />
                </div>
                <div className={styleBox.section_name} title={section.name}>{section.name}</div>
            </div>
        )
    }
}

export default ThreeSectionItem;