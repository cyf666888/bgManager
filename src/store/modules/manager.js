// 引入封装好的接口
import { getUserList, getUserCount } from '../../utils/axios'

// state
const state = {
    userList: [],
    size: 4,
    page: 1,
    total: 0
}

// getters
const getters = {
    getUserList(state) {
        return state.userList
    },
    getUserCount(state) {
        return state.total
    },
    getUserSize(state) {
        return state.size
    },
}

// mutation
const mutations = {
    REQ_USERLIST(state, payload) {
        state.userList = payload;
    },
    REQ_USERCOUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload;
    },
}

// actions
const actions = {
    //封装一个获取管理员列表的行动
    getUserListAction(context) {
        getUserList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                // console.log(res,'相应');
                if (res.data.code === 200) {
                    let data = res.data.list ? res.data.list : [];
                    context.commit('REQ_USERLIST', data);
                    if (context.state.page != 1 && data.length == 0) {
                        context.dispatch('changePageAction', context.state.page - 1);
                        context.dispatch('getUserListAction');
                        return
                    }
                }
            })
    },
    //封装一个获取总条数事件
    getCountAction({ commit }) {
        getUserCount()
            .then(res => {
                // console.log(res);
                if (res.data.code === 200) {
                    commit('REQ_USERCOUNT', res.data.list[0].total)
                }
            })
    },
    // 封装一个page改变的action
    changePageAction(context, payload) {
        context.commit('REQ_PAGE', payload);
        // 重新调取列表
        context.dispatch('getUserListAction');
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