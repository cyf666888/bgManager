// 引入封装好的接口
import { getSeckList} from '../../utils/axios'

// state
const state = {
    seckList: []
}

// getters
const getters = {
    getSeckList(state){
        return state.seckList
    }
}

// mutation
const mutations = {
    REQ_SECKLIST(state,payload){
        state.seckList = payload;
    }
}

// actions
const actions = {
    getSeckListAction({commit}){
        getSeckList()
        .then(res=>{
            // console.log(res,'相应');
            if(res.data.code === 200){
                commit('REQ_SECKLIST',res.data.list)
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