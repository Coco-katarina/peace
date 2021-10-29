"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * xform tag（标签展示编辑类） 测试用例
 */
describe('xform tag widget test', function () {
  var xform, form;
  var INIT_FORM_DATA = {
    nuoke: ['痞', 'freeStyle', '东北'],
    yantan: ['樱木', '温州'],
    tags: ['帅', '歌神', '国际范']
  };
  var BIZ_DATA = {
    tags: {
      fieldType: 'custom',
      canSearch: false
    }
  };
  var formSchema = {
    jsonSchema: {
      description: 'widget测试',
      type: 'object',
      required: ['tags'],
      properties: {
        nuoke: {
          type: 'array',
          title: '标签',
          items: {
            type: 'string',
            "enum": [],
            enumNames: []
          },
          uniqueItems: true
        },
        yantan: {
          type: 'array',
          title: '标签',
          items: {
            type: 'string',
            "enum": [],
            enumNames: []
          },
          uniqueItems: true,
          data: [{
            content: '樱木',
            removable: true
          }, {
            content: '温州',
            removable: true
          }]
        },
        tags: {
          type: 'array',
          title: '标签',
          items: {
            type: 'string',
            "enum": [],
            enumNames: []
          },
          uniqueItems: true,
          data: [{
            content: '帅',
            removable: false
          }, {
            content: '歌神',
            removable: true
          }, {
            content: '国际范',
            removable: true
          }]
        }
      }
    },
    uiSchema: {
      nuoke: {
        'ui:widget': 'tag',
        'ui:options': {
          addTag: false,
          validate: [{
            type: 'empty',
            message: '该字段不能为空'
          }]
        }
      },
      yantan: {
        'ui:widget': 'tag',
        'ui:options': {
          addTag: true
        }
      },
      tags: {
        'ui:widget': 'tag',
        'ui:options': {
          addTag: true,
          validate: [{
            type: 'empty',
            message: '该字段不能为空'
          }],
          _errorType: 'empty'
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
  it('xform tag validate', function () {
    expect(xform.find('.ant-form-explain').first().text()).toBe('');
  });
  it('xform tag when addTag true close tag', function () {
    var item = xform.find('.xform-item').at(0);
    var tag = item.find('Tag').at(0);
    tag.props().afterClose();
    expect(item.find('span.ant-tag-text').at(0).text()).toBe('freeStyle');
  });
  it('xform tag when addTag true close tag', function () {
    var item = xform.find('.xform-item').at(1);
    var tag = item.find('Tag').at(0);
    tag.props().afterClose();
    expect(item.find('span.ant-tag-text').at(0).text()).toBe('温州');
  });
  it('xform tag click button show input', function () {
    var item = xform.find('.xform-item').at(1);
    var buttons = item.find('button');
    expect(item.find('Input').length).toBe(0);
    buttons.at(0).simulate('click');
    expect(item.find('Input').length).toBe(1);
  });
  it('xform tag input value correct', function () {
    var item = xform.find('.xform-item').at(1);
    var buttons = item.find('button');
    expect(item.find('input[type="text"]').length).toBe(0);
    buttons.at(0).simulate('click');
    var input = item.find('input[type="text"]').at(0);
    input.node.value = '消防群红人';
    input.simulate('change', input);
    expect(input.node.value).toBe('消防群红人');
  });
  it('xform tag input value to tag', function () {
    var item = xform.find('.xform-item').at(1);
    var buttons = item.find('button');
    expect(item.find('input[type="text"]').length).toBe(0);
    buttons.at(0).simulate('click');
    var input = item.find('input[type="text"]').at(0);
    input.node.value = '消防群红人';
    input.simulate('change', input);
    var Input = item.find('Input').at(0);
    Input.props().onPressEnter();
    expect(item.find('span.ant-tag-text').at(2).text()).toBe('消防群红人');
  });
});