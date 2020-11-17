// 引入Vue核心库
import Vue from 'vue'
// 引入Vuex核心库
import Vuex from 'vuex'
// 调用Vuex
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import manager from './modules/manager'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'


let state = {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
};

let getters = {
    getUserInfo(state) {
        return state.userInfo
    }
};

let mutations = {
    USER_INFO(state, payload) {
        state.userInfo = payload;
        if (payload) {
            sessionStorage.setItem('userInfo', JSON.stringify(payload));
        } else {
            sessionStorage.removeItem('userInfo');
        }
    }
};

let actions = {
    changeUserInfoAction({ commit },payload) {
        commit('USER_INFO', payload);
    }
};





//导出实例化的仓库
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        menu,
        role,
        manager,
        cate,
        specs,
        goods,
        member,
        banner,
        seck
    }
})