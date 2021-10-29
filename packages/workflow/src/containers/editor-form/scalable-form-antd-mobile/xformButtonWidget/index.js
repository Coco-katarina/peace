/**
 * xform基础widget => button组件
 */

import React, { Component } from 'react';
import { Button, } from 'antd';
import classnames from 'classnames';

export default class CustomButton extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'button');
    }

    _onClick(showPopView, behavior, onClickCallBack, options) {
    
        if (showPopView && behavior == '弹出控件组') {
            showPopView(options.popCode)
        }
        if(onClickCallBack) {
            onClickCallBack(behavior,options)
        }
    }

    render() {
        let { id, options, disabled, autofocus, value, formContext: { showPopView, popupContainer, onClickCallBack, } } = this.props;
         //判断节点禁用属性
         let formContext = this.props.formContext;
         let disnodes = options.disnodes || null;
         if(formContext.currentNode && Array.isArray(disnodes)){
             if(disnodes.indexOf(formContext.currentNode) > -1){
                 disabled = true;
             }
         }
        const _errorType = options._errorType || '';
        const btnText = value != '' ? value : '按钮'
        const btnBehavior = (options.behavior && options.enumOptions.filter(x => x.value == options.behavior)[0]) ? (options.behavior && options.enumOptions.filter(x => x.value == options.behavior)[0]).label : ''
        const btnType = (btnBehavior == '提交' || btnBehavior == '保存草稿')? 'submit' : btnBehavior == '取消' ? 'reset' : 'button'
        const antdBtnType = (btnType == 'submit' && btnBehavior == '提交') ? 'primary' : 'default'
        
        return (
            <div className={classnames({ 'ant-form-item-control': true, 'xform-custom-widget': true, 'xform-custom-select': true, 'has-error': _errorType !== '' })}>
                <Button
                    // style={{textAlign: 'center',margin: '0 auto'}}
                    className='smart-seal-mobile-btn'
                    id={id}
                    disabled={disabled}
                    autoFocus={autofocus}
                    //getPopupContainer={popupContainer}
                    onClick={() => this._onClick(showPopView, btnBehavior, onClickCallBack, options)}
                    htmlType={btnType}
                    type={antdBtnType}
                >
                    {btnText}
                </Button>
            </div>
        );
    }
}
