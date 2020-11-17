// 引入封装好的接口
import { getMemberList} from '../../utils/axios'

// state
const state = {
    memberList: []
}

// getters
const getters = {
    getMemberList(state){
        return state.memberList
    }
}

// mutation
const mutations = {
    REQ_MEMBERLIST(state,payload){
        state.memberList = payload;
    }
}

// actions
const actions = {
    getMemberListAction({commit}){
        getMemberList()
        .then(res=>{
            // console.log(res,'相应');
            if(res.data.code === 200){
                commit('REQ_MEMBERLIST',res.data.list)
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