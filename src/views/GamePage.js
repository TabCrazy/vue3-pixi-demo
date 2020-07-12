import { defineComponent, h, reactive, toRefs, onMounted, onUnmounted } from '@vue/runtime-core'
import Map from '../compomemts/Map'
import Plane from '../compomemts/Plane';
import bulletSelf from '../compomemts/bullet';
import EnemyPlane from '../compomemts/EnemyPlane';
import { getGame } from '../Game'
import { hitTestRectangle } from '../utils/index'

export default defineComponent ({
    setup(props, ctx) {
        // 飞机
        const planeInfo = useCreatedPlane()

        // 我方子弹
        const bullets = reactive([])
        // 攻击-打出子弹
        const handlerAttack = (params) => {
            // console.log('xxxx')
            const createBullet = () => {
                return {
                    x: params.x, 
                    y: params.y
                }
            }
            bullets.push(createBullet())
        }
        // 攻击 - 子弹运动
        const bulletSpeed = 5
        getGame().ticker.add(() => {
            // 子弹飞起来
            bullets.forEach(item => {
                item.y -= bulletSpeed
            })
            // 碰撞检测
            enemyPalnes.forEach(enemyPlaneItem => {
                if (hitTestRectangle(enemyPlaneItem, planeInfo)) {
                    console.log('碰了')
                    ctx.emit('changePage', 'GameOver')
                }
            })
        })
        // 敌军
        const enemyPalnes = reactive([
            {x: 10, y:10, width: 308, height: 207}
        ])

        return { planeInfo, bullets, enemyPalnes, handlerAttack }
    },
    render(ctx) {
        // 渲染我方子弹
        const renderBullets = () => {
            return ctx.bullets.map((item) => {
                return h(bulletSelf, {x: item.x, y: item.y})
            })
        }
        // 渲染敌机
        const renderEnemys = () => {
            return ctx.enemyPalnes.map((item) => {
                return h(EnemyPlane, {x: item.x, y: item.y})
            })
        }
        // 
        return h('Container', [
            h(Map),
            h(
                Plane, {
                    x: ctx.planeInfo.x,
                    y: ctx.planeInfo.y,
                    onAttack: ctx.handlerAttack 
                }
            ),
            ...renderBullets(),
            ...renderEnemys()
        ])
    }
})


/**
 * 创建飞机逻辑抽离
 */
const useCreatedPlane = () => {
    // ref 处理值类型， reactive 处理对象类型[相比ref没有value]
    const planeInfo = reactive({
        x: 150,
        y: 500,
        width: 258,
        height: 364
    })
    const { x, y } = useMovePlane(planeInfo.x, planeInfo.y)
    planeInfo.x = x
    planeInfo.y = y
    return planeInfo
}


/**
 * 移动飞机业务逻辑抽离，后续逻辑组织可以灵活【此方法可以抽到任何位置】
 */
const useMovePlane = (initX, initY) => {
    // 让飞机动起来
    const speed = 5
    const point = reactive({
        x: initX,
        y: initY
    })
    const handlerKeyDown = (ev) => {
        // console.log(ev)
        switch(ev.code) {
            case 'ArrowUp':
                point.y -= speed
                break
            case 'ArrowDown':
                point.y += speed
                break
            case 'ArrowLeft':
                point.x -= speed
                break
            case 'ArrowRight':
                point.x += speed
                break
        }
    }
    // 生命周期，挂载完毕
    onMounted(() => {
        // 组件销毁的时候，window上的监听的事件需要remove
        window.addEventListener('keydown', handlerKeyDown)
    }) 
    // 生命周期，卸载
    onUnmounted(() =>{
        window.removeEventListener('keydown', handlerKeyDown)
    }) 
    return toRefs(point)
}