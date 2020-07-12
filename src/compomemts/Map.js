/*
 * @Author: mikey.tabtang 
 * @Date: 2020-07-12 20:26:51 
 * @Last Modified by: mikey.tabtang
 * @Last Modified time: 2020-07-12 20:51:02
 * @Name 地图
 */
import { defineComponent, h, ref } from '@vue/runtime-core'
import gameMap from '../../assets/map.jpg'
import { getGame } from '../Game'
export default defineComponent ({
    setup() {
        const mapHeght = 1080
        const mapY1 = ref(0)
        const mapY2 = ref(-mapHeght)

        const speed = 5
        getGame().ticker.add(() => {
            // console.log(111)
            mapY1.value += speed
            mapY2.value += speed
            // 地图归位
            if (mapY1.value >= mapHeght) {
                mapY1.value = -mapHeght
            }
            if (mapY2.value >= mapHeght) {
                mapY2.value = -mapHeght
            }
        })

        return {mapY1, mapY2}
    },
    render(ctx) {
        
        return h('Container', [
            // 创建游戏背景地图
            h('Sprite', {
                texture: gameMap,
                y: ctx.mapY1
            }),
            h('Sprite', {
                texture: gameMap,
                y: ctx.mapY2
            })
        ])
    }
})
