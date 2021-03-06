import { createRenderer } from '@vue/runtime-core'
import { Graphics, Text } from 'pixi.js'

const renderer = createRenderer({
    // 基于 type 入参 创建视图
    createElement(type) {
        let ele
        console.log('------type----', type)
        if (type === 'circle') {
            ele = new Graphics()
            ele.beginFill(0xff00ff, 1)
            ele.drawCircle(0, 0, 100)
            ele.endFill()
        }
        return ele
    },
    // 插入视图
    insert(el, parent) {
        parent.addChild(el)
    },
    // 处理属性
    patchProp(el, key, prevValue, nextValue) {
        console.log('---patchProp', el, key, prevValue, nextValue, '---patchProp end--')
        el[key] = nextValue
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
    console.log('-----rootComponent-----', rootComponent)
    return renderer.createApp(rootComponent)
}