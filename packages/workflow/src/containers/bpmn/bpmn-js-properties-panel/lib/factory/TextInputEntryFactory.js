'use strict';

var escapeHTML = require('../Utils').escapeHTML;

var domQuery = require('min-dom').query;

var entryFieldDescription = require('./EntryFieldDescription');


var textField = function(options, defaultParameters) {

  // Default action for the button next to the input-field
  var defaultButtonAction = function(element, inputNode) {
    var input = domQuery('input[name="' + options.modelProperty + '"]', inputNode);
    input.value = '';

    return true;
  };

  // default method to determine if the button should be visible
  var defaultButtonShow = function(element, inputNode) {
    var input = domQuery('input[name="' + options.modelProperty + '"]', inputNode);

    return input.value !== '';
  };


  var resource = defaultParameters,
      label = options.label || resource.id,
      dataValueLabel = options.dataValueLabel,
      buttonLabel = (options.buttonLabel || 'X'),
      actionName = (typeof options.buttonAction != 'undefined') ? options.buttonAction.name : 'clear',
      actionMethod = (typeof options.buttonAction != 'undefined') ? options.buttonAction.method : defaultButtonAction,
      showName = (typeof options.buttonShow != 'undefined') ? options.buttonShow.name : 'canClear',
      showMethod = (typeof options.buttonShow != 'undefined') ? options.buttonShow.method : defaultButtonShow,
      canBeDisabled = !!options.disabled && typeof options.disabled === 'function',
      canBeHidden = !!options.hidden && typeof options.hidden === 'function',
      description = options.description;
  var hidden = false;
  // var readonly = false;
 
  
  if(resource.id === 'form-key'){
    hidden = true
  }
  resource.html =
     (hidden ? '<div class="bpp-hide">' : '') +
    '<label for="camunda-' + escapeHTML(resource.id) + '" ' +
      (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
      (canBeHidden ? 'data-show="isHidden" ' : '') +
      (dataValueLabel ? 'data-value="' + escapeHTML(dataValueLabel) + '"' : '') + '>'+ escapeHTML(label) +'</label>' +
    '<div class="bpp-field-wrapper" ' +
      (canBeDisabled ? 'data-disable="isDisabled"' : '') +
      (canBeHidden ? 'data-show="isHidden"' : '') +
      '>' +
      '<input id="camunda-' + escapeHTML(resource.id) + '" type="text" name="' + escapeHTML(options.modelProperty) + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? 'data-show="isHidden"' : '') +
        ' />' +
      '<button class="' + escapeHTML(actionName) + '" data-action="' + escapeHTML(actionName) + '" data-show="' + escapeHTML(showName) + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
        '<span>' + escapeHTML(buttonLabel) + '</span>' +
      '</button>' +
    '</div>'+
    (hidden ? '</div>' : '');
    
    
    // add 2020-06-10  
    if( resource.id == 'assignee' ){  //如果为执行人
      resource.html =
        '<div class="bpp-hide">' +
        '<label  for="camunda-' + resource.id + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
        (canBeHidden ? 'data-show="isHidden" ' : '') +
        (dataValueLabel ? 'data-value="' + dataValueLabel + '"' : '') + '>'+ label +'</label>' +
        '<div class="bpp-field-wrapper" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? 'data-show="isHidden"' : '') +
        '>' +
        '<div class="left-input-disabled">' +
        '<input id="camunda-' + resource.id + '" type="text" name="' + options.modelProperty+'" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? 'data-show="isHidden"' : '') +
        ' />' +
       
        '<button class="' + actionName + '" data-action="' + actionName + '" data-show="' + showName + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
        '<span>' + buttonLabel + '</span>' +
        '</button>' +
        '</div>' +
        '</div>'+
        '</div>';
    } else if(resource.id == 'candidateUsers'){ //如果为候选人
      resource.html =
        '<div class="bpp-hide">' +
        '<label class="bpp-hide" for="camunda-' + resource.id + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
        (canBeHidden ? 'data-show="isHidden" ' : '') +
        (dataValueLabel ? 'data-value="' + dataValueLabel + '"' : '') + '>'+ label +'</label>' +
        '<div class="bpp-field-wrapper bpp-hide" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? 'data-show="isHidden"' : '') +
        '>' +
        '<div class="left-input-disabled">' +
        '<input id="camunda-' + resource.id + '" type="text" name="' + options.modelProperty+'" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? 'data-show="isHidden"' : '') +
        ' />' +
        
        '<button class="' + actionName + '" data-action="' + actionName + '" data-show="' + showName + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
        '<span>' + buttonLabel + '</span>' +
        '</button>' +
        '</div>' + 
        '</div>' + 
        '</div>';
    }else if(resource.id == 'candidateGroups'){ //如果为候选人组
      resource.html =
        '<div class="bpp-hide">' +
        '<label class="bpp-hide" for="camunda-' + resource.id + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled" ' : '') +
        (canBeHidden ? 'data-show="isHidden" ' : '') +
        (dataValueLabel ? 'data-value="' + dataValueLabel + '"' : '') + '>'+ label +'</label>' +
        '<div class="bpp-field-wrapper bpp-hide" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? 'data-show="isHidden"' : '') +
        '>' +
        '<div class="left-input-disabled">' +
        '<input id="camunda-' + resource.id + '" type="text" name="' + options.modelProperty+'" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? 'data-show="isHidden"' : '') +
        ' />' +
        '<button class="' + actionName + '" data-action="' + actionName + '" data-show="' + showName + '" ' +
        (canBeDisabled ? 'data-disable="isDisabled"' : '') +
        (canBeHidden ? ' data-show="isHidden"' : '') + '>' +
        '<span>' + buttonLabel + '</span>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    }
     //审批配置
     if(resource.id == 'assignee'){
      resource.html += '<div class="bpp-row">' +
              '<label for="cam-multiInstance-type">'+ escapeHTML('审批人员配置') + '</label>' +
              '<div class="bpp-field-wrapper">' +
                '<input type="button" class="btn-select"  value="编辑" onclick="openBpmnModal(\'userTask\')"/>' +
              '</div>' +
            '</div>' + 
            '<div class="bpp-row">' +
              '<label for="cam-buttonAuth-type">'+ escapeHTML('抄送人员配置') + '</label>' +
              '<div class="bpp-field-wrapper">' +
                '<input type="button" class="btn-select"  value="编辑" onclick="openBpmnModal(\'noticeUser\')"/>' +
              '</div>' +
            '</div>' +
            '<div class="bpp-row">' +
              '<label for="cam-buttonAuth-type">'+ escapeHTML('提交按钮权限配置') + '</label>' +
              '<div class="bpp-field-wrapper">' +
                '<input type="button" class="btn-select"  value="编辑" onclick="openBpmnModal(\'buttonAuth\')"/>' +
              '</div>' +
            '</div>'
     }
     if(resource.id === 'form-key'){
      resource.html += '<div class="bpp-row">' +
              '<label for="cam-multiInstance-type">'+ escapeHTML('表单权限配置') + '</label>' +
              '<div class="bpp-field-wrapper">' +
                '<input type="button" class="btn-select"  value="编辑" onclick="openBpmnModal(\'formAuth\')"/>' +
              '</div>' +
            '</div>'  
    }
  // add description below text input entry field
  if (description) {
    resource.html += entryFieldDescription(description);
  }

  resource[actionName] = actionMethod;
  resource[showName] = showMethod;

  if (canBeDisabled) {
    resource.isDisabled = function() {
      return options.disabled.apply(resource, arguments);
    };
  }

  if (canBeHidden) {
    resource.isHidden = function() {
      return !options.hidden.apply(resource, arguments);
    };
  }

  resource.cssClasses = ['bpp-textfield'];
  if(resource.id == 'id' || resource.id == 'initiator'){
    resource.cssClasses = ['bpp-hide'];
  }
  
  return resource;
};

module.exports = textField;
