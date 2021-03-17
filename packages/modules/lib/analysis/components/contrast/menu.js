import React, { useState, useRef } from 'react';
import { Row, Col, Select, Cascader, Space, Button, Card, message } from 'antd';
import { Func } from '@peace/utils';
import MenuEditor from './menuEditor';
import Style from '../style.css';

const ContrastMenu = (props) => {
    const { structures, structId, factorId, defaultRadioValue, factors, stations,
        onStructChange, onFactorChange, onQuery } = props;
    const [cardVisiable, setCardVisiable] = useState(false);
    const [stationValue, setStationValue] = useState([]);

    const _menuFormRef = useRef(null);
    const form = _menuFormRef.current;
    const { validateFields, resetFields } = form || {};
    const factionItems = [];
    factors && factors.map(s => {
        if (s.checked) {
            factionItems.push({
                value: s.id,
                label: s.name,
                children: s.items.map(k => { return { value: k.id, label: k.name } })
            })
        }
    })

    const handleFactorChange = (value) => {
        resetFields && resetFields(['stationId'])//清空对比条件选中的测点
        onFactorChange(value)
    }
    const handleStructChange = (value) => {
        resetFields && resetFields(['stationId'])//清空对比条件选中的测点
        onStructChange(value)
    }
    const handleQuery = () => {
        validateFields && validateFields().then(values => {
            let timeDateStrings = [];
            let mult = false;
            if (values.stationId.length < 2) {
                //单个测点多个时间段
                values.dynamic.map(n => {
                    if (Array.isArray(n)) {
                        timeDateStrings.push(n.map(nn => nn.format("YYYY/MM/DD HH:mm:ss")))
                    }
                })
            } else {
                //查询多个测点同一时间段的数据
                values.timeDateStrings.map(n => timeDateStrings.push(n.format("YYYY/MM/DD HH:mm:ss")));
                mult = true
            }
            onQuery(timeDateStrings, values.stationId, structId, mult);
            setCardVisiable(false);
        }).catch(errorInfo => {
            console.log(errorInfo)
        }) || message.warning("请完善对比条件");
    }
    return (<Row justify="end"><Space>
        <Select
            value={structId}
            style={{ width: 200 }}
            placeholder="请选择结构物"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => Func.selectFilterOption(input, option)}
            onChange={(value) => handleStructChange(value)}>
            {
                structures ? structures.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
            }
        </Select>
        <Cascader
            style={{ width: 250, textAlign: 'left' }}
            placeholder="请选择监测项"
            value={defaultRadioValue && factorId && [factorId, defaultRadioValue]}
            onChange={(value, selectedOptions) => handleFactorChange(value, selectedOptions)}
            options={factionItems} />
        <Button type="primary" onClick={() => setCardVisiable(!cardVisiable)}>设定对比条件</Button>
    </Space>
        {/* {
            cardVisiable && */}
        <Card
            className={cardVisiable ? Style.contrast_option : Style.close_contrast_option}
            // style={{ position: "absolute", top: 86, right: 46, width: 420, zIndex: 1 }}
            key={'card'}>
            <MenuEditor
                ref={_menuFormRef}
                stations={stations || []}
                stationValue={stationValue}
                onStationChange={(value) => setStationValue(value)}
            />
            <Row>
                <Col offset={4} span={8}>
                    <Button onClick={() => setCardVisiable(false)}>取消</Button>
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={handleQuery}>对比</Button>
                </Col>
            </Row>
        </Card>
        {/* } */}
    </Row >)
}
export default ContrastMenu