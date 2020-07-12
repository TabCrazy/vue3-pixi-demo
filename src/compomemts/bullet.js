/*
 * @Author: mikey.tabtang 
 * @Date: 2020-07-12 20:26:51 
 * @Last Modified by: mikey.tabtang
 * @Last Modified time: 2020-07-12 21:49:31
 * @Name 地图
 */
import { defineComponent, h, watch, reactive, toRefs } from '@vue/runtime-core'
import bullteImg from '../../assets/bunny-self.png'
// import { getGame } from '../Game'
export default defineComponent ({
    // porps接收组件传过来的参数
    props:['x', 'y'],
    setup(props) {


        // 通过toRefs解决响应式丢失的问题
        const {x, y} = toRefs(props)

        return {
            x, y
        }

    },
    render(ctx) {
        
        return h('Container',{ x: ctx.x, y: ctx.y }, [
            // 创建飞机
            h('Sprite', {
                texture: bullteImg
            })
        ])
    }
})
