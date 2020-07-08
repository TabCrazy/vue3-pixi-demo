import { defineComponent, h, ref } from '@vue/runtime-core'
import { getGame } from './Game'
export default defineComponent({
    setup() {
        const mapWidth = 750
        const circleX = ref(100)
        const speed = 15
        let direction = 'Right'
        getGame().ticker.add(() => {
            console.log('0')
            if (circleX.value >= 650) {
                direction = 'Left'
            } else if (circleX.value <= 100) {
                direction = 'Right'
            }
            if (direction === 'Right') {
                circleX.value += speed 
            } else {
                circleX.value -= speed
            }
        })
        return {circleX}
    },
    render(ctx) {
        // 创建虚拟节点
        // const vnode = h("circle", {x:150, y:150}, [
        //     h("circle", {x: 400, y: 200}),
        //     'TabTang'
        // ])
        const vnode = h("circle", {x: ctx.circleX, y:150})
        return vnode
    }
})