// 引入封装好的接口
import { getBannerList} from '../../utils/axios'

// state
const state = {
    bannerList: []
}

// getters
const getters = {
    getBannerList(state){
        return state.bannerList
    }
}

// mutation
const mutations = {
    REQ_BANNERLIST(state,payload){
        state.bannerList = payload;
    }
}

// actions
const actions = {
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            // console.log(res,'相应');
            if(res.data.code === 200){
                commit('REQ_BANNERLIST',res.data.list)
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