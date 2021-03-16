'use strict'

import { connect } from 'react-redux';
import React from 'react';
import AddForm from "../components/addForm";
import { Card, } from "antd";

const NewApp = (props) => {
    return (
        <div>
            <Card title="添加项目" style={{
                width: 600, margin: "20px auto 0"
            }}>
                <AddForm />
            </Card>
        </div>
    )
}

export default connect()(NewApp);
