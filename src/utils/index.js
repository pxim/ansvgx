/*
 * @Description: SVG 文档操作工具
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2019/11/28 19:45
 * @LastEditors: pengxiang
 * @LastEditTime: 2019/11/28 19:45
 */



//***********************************************svg操作 start*****************************************************//
/**
 * 获取svg里text标签里面的tsapn（Adobe An发布的svg）
 * @param text
 * @returns {SVGTSpanElement | any | Element}
 */
export function getTSpan(text) {
    const span = text.getElementsByTagName('tspan')[0];
    return span;
}

/**
 * 图片按钮悬停over
 * @param event
 */
export function handleImgBtnOver(event) {
    updateImgBtnPath(event.currentTarget, 'over');
}
/**
 * 图片按钮悬停out
 * @param event
 */
export function handleImgBtnOut(event) {
    updateImgBtnPath(event.currentTarget, 'out');
}
export function updateImgBtnStateDown(target) {
    updateImgBtnPath(target, 'over');
}
export function updateImgBtnStateUp(target) {
    updateImgBtnPath(target, 'over');
}

//更新当前触发的按钮的图片样式(svg里的图片)
export function updateImgBtnPath(target, type) {
    const img = target.getElementsByTagName('use')[0];
    const href = img.getAttribute('xlink:href');
    let nowHref = '';

    switch (type) {
        case 'down':
            if(href.indexOf('0001') !== -1){nowHref =  href.replace('0001', '0002')}
            break;
        case 'up' :
            if(href.indexOf('0002') !== -1){nowHref = href.replace('0002', '0001')}
            break;
        case 'over' :
            if(href.indexOf('0001') !== -1){nowHref =  href.replace('0001', '0002')}
            break;
        case 'out' :
            if(href.indexOf('0002') !== -1){nowHref = href.replace('0002', '0001')}
            break;
    }
    if(nowHref !== ''){img.setAttribute('xlink:href', nowHref);}
}

/*
 * 更新tabBtn按钮触发的状态，当前选中，其他的恢复到初始状态（svg里的图片按钮）
 * @param target
 * @param ary
 */
export function updateTabBtnState(target, ary) {
    ary.forEach((item)=>{
        // if(item === target){return false;}
        const img = item.getElementsByTagName('use')[0];
        const href = img.getAttribute('xlink:href');
        if(item === target){
            img.setAttribute('xlink:href', href.replace('0001', '0002'));
        }else{
            img.setAttribute('xlink:href', href.replace('0002', '0001'));
        }
    });
}

/*
 * 更新RadioBox单选框里 按钮 触发的状态（1.当前选中，点击，当前回到初始状态，其他按钮恢复初始状态；2.当前未选中，点击，当前显示选中，其他按钮恢复初始状态）
 * @param target 当前单选按钮
 * @param ary 单选框（包含N个单选按钮）
 */
export function updateRadioBoxState(target, ary) {
    if(target.children['state1'].style.display === 'none'){
        target.children['state1'].style.display = 'block';
        target.children['state2'].style.display = 'none';
    }else{
        target.children['state1'].style.display = 'none';
        target.children['state2'].style.display = 'block';
    }
    ary.forEach((item)=>{
        // if(item === target){return false;}
        // const img = item.getElementsByTagName('use')[0];
        // const href = img.getAttribute('xlink:href');
        if(item !== target){
            // img.setAttribute('xlink:href', href.replace('0002', '0001'));
            item.children['state1'].style.display = 'block';
            item.children['state2'].style.display = 'none';
        }
    });
}

/*
 * 更新RadioBox多选框里 按钮 触发的状态（1.当前选中，点击，当前回到初始状态；2.当前未选中，点击，当前显示选中）
 * @param target
 * @param ary
 */
export function updateCheckBoxState(target, ary) {
    if(target.children['state1'].style.display === 'none'){
        target.children['state1'].style.display = 'block';
        target.children['state2'].style.display = 'none';
    }else{
        target.children['state1'].style.display = 'none';
        target.children['state2'].style.display = 'block';
    }
}

/*
 * 更新svg里use引用的image的href
 * @param svg
 * @param target
 * @param imgSrc
 * @returns {boolean}
 */
export function updateSVGImgRes(svg, target, imgSrc) {
    if(!target || !imgSrc){return false;}
    const imgUse = target.getElementsByTagName('use')[0];
    const href = imgUse.getAttribute('xlink:href');
    const image = svg.getElementById(href);
    image.setAttribute('xlink:href', imgSrc);
}

export function updateSVGImgHref(svg, target, prefixStr, suffixStr) {
    if(!target ){return false;}
    prefixStr = prefixStr ? prefixStr : '0001';
    suffixStr = suffixStr ? suffixStr : '0002';
    const imgUse = target.getElementsByTagName('use')[0];
    const href = imgUse.getAttribute('xlink:href');
    imgUse.setAttribute('xlink:href', href.replace(prefixStr, suffixStr));
}

export function updateSVGMCState(index, ary) {
    const nId = 'state' + index;
    ary.forEach((item) => {
        if(item.id === nId) {
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
}

/*
 * 获得svg里text里面关于文字dom的相关属性
 * @param item
 * @returns {{fontFamily: string, innerHTML: string, top: string, color: string, left: string, width: string, fontSize: string, height: string}}
 */
export function getTxtAttr(item, txtId) {
    const text = item.getElementsByTagName('text')[0];
    const tspan = text.getElementsByTagName('tspan')[0];
    const react = item.getElementsByTagName('rect')[0];
    // const bound = text.getBoundingClientRect();
    // const bound2 = item.getBBox();
    // const bound3 = text.getBBox();
    const t1 = item.getAttribute('transform');
    const t2 = t1.replace('matrix(', '').replace(')', '').replace(/\s*/g,"").split(',');
    const obj = {
        width:react.getAttribute('width') + 'px',
        height:react.getAttribute('height') + 'px',
        left: t2[t2.length-2] + 'px',
        top: t2[t2.length-1] + 'px',
        fontFamily: tspan.getAttribute('font-family'),
        fontSize: tspan.getAttribute('font-size') + 'px',
        color: tspan.getAttribute('fill'),
        innerHTML: tspan.innerHTML,
        id:txtId,
        widthNum:react.getAttribute('width'),
        heightNum:react.getAttribute('height'),
        textAlign: 'left',
    };
    // that.setState({inputTxtAry: ary})
    return obj;
}




//***********************************************svg操作 end*****************************************************//

// 注意：
// 1. an里做svg的话，文本的宽高不要通过ctrl+q拉伸框来设置；要直接新建一个文本框，然后通过属性面板来设置宽高；
