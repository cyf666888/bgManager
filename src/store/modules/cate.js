// 引入封装好的接口
import { getCateList} from '../../utils/axios'

// state
const state = {
    cateList: []
}

// getters
const getters = {
    getCateList(state){
        return state.cateList
    }
}

// mutation
const mutations = {
    REQ_CATELIST(state,payload){
        state.cateList = payload;
    }
}

// actions
const actions = {
    getCateListAction({commit}){
        getCateList({
            istree: true
        })
        .then(res=>{
            // console.log(res,'相应');
            if(res.data.code === 200){
                commit('REQ_CATELIST',res.data.list)
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