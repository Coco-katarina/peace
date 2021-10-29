"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform upload(上传) 测试用例
 */
describe('xform upload widget test', function () {
  var xform, form;
  var INIT_FORM_DATA = {
    uploaderDemo1: [],
    uploaderDemo2: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }, {
      uid: -2,
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }],
    uploader: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }, {
      uid: -2,
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }]
  };
  var BIZ_DATA = {
    uploader: {
      fieldType: 'custom',
      canSearch: false
    }
  };
  var formSchema = {
    jsonSchema: {
      description: 'widget测试',
      type: 'object',
      required: ['uploader'],
      properties: {
        uploaderDemo1: {
          type: 'array',
          maxFileNum: 2,
          title: '上传',
          items: {
            type: 'string',
            format: 'data-url'
          }
        },
        uploaderDemo2: {
          type: 'array',
          maxFileNum: 2,
          title: '上传',
          items: {
            type: 'string',
            format: 'data-url'
          }
        },
        uploader: {
          type: 'array',
          maxFileNum: 2,
          title: '上传',
          items: {
            type: 'string',
            format: 'data-url'
          }
        }
      }
    },
    uiSchema: {
      uploaderDemo1: {
        'ui:options': {
          label: '上传',
          listType: 'picture',
          vertical: true,
          //是否按vertical方式排列上传后的文件列表，默认为true
          validate: [{
            type: 'empty',
            message: '请至少上传一张图片'
          }],
          action: '//jsonplaceholder.typicode.com/posts/'
        }
      },
      uploaderDemo2: {
        'ui:options': {
          label: '上传',
          listType: 'picture',
          vertical: true,
          //是否按vertical方式排列上传后的文件列表，默认为true
          validate: [{
            type: 'empty',
            message: '请至少上传一张图片'
          }],
          uploadType: 'tfs'
        }
      },
      uploader: {
        'ui:options': {
          label: '上传',
          listType: 'picture',
          vertical: true,
          //是否按vertical方式排列上传后的文件列表，默认为true
          validate: [{
            type: 'empty',
            message: '请至少上传一张图片'
          }]
        }
      }
    },
    formData: INIT_FORM_DATA,
    bizData: BIZ_DATA
  };
  beforeEach(function () {
    xform = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_index["default"], {
      jsonSchema: formSchema.jsonSchema,
      uiSchema: formSchema.uiSchema,
      formData: formSchema.formData,
      bizData: formSchema.bizData
    }));
    form = xform.find('form').first();
    form.simulate('submit');
  });
  it('xform renders form label', function () {
    expect(form).toBeDefined();
  });
  it('xform renders item length to be 3', function () {
    expect(xform.find('.xform-item').length).toBe(3);
  });
  it('xform renders input[type=text]', function () {
    var input = xform.find('input[type="text"]');
    expect(input).toBeDefined();
  });
  it('xform tag validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('请至少上传一张图片');
  }); // it('xform multiselect onChange call', ()=> {
  //     let input = xform.find('input[type="text"]').at(1);
  //     input.node.value = 'Change value';
  //     input.simulate('change', input);
  //     expect(input.node.value).toBe('Change value');
  // })
});