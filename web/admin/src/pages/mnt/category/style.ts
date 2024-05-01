import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-provider';
import { setAlpha, useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProToken extends ProAliasToken {
    componentCls: string;
}

//这里的genEdfStyle 命名规则按照 gen + 模块名称 + Style
const genEdfStyle: GenerateStyle<ProToken> = (token) => {
    return {
        //如何写不同的样式，比如传入 edf-app，同时控制不同的组件的样式，把token.componentCls当作前缀，然后用&-不同的组件名称来表示
        //className={`${className}-table-title ${hashId}`.trim()}
        //className: `${className}-table-search-form ${hashId}`.trim()
        //这样可以一个style.ts同时写多个不同组件的样式，edf-app 这里命名规则按照模块+页面(pages/edf/app)
        [token.componentCls]: {
            '&-table-title': {
                backgroundColor: setAlpha(token.colorTextBase, 0.02),
                borderRadius: token.borderRadius,
                marginLeft: '10px',
                fontSize: '16px',
                fontWeight: 400,
                color: '#0e1114',
                marginBottom: '10px',
                '&::before': {
                    display: 'block',
                    position: 'absolute',
                    top: '11px',//19px => 11px 如果不渲染options就设置为10px
                    left: '0px',
                    content: '" "',
                    height: '12px',
                    borderLeft: '3px solid #0064C8'
                }
            },
            '&-table-search': {
                // border: '1px solid black',
                // background: 'aliceblue !important',
                marginBlockEnd: '10px !important',//去掉查询表单和表头中间的距离 默认值为16px
                //自动生成form表单会写两个div，两个div都会添加这个class，需要加!important来覆盖样式
                //2023-12-07 如果同时给search 和 form 设置样式，防止同一个样式加在2个div上
            },
            '&-table-search-form': {
                padding: '0px !important',//取消查询表单的padding空白区域
                // paddingBottom: '10px !important',
                paddingRight: '15px !important',//这里不能设置的太小，如果太小，点击设置时页面会横向滚动

                '.ant-form-item-label': {
                    // background: '#e2e9e9',

                    //查询表单的每项的label部分
                    //2023-12-08 不在这里设置，在protable的form属性里面设置，formitem 文本居左还是居右
                    // textAlign: 'left'
                }
            },
            '&-table-all': {
                //  background:'red', 
                '.ant-pro-card-body': {
                    //将global 中的样式 STYLE0001 移到这里，注意paddingInlineEnd 取值，太小会造成左右滚动
                    paddingInlineStart: 0,
                    paddingInlineEnd: 0, //将paddingInlineEnd改成0 使右边对齐不留白
                    //  background:'yellow'
                }
            }
        },
    };
};

//传入的prefixCls='ant-edf-title'
export function useStyle(prefixCls: string) {
    return useAntdStyle('', (token) => {
        const proToken: ProToken = {
            ...token,
            componentCls: `.${prefixCls}`,
        };
        return [genEdfStyle(proToken)];
    });
}