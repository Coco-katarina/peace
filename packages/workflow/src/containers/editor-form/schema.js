import React, {PureComponent} from 'react';
import { connect } from 'react-redux';

import XFormBuilder from './Editor';
import {util} from './common/util';

class SchemaEditor extends PureComponent {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.namespace = util.getRandomString(8);
    }

    render() {
        return (<XFormBuilder
                {...this.props}
                customUploadRequest={this.props.customUploadRequest || (() => {})}
                env={this.props.env || "dev"}
                namespace={this.props.namespace || this.namespace}
              />
        );
    }
}
function mapStateToProps(state) {
  const { auth, global,} = state;

  return {
      theme: global.theme,
      clientHeight: global.clientHeight,
      clientWidth: global.clientWidth,
      user: auth.user,
  };
}

export default connect(mapStateToProps)(SchemaEditor);


