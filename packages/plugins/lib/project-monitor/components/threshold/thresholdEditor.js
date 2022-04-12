'use strict';
import React, { forwardRef, useState } from 'react';
import { Form } from '@peace/components';

const ThresholeEditor = forwardRef((props, ref) => {
    const { dataToEdit = {}, isEdit, factors, stations, batchThreshold } = props;
    const [itemIds, setItemIds] = useState(null);

    const sensorOptSrc = [];
    if (stations) {//测点去除列表已设置的测点
        let configuredSensors = [];
        if (batchThreshold) {
            configuredSensors = Object.keys(batchThreshold).reduce((p, key) => {
                let { data } = batchThreshold[key];
                let sensorIds = data.stations.map(m => m.id);
                p = p.concat(sensorIds);
                return p;
            }, []);
        }
        let unconfiguredSensors = stations.filter(f => !configuredSensors.includes(f.id));
        let sensorsToConfig = [];
        if (isEdit) {
            let oldSensors = dataToEdit.stations;
            sensorsToConfig = oldSensors.concat(unconfiguredSensors);
        } else {
            sensorsToConfig = unconfiguredSensors;
        }
        sensorsToConfig.forEach(s => { sensorOptSrc.push({ id: s.id, name: s.name }) });
    }

    //初始化值
    if (isEdit) {
        dataToEdit["items"] = dataToEdit.items.map(m => m.id);
        dataToEdit["stations"] = dataToEdit.stations.map(s => s.id);

    } else {
        dataToEdit["items"] = factors && [factors[0]["items"][0].id] || []
    }

    const handleItems = (value) => {
        setItemIds(value)
    }
    const formItems = [{
        type: 'Select',
        id: 'items',
        label: '测项',
        optionsSrc: factors && factors[0].items.reduce((p, c) => {
            return p = p.concat({ name: c.name, id: c.id })
        }, []) || [],
        rules: [{ required: true, message: "请选择" }],
        itemProps: { mode: "multiple", onChange: handleItems }
    }, {
        type: 'Select',
        id: 'stations',
        label: '测点',
        optionsSrc: sensorOptSrc,
        rules: [{ required: true, message: "请选择" }],
        itemProps: { mode: "multiple" }
    }];
    if (itemIds && itemIds.length) { //每个监测项对应阈值等级配置
        itemIds.forEach(i => {
            formItems.push({
                type: '',
                id: `items-${i}`,
                label: ''
            })
        })

    }

    return (
        <Form
            ref={ref}
            formItems={formItems}
            popupContainerId='threshold-set-form'
            isEdit={isEdit}
            dataToEdit={dataToEdit}
        />
    )
})
export default ThresholeEditor