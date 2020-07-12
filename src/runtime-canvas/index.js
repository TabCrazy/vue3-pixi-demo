import { createRenderer } from '@vue/runtime-core'
import { Graphics, Text, Container, Sprite, Texture } from 'pixi.js'

const renderer = createRenderer({
    // 基于 type 入参 通过【pixi.js】在canvas创建视图
    createElement(type) {
        let ele
        switch (type) {
            case 'Container':
                ele = new Container()
                break;

            case 'Sprite':
                ele = new Sprite()
                break;
        
            default:
                console.log("Oh, error, undefined type")
                break;
        }
        return ele
    },
    // 处理属性
    patchProp(el, key, prevValue, nextValue) {
        // console.log('---patchProp', el, key, prevValue, nextValue, '---patchProp end--')
        switch (key) {
            case 'texture':
                // 设置图片属性
                el.texture = Texture.from(nextValue)
                break;
            case 'onClick':
                // pixi给元素注册点击事件
                el.on('pointertap', nextValue)
                break;
            default:
                el[key] = nextValue
                break;
        }
    },
    // 插入视图
    insert(el, parent) {
        parent.addChild(el)
    },
    // 设置节点文本
    setElementText(node, text) {
        const canvasTxt = new Text(text)
        node.addChild(canvasTxt)
    },
    // 设置纯文本
    createText(text) {
        return new Text(text)
    },
    // 处理注释
    createComment() {},
    // 获取父节点
    parentNode() {},
    // 获取兄弟节点
    nextSibling() {},
    // 删除节点时调用
    remove(el) {
        const parent = el.parent;
        if (parent) {
            parent.removeChild(el);
        }
    }
})

export function createApp(rootComponent) {
    // console.log('-----rootComponent-----', rootComponent)
    return renderer.createApp(rootComponent)
}