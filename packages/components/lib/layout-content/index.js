import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'perfect-scrollbar';


const LayoutContent = (props) => {
    const { clientHeight, children, hasTabs, style, perfectScroll = true } = props;

    const contentHeight = hasTabs ? clientHeight - 56 : clientHeight - 56 - 48;

    const wrapperStyle = style ? { position: 'relative', height: contentHeight, ...style} : { position: 'relative', height: contentHeight};
    let scrollbar= null;

    useEffect(() => {
        if(perfectScroll){
            scrollbar = new PerfectScrollbar('#page-content', { suppressScrollX: true });
        }
    }, [])
    useEffect(() => {
       
        const dom = document.getElementById('page-content');
        if (dom && scrollbar) {
            scrollbar.update();
            dom.scrollTop = 0;
        }
    }, [clientHeight])

    return ( 
        <div id="page-content" className={hasTabs ? "overviewHeaderBorderTop" : "content-wrapper"} style={wrapperStyle} >
             {children}
        </div>
    )
}


function mapStateToProps(state) {
    const { global } = state;
    return {
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
    };
}

export default connect(mapStateToProps)(LayoutContent);
