'use strict';
import React, { forwardRef, useState } from 'react';
import { Form } from '@peace/components';
import { VideoType } from '../../../constants/video';

const IPCEditor = forwardRef((props, ref) => {
    const { setFieldsValue, getFieldValue } = ref && ref.current || {};
    const { dataToEdit = {}, isEdit, nvrs, ipcs, ipcNames, pushServers, factorsWithStations, ipcType } = props;

    const [channelsTotal, setChannelsTotal] = useState(isEdit && ipcType == VideoType.nvr ? nvrs[dataToEdit.nvr].channelsTotal : -1)
    const getStationsBelongToFactors = (factors) => {
        let stations = factors.reduce((p, c) => {
            let factorStations = factorsWithStations[c];
            p = p.concat(factorStations.stations);
            return p;
        }, []);
        return stations;
    };
    const [stations, setStations] = useState(isEdit ? getStationsBelongToFactors(dataToEdit.factors) : [])

    if (!isEdit) {
        dataToEdit["pushServer"] = 1;
        dataToEdit["hasPTZ"] = false;
    } else {
        if (!dataToEdit["longitude"])
            dataToEdit["longitude"] = undefined;
        if (!dataToEdit["latitude"])
            dataToEdit["latitude"] = undefined;
        if (!dataToEdit["hasPTZ"])
            dataToEdit["hasPTZ"] = false

    }
    const renderChannelNoOptions = () => {
        let options = [];
        for (let i = 1; i <= channelsTotal; i++) {
            options.push({ id: i, name: `${i}` });
        }
        return options;
    }

    const handleFactorChange = (values) => {
        let newStations = getStationsBelongToFactors(values);
        setStations(newStations)
        // 取消监测因素选择时，解决测点显示`${station.id}`的问题
        let stationsSelected = [];
        let stationsSelectable = newStations.map(s => s.id);
        let stationValues = getFieldValue && getFieldValue('stations');
        if (stationValues && stationValues.length) {
            stationsSelected = stationValues.filter(v => stationsSelectable.includes(parseInt(v)));
            setFieldsValue({ 'stations': stationsSelected });
        }
    }

    const channelNoExists = async (value, getFieldValue) => {
        let nvrChannelNoUsed = Object.keys(ipcs).reduce((p, c) => {
            const { channelNo, nvr } = ipcs[c];
            p[nvr.id] = p[nvr.id] || {};
            p[nvr.id].channelNoUsed = p[nvr.id].channelNoUsed || [];
            p[nvr.id].channelNoUsed.push(channelNo);
            return p;
        }, {});

        let nvrId = getFieldValue('nvr');
        let channelNo = parseInt(value);

        let nvrChanged = isEdit ? nvrId != dataToEdit.nvr : undefined;

        let existed = false;
        if (Object.keys(nvrChannelNoUsed).length && nvrChannelNoUsed[nvrId] && nvrChannelNoUsed[nvrId].channelNoUsed) {
            if (isEdit && !nvrChanged) {
                let channelNoUsed = nvrChannelNoUsed[nvrId].channelNoUsed;
                let channels = channelNoUsed.filter(channel => channel != dataToEdit.channelNo);
                existed = channels.includes(channelNo);
            } else {
                existed = nvrChannelNoUsed[nvrId].channelNoUsed.includes(channelNo);
            }
        }
        if (existed) {
            return Promise.reject('该通道号已占用');

        } else {
            return Promise.resolve();
        }
    }
    const handleNVRChange = (value) => {
        setChannelsTotal(nvrs[value].channelsTotal)
    }
    const renderFormItem = () => {
        //不同类型渲染表单项
        const formItems = [{
            type: 'Text',
            id: 'name',
            label: '监控位置',
            rules: [{ required: true, message: '监控位置不能为空', whitespace: true },
            {
                validator: async (rule, value) => {
                    if (value) {
                        let names = ipcNames;
                        if (isEdit) {
                            names = ipcNames.filter(name => name != dataToEdit.name);
                        }
                        if (names.includes(value.trim())) {
                            return Promise.reject('该名称已被占用');
                            
                        }
                    }
                    return Promise.resolve();
                }
            }],
            itemProps: { autoSize: true, maxLength: 50, placeholder: '监控位置' }
        }];
        if (ipcType == VideoType.nvr) {
            formItems.push({
                type: 'Select',
                id: 'nvr',
                label: 'NVR',
                optionsSrc: nvrs && Object.keys(nvrs).map(key => {
                    const { id, name, address } = nvrs[key];
                    return {
                        id: Number(id),
                        name: `${name} (${address.ip}:${address.port})`
                    }
                }) || [],
                itemProps: { allowClear: false, onChange: handleNVRChange },
                rules: [{ required: true, message: 'NVR不能为空' }]
            }, {
                type: 'Select',
                id: 'channelNo',
                label: '通道号',
                optionsSrc: renderChannelNoOptions(),
                containerProps: { dependencies: ['nvr'] },
                itemProps: { allowClear: false },
                rules: [({ getFieldValue }) => ({
                    validator(_, value) { return channelNoExists(value, getFieldValue) }
                }),
                { required: true, message: '通道号不能为空' }]
            }, {
                type: 'Select',
                id: 'factors',
                label: '监测因素',
                optionsSrc: factorsWithStations && Object.keys(factorsWithStations).map(key => {
                    const { id, name } = factorsWithStations[key];
                    return {
                        id: id,
                        name: name
                    }
                }) || [],
                itemProps: { mode: 'multiple', onChange: handleFactorChange }
            }, {
                type: 'Select',
                id: 'stations',
                label: '测点',
                optionsSrc: stations && stations.map(s => {
                    return {
                        id: s.id,
                        name: s.name
                    }
                }),
                itemProps: { mode: 'multiple' }
            }, {
                type: 'Select',
                id: 'pushServer',
                label: '推流服务器',
                rules: [{ required: true, message: '推流服务器不能为空' }],
                optionsSrc: pushServers && Object.keys(pushServers).map(key => {
                    const { id, address } = pushServers[key];
                    return {
                        id: id,
                        name: `${address.ip}:${address.port}`
                    }
                }) || [],
            });
        } else if (ipcType == VideoType.re || ipcType == VideoType.ys) {
            formItems.push({
                type: 'Text',
                id: 'rtmpAddress',
                label: 'rtmp地址',
                rules: [{ required: true, message: 'rtmp地址不能为空', whitespace: true }],
                itemProps: { autoSize: true, maxLength: 255, placeholder: '请输入rtmp地址' }
            }, {
                type: 'Text',
                id: 'hlsAddress',
                label: 'hls地址',
                itemProps: { autoSize: true, maxLength: 255, placeholder: '请输入hls地址' }
            }, {
                type: 'Text',
                id: 'serialNo',
                label: '设备序列号',
                itemProps: { autoSize: true, maxLength: 50, placeholder: '请输入设备序列号' }
            }, {
                type: 'InputNumber',
                id: 'channelNo',
                label: '通道号',
                itemProps: { min: 0, max: 100, placeholder: '请输入通道号' }
            }, {
                type: 'Select',
                id: 'factors',
                label: '监测因素',
                optionsSrc: factorsWithStations && Object.keys(factorsWithStations).map(key => {
                    const { id, name } = factorsWithStations[key];
                    return {
                        id: id,
                        name: name
                    }
                }) || [],
                itemProps: { mode: 'multiple', onChange: handleFactorChange }
            }, {
                type: 'Select',
                id: 'stations',
                label: '测点',
                optionsSrc: stations && stations.map(s => {
                    return {
                        id: s.id,
                        name: s.name
                    }
                }),
                itemProps: { mode: 'multiple' }
            });
        } else if (ipcType == VideoType.p2p) {
            formItems.push({
                type: 'Text',
                id: 'uid',
                label: 'uid',
                rules: [{
                    required: true, message: 'uid不能为空', whitespace: true
                }],
                itemProps: { autoSize: true, maxLength: 50, placeholder: 'uid' }
            }, {
                type: 'Text',
                id: 'userName',
                label: '用户名',
                rules: [{
                    required: true, message: '用户名不能为空', whitespace: true
                }],
                itemProps: { autoSize: true, maxLength: 50, placeholder: '请输入用户名' }
            }, {
                type: 'Text',
                id: 'password',
                label: '密码',
                rules: [{
                    required: true, message: '密码不能为空', whitespace: true
                }],
                itemProps: { autoSize: true, maxLength: 50, placeholder: '请输入密码' }
            }, {
                type: 'Select',
                id: 'factors',
                label: '监测因素',
                optionsSrc: factorsWithStations && Object.keys(factorsWithStations).map(key => {
                    const { id, name } = factorsWithStations[key];
                    return {
                        id: id,
                        name: name
                    }
                }) || [],
                itemProps: { mode: 'multiple', onChange: handleFactorChange }
            }, {
                type: 'Select',
                id: 'stations',
                label: '测点',
                optionsSrc: stations && stations.map(s => {
                    return {
                        id: s.id,
                        name: s.name
                    }
                }),
                itemProps: { mode: 'multiple' }
            }, {
                type: 'Select',
                id: 'pushServer',
                label: '推流服务器',
                rules: [{ required: true, message: '推流服务器不能为空' }],
                optionsSrc: pushServers && Object.keys(pushServers).map(key => {
                    const { id, address } = pushServers[key];
                    return {
                        id: id,
                        name: `${address.ip}:${address.port}`
                    }
                }) || [],
            });
        }

        //最后共同项
        formItems.push({
            type: 'Checkbox',
            id: 'hasPTZ',
            label: '支持云台',
            containerProps: { valuePropName: 'checked' }
        }, {
            type: 'InputNumber',
            id: 'longitude',
            label: '经度',
            itemProps: { min: - 180, max: 180, initialValue: 0, placeholder: "经度支持数字" }
        }, {
            type: 'InputNumber',
            id: 'latitude',
            label: '纬度',
            itemProps: { min: - 90, max: 90, initialValue: 0, placeholder: "纬度支持数字" }
        });

        return formItems;
    }

    return (
        <Form
            ref={ref}
            formItems={renderFormItem()}
            popupContainerId={`${ipcType}-set-form`}
            isEdit={isEdit}
            dataToEdit={dataToEdit}
            formItemLayout={{ labelCol: { span: 7 }, wrapperCol: { span: 12 } }}
        />
    )
})
export default IPCEditor