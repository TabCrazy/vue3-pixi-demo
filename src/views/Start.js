/*
 * @Author: mikey.tabtang 
 * @Date: 2020-07-12 17:15:14 
 * @Last Modified by: mikey.tabtang
 * @Last Modified time: 2020-07-12 18:41:19
 * @Name 启动页
 */
import { defineComponent, h } from '@vue/runtime-core'
import startBg from '../../assets/start_page.jpg'
import startBtn from '../../assets/startBtn.png'
// template - render
export default defineComponent ({
    setup() {
        
    },
    render(ctx) {
        // 显示一直图片 <div><img src="" /></div>
        // Container 等于 pixi里面的 div
        // Sprite 等于 pixi里面的 img
        // texture 等于 pixi里面的 src
        return h('Container', [
            // 创建开始页面背景图
            h('Sprite', {
                texture: startBg
            }),
            // 创建点击按钮
            h('Sprite', {
                texture: startBtn,
                x: 228,
                y: 513,
                interactive: true, // pixi 必须开启此属性才能触发点击事件
                onClick(){
                    console.log('click button')
                    ctx.$emit('changePage', 'GamePage')
                }
            })
        ])
    }
})