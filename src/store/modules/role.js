// 引入封装好的接口
import { getRoleList} from '../../utils/axios'

// state
const state = {
    roleList: []
}

// getters
const getters = {
    getRoleList(state){
        return state.roleList
    }
}

// mutation
const mutations = {
    REQ_ROLELIST(state,payload){
        state.roleList = payload;
    }
}

// actions
const actions = {
    getRoleListAction({commit}){
        getRoleList()
        .then(res=>{
            // console.log(res,'相应');
            if(res.data.code === 200){
                commit('REQ_ROLELIST',res.data.list)
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