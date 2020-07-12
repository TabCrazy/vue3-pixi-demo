import { defineComponent, h, computed, ref } from '@vue/runtime-core'
// import { getGame } from './Game'
import GameStart from './views/GameStart'
import GamePage from './views/GamePage'
import GameOver from './views/GameOver'
export default defineComponent({
    setup() {
        // ref 创建一个响应式对象
        // ref 值类型 Number String
        const currPageName = ref('GameStart')
        // 计算属性，依赖别的属性
        const currPage = computed(() => {
            // 非template视图，使用ref响应式对象需要通过value获取
            if (currPageName.value === 'GameStart') {
                return GameStart
            } else if (currPageName.value === 'GamePage') {
                return GamePage
            } else if (currPageName.value === 'GameOver') {
                return GameOver
            }
        })
        return {
            currPageName,
            currPage
        }
    },
    render(ctx) {
        return h('Container', [h(ctx.currPage, {
            // 子组件$emit事件changePage通过 on + ChangePage, 特别注意首字母大写
            onChangePage(page) {
                // console.log(page)
                // 通过ctx拿到对应的上下文值
                ctx.currPageName = page
            }
        })])
        // return h('Container', [h(GamePage)])
    }
})