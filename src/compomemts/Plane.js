/*
 * @Author: mikey.tabtang 
 * @Date: 2020-07-12 20:26:51 
 * @Last Modified by: mikey.tabtang
 * @Last Modified time: 2020-07-12 22:24:34
 * @Name 地图
 */
import { defineComponent, h, watch, reactive, toRefs, onUnmounted, onMounted } from '@vue/runtime-core'
import plane from '../../assets/plane.png'
// import { getGame } from '../Game'
export default defineComponent ({
    // porps接收组件传过来的参数
    props:['x', 'y'],
    setup(props, ctx) {
        // 我方飞机发起攻击
        const handlerAttack = (ev) => {
            if (ev.code === 'Space') {
                // console.log('Attack')
                ctx.emit('attack', {x: props.x + 100, y: props.y})
            }
        }
        // 生命周期挂载 
        onMounted(()=> {
            window.addEventListener('keydown', handlerAttack)
        })
        // 生命周期卸载
        onUnmounted(()=> {
            window.removeEventListener('keydown', handlerAttack)
        })
        // console.log('----------props--------', props)
        // watch
        // props 只读的响应式对象
        // 响应式对象分两种
        // 1、 可以修改  2、只读（不可修改）

        // 解决只读的 props（响应式对象丢失） 无法更改的方案一，定义一个可以修改的 reactive 响应式对象
        // const point = reactive({x: props.x, y: props.y})
        // watch 监听 props变化，赋值给 point，改变 point 出发视图更新
        // watch(props, (value) => { 
        //     point.x = value.x
        //     point.y = value.y
        // })
        // return {point}
        // render 通过 ctx.point.x 与 ctx.point.y

        watch(props, (value) => {
            // console.log('----------watch----------', value)
        })
        // props.x 与 props.y 为值类型，响应式丢失
        console.log(props.x)
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
                texture: plane
            })
        ])
    }
})
