// 引入封装好的接口
import { getSpecsList, getSpecsCount } from '../../utils/axios'

// state
const state = {
    specsList: [],
    size: 4,
    page: 1,
    total: 0
}

// getters
const getters = {
    getSpecsList(state) {
        return state.specsList
    },
    getSpecsCount(state) {
        return state.total
    },
    getSpecsSize(state) {
        return state.size
    },
}

// mutation
const mutations = {
    REQ_SPECSLIST(state, payload) {
        state.specsList = payload;
    },
    REQ_SPECSCOUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload;
    },
}

// actions
const actions = {
    //封装一个获取商品规格列表的行动
    getSpecsListAction(context) {
        getSpecsList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                // console.log(res,'相应');
                if (res.data.code === 200) {
                    // 转化数据
                    let data = res.data.list ? res.data.list : [];
                    context.commit('REQ_SPECSLIST', data);
                    if (context.state.page != 1 && data.length == 0) {
                        // 重新调取修改页码的行动
                        context.dispatch('changePageAction', context.state.page - 1);
                        // 
                        context.dispatch('getSpecsListAction');
                        return
                    }
                }
            })
    },
    //封装一个获取总条数事件
    getCountAction({ commit }) {
        getSpecsCount()
            .then(res => {
                // console.log(res);
                if (res.data.code === 200) {
                    commit('REQ_SPECSCOUNT', res.data.list[0].total)
                }
            })
    },
    // 封装一个page改变的action
    changePageAction(context, payload) {
        context.commit('REQ_PAGE', payload);
        // 重新调取列表
        context.dispatch('getSpecsListAction');
    }

}

//默认导出所有的内容
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}