// 引入封装好的接口
import { getGoodsList,getGoodsCount} from '../../utils/axios'

// state
const state = {
    goodsList: [],
    size: 4,
    page: 1,
    total: 0
}

// getters
const getters = {
    getGoodsList(state){
        return state.goodsList
    },
    getGoodsCount(state){
        return state.total
    },
    getGoodsSize(state){
        return state.size
    },
}

// mutation
const mutations = {
    REQ_GOODSLIST(state,payload){
        state.goodsList = payload;
    },
    REQ_GOODSCOUNT(state,payload){
        state.total = payload;
    },
    REQ_PAGE(state,payload){
        state.page = payload;
    },
}

// actions
const actions = {
    //封装一个获取商品规格列表的行动
    getGoodsListAction(context){
        getGoodsList({
            size: context.state.size,
            page: context.state.page
        })
        .then(res=>{
            // console.log(res,'相应');
            if(res.data.code === 200){
                let data = res.data.list? res.data.list: [];
                context.commit('REQ_GOODSLIST',data);
                if(context.state.page!=1&&data.length==0){
                    context.dispatch('changePageAction',context.state.page-1);
                    context.dispatch('getGoodsListAction');
                    return
                }
            }
        })
    },
    //封装一个获取总条数事件
    getCountAction({commit}){
        getGoodsCount()
        .then(res=>{
            // console.log(res);
            if(res.data.code === 200){
                commit('REQ_GOODSCOUNT',res.data.list[0].total)
            }
        })
    },
    // 封装一个page改变的action
    changePageAction(context,payload){
        context.commit('REQ_PAGE',payload);
        // 重新调取列表
        context.dispatch('getGoodsListAction');
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