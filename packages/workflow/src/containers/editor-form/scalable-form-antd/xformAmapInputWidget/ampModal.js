/**
 * xform基础widget => 地址选择器
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import classnames from 'classnames';

export default class AmpModal extends Component {

    constructor(props) {
        super(props);
        this.map = null;
        this.marker = null;
        this.placeSearch = null;
        this.state = {
            coordinate: null
        };
    }

    componentDidMount() {
        this.loadMap()
    }

    loadMap = () => {
        const that = this;
        let center = [114.331281, 27.725734];
        if (this.state.value) {
            center = [this.state.value[0] + this.state.value[1]]
        }
        let map = new AMap.Map('map', {
            zoom: 10,
            center
        });
        that.map = map;

        let autoOptions = {
            input: "tipinput"
        };
        let auto = new AMap.Autocomplete(autoOptions);
        this.placeSearch = new AMap.PlaceSearch({
            map: map
        });  //构造地点查询类
        AMap.event.addListener(auto, "select", this.select);//注册监听，当选中某条记录时会触发

        map.on('complete', function () {
            // 地图图块加载完成后触发
            that.mapRender = true;
        });
        map.on('click', function (e) {
            that.props.getCoordinate(e.lnglat.getLng() + ',' + e.lnglat.getLat());
            if (that.marker) {
                that.marker.setMap(null);
            }
            that.marker = new AMap.Marker({
                icon: new AMap.Icon({
                    size: new AMap.Size(26, 40),//图标大小  
                    image: "../../../../../../../assets/images/poi-marker-default.png",
                    imageSize: new AMap.Size(26, 40) //图片大小
                }),
                position: [e.lnglat.getLng(), e.lnglat.getLat()],
                offset: new AMap.Pixel(-13, -40)
            });
            that.marker.setMap(map);
            that.placeSearch.render?that.placeSearch.render.markerList.clear():"";
        });
    }

    select = (e) => {
        let that = this;
        this.placeSearch.setCity(e.poi.adcode);
        this.placeSearch.search(e.poi.name);  //关键字查询查询
        this.placeSearch.on('markerClick', function (e) {
            if (that.marker) {
                that.marker.setMap(null);
            }
            that.props.getCoordinate(e.marker.getPosition().lng + ',' + e.marker.getPosition().lat);
        });
    }

    render() {
        const searchStyle = {
            position: 'absolute',
            zIndex: '10',
            backgroundColor: '#ffffff',
            border: '1px solid #76767640',
            padding: '10px',
            boxShadow: ' 0 2px 6px 0 rgba(114, 124, 245, .5)',
            margin: '5px',
        }
        return (
            <div>
                <div id="myPageTop" style={searchStyle}>
                    <label>请输入关键字：</label>
                    <input id="tipinput" />
                </div>
                <div id='map' style={{ height: 600, width: 770 }} ></div>
            </div>
        );
    }
}
