/*
 * @Description: HoverButton
 * @Author: 彭祥 (Email:245803627@qq.com)
 * @Date: 2020-09-24 10:34
 * @LastEditors: PengXiang
 * @LastEditTime: 2020-09-24 10:34
 */
export class HoverButton {
    /**
     * 初始化函数
     * @param el 按钮元素
     * @param hoverSkinId  悬停时皮肤的ID
     * @param unhoverSkinId 未悬停时皮肤的ID
     */
    constructor(el, hoverSkinId, unhoverSkinId) {

        this.onHoverBtn = this.onHoverBtn.bind(this);
        this.onUnhoverBtn = this.onUnhoverBtn.bind(this);
        this.setSkinState = this.setSkinState.bind(this);

        this.hoverSkinId = hoverSkinId || 'hoverSkin'; //state_2
        this.unhoverSkinId = unhoverSkinId || 'unhoverSkin'; //state_1

        this.init(el);
    }
    init(el) {
        el.style.cursor = 'pointer';
        el.addEventListener('mouseover', this.onHoverBtn);
        el.addEventListener('mouseout',  this.onUnhoverBtn);

        el.addEventListener('touchstart', this.onHoverBtn);
        el.addEventListener('touchend',  this.onUnhoverBtn);

        this.btnAry = [];
        const elAry = [].slice.call(el.children);
        this.btnAry = elAry.filter((item)=>{
            return item.id.indexOf('Skin') !== -1 ;
        })

        this.setSkinState(this.unhoverSkinId);
    }

    onHoverBtn(event) {
        const target = event.currentTarget;
        this.setSkinState(this.hoverSkinId);
    };
    onUnhoverBtn(event) {
        this.setSkinState(this.unhoverSkinId);
    };

    setSkinState(nId) {
        this.btnAry.forEach((item)=>{
            const itemId = item.id.substr(0, item.id.lastIndexOf('__'));
            if(itemId === nId) {
                item.style.display = 'block';
            }else{
                item.style.display = 'none';
            }
        })
    };
}
