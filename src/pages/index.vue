<template>
  <div>
    <el-container>
      <el-header>
          <h1>这是个大型后台管理项目</h1>
          <div class="right">
            <el-tag type="success" class="tag" >{{getUserInfo.username}} </el-tag>
             <el-button type="primary" plain size='small' @click="logout">退出</el-button>
          </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <aside-nav></aside-nav>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters ,mapActions} from 'vuex'
import asideNav from '../components/asideNav'
export default {
  data() {
    return {};
  },
  components:{
      asideNav
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  methods:{
     ...mapActions(['changeUserInfoAction']),
    logout(){
      this.changeUserInfoAction(null);
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-header
    background-color skyblue
    h1
        text-align center
        font bold 30px/2 '仿宋'
    .right
        position absolute
        right 15px
        top 15px
        .tag
          margin-right 10px
</style>
