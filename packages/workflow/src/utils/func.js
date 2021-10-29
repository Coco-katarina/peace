'use strict';

 export default class Func {
     static isAuthorized(authcode) {
         if (JSON.parse(sessionStorage.getItem('user'))) {
             const { resources } = JSON.parse(sessionStorage.getItem('user'));
             return resources.includes(authcode);
         }else{
             return false;
         }
     }
     static getContentHeight(clientWidth, clientHeight) {
         const breadcrumbsHeight = clientWidth >= 1920 ? 66 : clientHeight * 7.96 / 100;
         const contentHeight = clientWidth >= 1920 ? clientHeight - 150 - breadcrumbsHeight + 20 : clientHeight * 86.11 / 100 - breadcrumbsHeight;
         return contentHeight;
     }
     /**
     * 生成随机len位数的字符串
     * @param len
     */
     static getRandomString(len) {
         len = len || 16;
         var $firstChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';  // 字符串首字符集合
         var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
         var maxPos = $chars.length;
         var pwd = '';
         for (var i = 0; i < len; i++) {
             if (i === 0) {
                 pwd += $firstChars.charAt(Math.floor(Math.random() * $firstChars.length));
             } else {
                 pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
             }
         }
         return pwd;
     }
     static storage = {
         set(key, value) {
             localStorage.setItem(key, JSON.stringify(value));
         },
         get(key) {
             return JSON.parse(localStorage.getItem(key));
         },
         setXml() {
 
         },
         remove(key) {
 
             localStorage.removeItem(key)
         }
     };
     //convert string to xml object
     static String2XML(xmlstring) {
         // for IE
         if (window.ActiveXObject) {
             var xmlobject = new ActiveXObject("Microsoft.XMLDOM");
             xmlobject.async = "false";
             xmlobject.loadXML(xmlstring);
             return xmlobject;
         }
         // for other browsers
         else {
             var parser = new DOMParser();
             var xmlobject = parser.parseFromString(xmlstring, "text/xml");
             return xmlobject;
         }
     }
     //convert xml object to string
     static XML2String(xmlobject) {
         // for IE
         if (window.ActiveXObject) {
             return xmlobject.xml;
         }
         // for other browsers
         else {
             return (new XMLSerializer()).serializeToString(xmlobject);
         }
     }
     static getFieldsByFormSchema(schemaData,bpmnNodes) {
        const {sequence = [], jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}} = schemaData;
        const {properties = {}} = jsonSchema;
        const fields = [];
        //const nodes = Array.isArray(bpmnNodes) && bpmnNodes.map(v => v.id) || [];
        sequence.forEach((fieldName) => {
            let field = {};
            if(typeof fieldName === 'object' && fieldName.group){
                const group = fieldName.group;
                const code = fieldName.code;
                field.code = code;
                field.group = group;
                const groupSchema = properties[group] || {};
                if(groupSchema.type === 'array') {
                    const childProperties = groupSchema.items.properties || {};
                    field.jsonSchema = childProperties[code] || {};
                    field.uiSchema = uiSchema[group] && uiSchema[group].items && uiSchema[group].items[code] || {};
                }else{
                    const childProperties = groupSchema.properties || {};
                    field.jsonSchema = childProperties[code] || {};
                    field.uiSchema = uiSchema[group] && uiSchema[group][code];
                } 
            }else{
                const fieldJsonSchema = properties[fieldName] || {};
                field.jsonSchema = fieldJsonSchema;
                const fieldUiSchema = uiSchema[fieldName];
                field.uiSchema = fieldUiSchema;
                field.code = fieldName;
            }
            fields.push(field);
            //debugger;
        });
        
        return fields;
    }

    static filterUiSchema (uiSchema, bpmnJson, fieldName) {
        let shownodes = ['historyNode'], disnodes = ['historyNode'];
        for (let [k, v] of Object.entries(bpmnJson)) {
            if(v.showCodes && v.showCodes.includes(fieldName)){
                shownodes.push(k);
            }
            if(v.canEditCodes && !v.canEditCodes.includes(fieldName)){
                disnodes.push(k);
            }
        }
        if(uiSchema.items !== undefined){
            //array 
            if(uiSchema.items['ui:options'] !== undefined ){
               uiSchema.items['ui:options'].shownodes = shownodes; 
               uiSchema.items['ui:options'].disnodes = disnodes;
            }else{
                uiSchema.items['ui:options'] = {
                    shownodes: shownodes,
                    disnodes: disnodes
                }
            }
        }else{
            if(uiSchema['ui:options'] !== undefined ){
                uiSchema['ui:options'].shownodes = shownodes; 
                uiSchema['ui:options'].disnodes = disnodes;
            }else{
                uiSchema['ui:options'] = {
                    shownodes: shownodes,
                    disnodes: disnodes
                }
            }
        }
       
        return uiSchema;
    }
    static handleJsonSchemaForm(schemaData,bpmnJson) {
        const {sequence = [], jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}} = schemaData;
        const {properties = {}} = jsonSchema;
        let newUiSchema = {};
        
        //const nodes = Array.isArray(bpmnNodes) && bpmnNodes.map(v => v.id) || [];
        sequence.forEach((fieldName) => {
            if(typeof fieldName === 'object' && fieldName.group){
                const group = fieldName.group;
                const code = fieldName.code;
                
                if(uiSchema[group]){
                    newUiSchema[group] = this.filterUiSchema(uiSchema[group],bpmnJson,group);
                    if(uiSchema[group].items){
                        if(newUiSchema[group].items[code]){
                            newUiSchema[group].items[code] = this.filterUiSchema(newUiSchema[group].items[code],bpmnJson,code);
                        }
                        
                    }else{
                        if(newUiSchema[group][code]){
                            newUiSchema[group][code] = this.filterUiSchema(newUiSchema[group][code],bpmnJson,code);
                        }
                    }
                }
            }else{
                newUiSchema[fieldName] = this.filterUiSchema(uiSchema[fieldName],bpmnJson,fieldName);
               
            }
        });
        //debugger;
        return {
            jsonSchema: jsonSchema,
            uiSchema: newUiSchema,
            formData: formData,
            bizData: bizData,
            sequence: sequence
        };
    }

   
 }
 