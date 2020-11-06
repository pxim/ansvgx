import {EventDispatcher} from "devlibx";

/*
 * @Description: TabButton组件类
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020-09-24 10:28
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-09-24 10:28
 */
export class TabButton {
    constructor(btnAry, paneAry) {
        this.tabBtnAry = btnAry || [];
        // this.tabPaneAry = paneAry || [];
        this.init();
    }
    init() {
        this.tabBtnAry.forEach((item)=>{
            item.addEventListener('mousedown', this.onDownTabBtn.bind(this));
        });
    }
    onDownTabBtn(event) {
        this.setTabSelected(event.currentTarget);
    }

    /**
     * 设置当前选中的元素
     * @param el
     */
    setTabSelected(el) {
        if(!el){el={id:''}}
        this.setTabBtnState(el);
        // this.setTabPaneState(el);
        this.dispatchEvent( { type: 'selected', message: el.id } );
    }
    setTabSelectedById(id) {
        const el = {id: id};
        this.setTabBtnState(el);
        this.dispatchEvent( { type: 'selected', message: id } );
    }
    setTabBtnState(el) {
        this.tabBtnAry.forEach((item)=> {
            if(item.id === el.id) {
                item.children.forEach((item2)=> {
                    if(item2.id.indexOf('state_1') !== -1) {item2.style.display = 'none';}
                    else{item2.style.display = 'block';}
                })
                item.style.pointerEvents = 'none';
            }else {
                item.children.forEach((item2)=> {
                    if(item2.id.indexOf('state_1') !== -1) {item2.style.display = 'block';}
                    else{item2.style.display = 'none';}
                })
                item.style.pointerEvents = 'all';
            }
        });
    }
    // setTabPaneState() {
    //
    // }
}

// 将 EventDispatcher.prototype 与自定义对象 prototype 进行混合
Object.assign( TabButton.prototype, EventDispatcher.prototype );
