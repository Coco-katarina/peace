export function getSchema(jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}, originSequence = []) {
    const sequence = [...originSequence];
    const properties = jsonSchema.properties || {};
    Object.keys(properties).forEach((jsonSchemaKey) => {
        if (sequence.indexOf(jsonSchemaKey) < 0) {
            sequence.push(jsonSchemaKey);
        }
    });
    return {
        jsonSchema,
        uiSchema,
        formData,
        bizData,
        sequence
    };
}

export function getFieldsBySchema(schemaData,bpmnNodes) {
    const {sequence = [], jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}} = schemaData;
    const {properties = {}, required = []} = jsonSchema;
    const fields = [];
    const nodes = Array.isArray(bpmnNodes) && bpmnNodes.map(v => v.id) || [];
    sequence.forEach((fieldName) => {
        const field = {};
        if(typeof fieldName === 'object' && fieldName.group){
            const group = fieldName.group;
            const code = fieldName.code;
            const groupSchema = properties[group] || {};
            if(groupSchema.type === 'array') {
                const childProperties = groupSchema.items.properties || {};
                const childRequired = groupSchema.items.required || [];
                const childJsonSchema = childProperties[code] || {};
                field.jsonSchema = {
                    [code]: childJsonSchema
                };
                const childUiSchema = uiSchema[group] && uiSchema[group].items && uiSchema[group].items[code];
                const filterUiSchema = _filterNodesUiSchema(childUiSchema,nodes);
                field.uiSchema = {
                    [code]: filterUiSchema
                };
                field.formData = {
                    [code]: formData[group] &&  formData[group][0][code] ? formData[group][0][code] : ''
                };
                const childBizData = bizData[code];
                field.bizData = {
                    [code]: childBizData
                };
                field.code = code;
                field.label = childJsonSchema.title;
                field.type = childBizData.type;
                field.fieldType = childBizData.fieldType;
                field.required = (childRequired.indexOf(code) >= 0);
                field.hasgroup = group;
                
            }else{
                const childProperties = groupSchema.properties || {};
                const childRequired = groupSchema.required || [];
                const childJsonSchema = childProperties[code] || {};
                field.jsonSchema = {
                    [code]: childJsonSchema
                };
                const childUiSchema = uiSchema[group] && uiSchema[group][code];
                const filterUiSchema = _filterNodesUiSchema(childUiSchema,nodes);
                field.uiSchema = {
                    [code]: filterUiSchema
                };
                field.formData = {
                    [code]: formData[group] && formData[group][code] ? formData[group][code] : ''
                };
                const childBizData = bizData[code];
                field.bizData = {
                    [code]: childBizData
                };
                field.code = code;
                field.label = childJsonSchema.title;
                field.type = childBizData.type;
                field.fieldType = childBizData.fieldType;
                field.required = (childRequired.indexOf(code) >= 0);
                field.hasgroup = group;
            }
           
           // debugger;
        }else{
            const fieldJsonSchema = properties[fieldName] || {};
            field.jsonSchema = {
                [fieldName]: fieldJsonSchema
            };
            const fieldUiSchema = uiSchema[fieldName];
            const filterUiSchema = _filterNodesUiSchema(fieldUiSchema,nodes);
            field.uiSchema = {
                [fieldName]: filterUiSchema
            };
            const fieldFormData = formData[fieldName];
            field.formData = {
                [fieldName]: fieldFormData
            };
            const fieldBizData = bizData[fieldName];
            field.bizData = {
                [fieldName]: fieldBizData
            };
            field.code = fieldName;
            field.label = fieldJsonSchema.title;
            field.type = fieldBizData.type;
            field.fieldType = fieldBizData.fieldType;
            field.required = (required.indexOf(fieldName) >= 0);
            
        }
        fields.push(field);
    });
    //debugger;
    return {
        fields
    };
}

//过滤修改后的节点
function _filterNodesUiSchema (uiSchema, nodes) {
    if(uiSchema.items !== undefined){
        //array 
        if(uiSchema.items['ui:options'] !== undefined ){
            if(uiSchema.items['ui:options'].shownodes !== undefined && Array.isArray(uiSchema.items['ui:options'].shownodes)){
                let filterNodes = uiSchema.items['ui:options'].shownodes.filter(item=> nodes.includes(item));
                uiSchema.items['ui:options'].shownodes = filterNodes 
            }
            if(uiSchema.items['ui:options'].disnodes !== undefined && Array.isArray(uiSchema.items['ui:options'].disnodes)){
                let filterNodes = uiSchema.items['ui:options'].disnodes.filter(item=> nodes.includes(item));
                uiSchema.items['ui:options'].disnodes = filterNodes 
            }
        }
    }else{
        if(uiSchema['ui:options'] !== undefined ){
            if(uiSchema['ui:options'].shownodes !== undefined && Array.isArray(uiSchema['ui:options'].shownodes)){
                let filterNodes = uiSchema['ui:options'].shownodes.filter(item=> nodes.includes(item));
                uiSchema['ui:options'].shownodes = filterNodes 
            }
            if(uiSchema['ui:options'].disnodes !== undefined && Array.isArray(uiSchema['ui:options'].disnodes)){
                let filterNodes = uiSchema['ui:options'].disnodes.filter(item=> nodes.includes(item));
                uiSchema['ui:options'].disnodes = filterNodes 
            }
        }
    }
   
    return uiSchema;
}
export function isSchemaLegal(schema) {
    return !!(schema.sequence && schema.jsonSchema && schema.uiSchema && schema.formData && schema.bizData);
}
