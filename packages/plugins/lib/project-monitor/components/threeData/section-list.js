import React, { Component } from 'react';
import { Row, Spin,Button } from 'antd';
import ThreeSectionItem from './section-item';
import { CaretLeftOutlined,CaretRightOutlined } from '@ant-design/icons';
import styleBox from'../../style.css';

class ThreeSectionList extends Component {
    // static propTypes = {
    //     sections:PropTypes.array.isRequired,
    //     visible:PropTypes.bool.isRequired,
    //     onSectionClick:PropTypes.func.isRequired
    // };
    constructor(props) {
        super(props);
        this.state = {
            sectionIndex: 0,
            selectedSection: null,
            containerSize: Math.floor((window.innerWidth - window.innerWidth * .04 - 160 - 100) / 100)
        }
    }

    resetContainerSize = () =>{
        let container_left_size = Math.floor((window.innerWidth - window.innerWidth * .04 - 160 - 100) / 100);
        this.setState({containerSize: container_left_size})
    }

    _clickPreBtn = () => {
        const {sectionIndex} = this.state;
        this.setState({sectionIndex: sectionIndex+1})
    }

    _clickNextBtn = () => {
        const {sectionIndex} = this.state;
        this.setState({sectionIndex: sectionIndex-1})
    }

    _onSectionClick = (section)=>{
        const {onSectionClick} = this.props;
        this.setState({selectedSection:section.id})
        onSectionClick(section);
    }

    _renderList = ()=>{
        const {sections} = this.props;
        const {selectedSection} = this.state;
        let sectionsList = [];
        sections.forEach((section,index) => {
            sectionsList.push(
                <ThreeSectionItem
                    key={section.id}
                    section={section}
                    selectedSection={section.id == selectedSection? true: false}
                    onSectionClick={this._onSectionClick}
                />
            )
        })
        return sectionsList;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resetContainerSize)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.visible == false){
            this.setState({sectionIndex : 0})
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.resetContainerSize)
    }

    render() {
        const {sections, visible} = this.props;
        const {sectionIndex, containerSize} = this.state;
        let isShow = visible ? 'block' :'none';
        
        let listWidth = sections.length < containerSize ? sections.length*100+4 : containerSize*100+4;
        let showLeftBtn = sectionIndex < sections.length-containerSize && sections.length > containerSize ? 'block' : 'none';
        let showRightBtn = sectionIndex > 0 && sections.length > containerSize ? 'block' : 'none'; 
        let container_width = sections.length*100;
        let container_left_length = -sectionIndex*100;
        return (
            <div className={styleBox.section_list} style={{display:`${isShow}`, width:`${listWidth}px`}}>
                <div className={styleBox.left_btn} id='leftBtn' style={{display:`${showLeftBtn}`}} onClick={this._clickPreBtn}><CaretLeftOutlined /></div>
                <div className={styleBox.section_container} style={{width:`${container_width}px`, left:`${container_left_length}`}}>{this._renderList()}</div>
                <div className={styleBox.right_btn} id='rightBtn' style={{display:`${showRightBtn}`}} onClick={this._clickNextBtn}><CaretRightOutlined /></div>
            </div>
        )
    }
}

export default ThreeSectionList;