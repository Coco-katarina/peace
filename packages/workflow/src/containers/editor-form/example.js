
import React from 'react';
//import formSchema from './formSchema';
import XFormBuilder from './schema';
const xformBuilderBlock4NameSpace = 'xformBuilderJdsfec';

class Element extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      uiSchema: {},
      jsonSchema: {},
      bizData: {},
      sequence: [],
      formData: {}
    };
  }
  handleSubmit = (formCode, {jsonSchema,uiSchema, formData, bizData, sequence}) => {
    console.log('submit by editor',formCode, jsonSchema, uiSchema, formData, bizData, sequence);
  };
  render() {
   
    return (
        <div className="portal">
            <div className="xform-builder-demos">
              <div className="simple-container">
                <div className="simple-xform-container">
                  <XFormBuilder
                    platformConfigSupport={true}
                    platform="both"
                    systemTemplate="397ef9b6b4a5457695bae9b2bbab26a9"
                    jsonSchema={this.state.jsonSchema}
                    uiSchema={this.state.uiSchema}
                    formData={this.state.formData}
                    bizData={this.state.bizData}
                    sequence={this.state.sequence}
                    onSubmit={this.handleSubmit}
                    //jsonSchema={formSchema.jsonSchema}
                   // uiSchema={formSchema.uiSchema}
                    //formData={formSchema.formData}
                    //bizData={formSchema.bizData}
                    //sequence={formSchema.sequence}
                    namespace={xformBuilderBlock4NameSpace}
                  />
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default Element
