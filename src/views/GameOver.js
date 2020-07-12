/*
 * @Author: mikey.tabtang 
 * @Date: 2020-07-12 17:15:14 
 * @Last Modified by: mikey.tabtang
 * @Last Modified time: 2020-07-12 22:44:56
 * @Name 启动页
 */
import { defineComponent, h } from '@vue/runtime-core'
import gameoverBg from '../../assets/end_page.jpg'
import restartBtn from '../../assets/restartBtn.png'
// template - render
export default defineComponent ({
    setup() {
        
    },
    render(ctx) {

        return h('Container', [
            // 创建开始页面背景图
            h('Sprite', {
                texture: gameoverBg
            }),
            // 创建点击按钮
            h('Sprite', {
                texture: restartBtn,
                x: 228,
                y: 513,
                interactive: true, // pixi 必须开启此属性才能触发点击事件
                onClick(){
                    // console.log('click button')
                    ctx.$emit('changePage', 'GamePage')
                }
            })
        ])
    }
})