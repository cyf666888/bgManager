// 引入封装好的接口
import { getMenuList} from '../../utils/axios'

// state
const state = {
    menuList: []
}

// getters
const getters = {
    getMenuList(state){
        return state.menuList
    }
}

// mutation
const mutations = {
    REQ_MENULIST(state,payload){
        state.menuList = payload;
    }
}

// actions
const actions = {
    getMenuListAction({commit}){
        getMenuList({
            istree: true
        })
        .then(res=>{
            // console.log(res,'相应');
            if(res.data.code === 200){
                commit('REQ_MENULIST',res.data.list)
            }
        })
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