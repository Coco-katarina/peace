'use strict';
import moment from 'moment';

const TextStyleColor = 'gray';
export const DEFAULT_COLOR = '#FFF';
export const tooltip = {
    trigger: 'axis',
    formatter: function (params) {
        let result = '';
        params.forEach(function (item) {
            if (!result.length)
                result += moment(item.data.value[0]).format("YYYY-MM-DD HH:mm:ss");
            if (item.data && item.data.value && item.data.value.length > 1)
                result += "</br>" + item.marker + item.name + '：' + item.data.value[1];
        })
        return result;
    }
};

export const toolbox = {
    show: true,
    itemSize: 18,
    feature: {
        saveAsImage: {
            type: 'png',
            iconStyle: {
                borderColor: TextStyleColor,
            }
        }
    }

};

export const color = ['#5979FF', '#52CF88', '#FFC36E', '#915FF8', '#EF7676', '#3FB8ED',
    '#EF6798', '#DA93F8', '#71DBD5', '#BEBEBE'];

export const windRoseColors = ['#00FFFF', '#00CBFD', '#9B62F9', '#00C94C', '#9B6495', '#9D00F7', '#0062F9',
    '#00996A', '#0064C7', '#0101C6', '#9D0062', '#FF02F9', '#FF0A16'];

export const legend = {
    left: {
        show: true,
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 50,
        bottom: 20,
        itemHeight: 8,//图例标记的图形高度。图例大小
        textStyle: {
            color: '#a2adc2'
        },
        pageTextStyle: {
            color: '#a2adc2'
        },
        pageIconColor: '#2B384A',//翻页按钮的颜色
        pageIconInactiveColor: '#a2adc2',//翻页到头的颜色
        //文字过长可以使用下面方法截取字符串
        formatter: function (name) {
            if (!name) return '';
            if (name.length > 8) {
                if (name.length > 16) {
                    name = name.slice(0, 8) + `\n` + name.slice(8, 15) + "...";
                } else {
                    name = name.slice(0, 8) + `\n` + name.slice(8);
                }
                return name;
            } else {
                return name
            }
        },
    },
    right: {
        show: true,
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 60,
        bottom: 20,
        itemHeight: 8,//图例标记的图形高度。图例大小
        textStyle: {
            color: '#a2adc2'
        },
        pageTextStyle: {
            color: '#a2adc2'
        },
        pageIconColor: '#2B384A',//翻页按钮的颜色
        pageIconInactiveColor: '#a2adc2',//翻页到头的颜色
        //文字过长可以使用下面方法截取字符串
        formatter: function (name) {
            if (!name) return '';
            if (name.length > 8) {
                if (name.length > 16) {
                    name = name.slice(0, 8) + `\n` + name.slice(8, 15) + "...";
                } else {
                    name = name.slice(0, 8) + `\n` + name.slice(8);
                }
                return name;
            } else {
                return name
            }
        }
    },
    rightNoFormatter: {
        show: true,
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 60,
        bottom: 20,
        itemHeight: 8,//图例标记的图形高度。图例大小
        textStyle: {
            color: '#a2adc2'
        },
        pageTextStyle: {
            color: '#a2adc2'
        },
        pageIconColor: '#2B384A',//翻页按钮的颜色
        pageIconInactiveColor: '#a2adc2'//翻页到头的颜色
    }
}

export const axisLabel = {
    color: TextStyleColor
}

export const axisTick = {
    lineStyle: {
        color: TextStyleColor
    },
}
export const axisLine = {
    lineStyle: {
        color: TextStyleColor
    }
}

export const splitLine = {
    show: true,
    lineStyle: {
        type: 'dotted',
        color: ['#495D75']
    }
}
export const xAxis = {
    time: {
        type: 'time',
        splitLine: {
            show: false
        },
        axisLine: axisLine,
        axisTick: axisTick,
        axisLabel: axisLabel,
    },
    value: {
        type: 'value',
        splitLine: {
            show: false
        },
        axisLine: axisLine,
        axisTick: axisTick,
        axisLabel: axisLabel,
    },
    category: {
        type: 'category',
        splitLine: {
            show: false
        },
        axisLine: axisLine,
        axisTick: axisTick,
        axisLabel: axisLabel,
    }
};
export const yAxis = {
    type: 'value',
    scale: true,
    splitLine: splitLine,
    axisLine: axisLine,
    axisTick: axisTick,
    axisLabel: axisLabel,
};
export const dataZoom = {
    type: 'inside',
    textStyle: {
        color: TextStyleColor
    },
    bottom: 0
};
export const Axis3D = {
    type: 'value',
    nameTextStyle: {
        color: TextStyleColor
    }
}