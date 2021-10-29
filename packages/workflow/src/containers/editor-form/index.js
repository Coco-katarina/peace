import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import XFormBuilder from './Editor';
import { util } from './common/util';

import './style.less'
class FormEditor extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      uiSchema: {},
      jsonSchema: {},
      bizData: {},
      sequence: [],
      formData: {}

    };

    this.namespace = props.namespace || util.getRandomString(8);
  }
  componentDidMount() {
    if (this.props.onSetNameSpace) {
      this.props.onSetNameSpace(this.namespace);
    }

  }
  handleSubmit = (formCode, { jsonSchema, uiSchema, formData, bizData, sequence }) => {
    console.log('submit by editor', formCode, jsonSchema, uiSchema, formData, bizData, sequence);
  };
  onCurrentRef = (child) => {
    this.props.onRef(child);
  }
  filterUiSchema = () => {
    const { bpmnNodes, formSchema } = this.props;
    const { jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}, sequence = [] } = formSchema;

    return uiSchema;
  }

  render() {
    const { bpmnNodes, formSchema, contentHeight, businessTypeName, processId, formName } = this.props;

    const { jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}, sequence = [] } = formSchema;
    let newUiSchema = this.filterUiSchema();
    return (
      <div className="portal">
        <div className="xform-builder-demos">
          <div className="simple-container">
            <div className="simple-xform-container">
              <XFormBuilder
                platform="laptop"
                systemTemplate="397ef9b6b4a54576954fgsfg2bab26a9"
                jsonSchema={jsonSchema}
                uiSchema={newUiSchema}
                formData={formData}
                bizData={bizData}
                sequence={sequence}
                onSubmit={this.handleSubmit}
                // {...this.props}
                customUploadRequest={this.props.customUploadRequest || (() => { })}
                env={this.props.env || "dev"}
                namespace={this.namespace}
                //bizDataSupport
                bpmnNodes={bpmnNodes}
                businessTypeName={businessTypeName}
                commonFieldSupport
                systemFieldSupport
                actions={this.props.actions}
                user={this.props.user}
                onCurrentRef={this.onCurrentRef}
                height={contentHeight}
                processId={processId}
                formName={formName}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, global, } = state;

  return {
    actions: global.actions,
    theme: global.theme,
    clientHeight: global.clientHeight,
    clientWidth: global.clientWidth,
    user: auth.user,
  };
}

export default connect(mapStateToProps)(FormEditor);
