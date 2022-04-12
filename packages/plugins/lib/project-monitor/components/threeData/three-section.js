import React, { Component } from 'react';
import ThreeSectionList from './section-list';
import styleBox from '../../style.css';

class ThreeSection extends Component {
    // static propTypes = {
    //     threeSection: PropTypes.array.isRequired,
    //     onSectionClick: PropTypes.func.isRequired,
    // }
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }
    switchSection = () => {
        const { isShow } = this.state;
        this.setState({ isShow: !isShow });
    }
    _onSectionClick = (section) => {
        const { onSectionClick } = this.props;
        onSectionClick(section);
    };

    render() {
        const { threeSection } = this.props;
        return (
            <div>
                {threeSection.length ?
                    <div>
                        <div className={styleBox.main_section} onClick={this.switchSection}>
                            <img src={threeSection[0].portrait} width={90} height={90} />
                            <p className={styleBox.more_sections}>更多</p>
                        </div>
                        <ThreeSectionList sections={threeSection} visible={this.state.isShow} onSectionClick={this._onSectionClick} />
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default ThreeSection;