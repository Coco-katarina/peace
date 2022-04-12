import React from 'react';
import '../style.less';
import { LayoutContent } from '@peace/components';
import Body from '../components/body';

const ProjectOverview = (props) => {
    return (
        <LayoutContent hasTabs perfectScroll={false}>
            <Body location={props.location}></Body>
        </LayoutContent>
    )
}

export default ProjectOverview;
