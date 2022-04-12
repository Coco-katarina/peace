'use strict'

import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
     
      // 更新 state 使下一次渲染能够显示降级后的 UI
      
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
     
      // 你同样可以将错误日志上报给服务器
      //logErrorToMyService(error, errorInfo);
    }
  
    render() {
      
      const { errorRender } = this.props;
      if (this.state.hasError) {
        
        // 你可以自定义降级后的 UI 并渲染
        return errorRender ? errorRender : <div>页面出错了哦!</div>;
      }
  
      return this.props.children; 
    }
  }
  export default ErrorBoundary;