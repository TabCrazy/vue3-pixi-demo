import { defineComponent, h } from '@vue/runtime-core'
import gameMap from '../../assets/map.jpg'

export default defineComponent ({
    setup() {
        
    },
    render() {
        
        return h('Container', [
            // 创建游戏背景地图
            h('Sprite', {
                texture: gameMap
            }),
            // // 创建点击按钮
            // h('Sprite', {
            //     texture: startBtn,
            //     x: 228,
            //     y: 513,
            //     interactive: true, // pixi 必须开启此属性才能触发点击事件
            //     onClick(){
            //         console.log('click button')
            //     }
            // })
        ])
    }
})