'use strict'

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ShowResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { stationId, results } = this.props;
        let result = results.get(stationId);
        let text = "";
        let textTime = "";
        if (result != undefined && result.result) {
            if (result.result.length != 0) {
                text = result.result[0];
                if (result.result.length == 2) {
                    textTime = result.result[1];
                }
            }
        }
        return (
             <div>
              <div style={{ color: text.indexOf("重新下发") != -1 || text.indexOf("失败") != -1 ? 'red' : "#008B45" }}>{text}</div>
                {
                    textTime != "" ?
                        <div>剩余等待时间:<span style={{ color: 'red' }}>{textTime}</span>秒</div>
                        :null
                }             
            </div>            
        )
    }
}

export default connect()(ShowResult);
