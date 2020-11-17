<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#33FF99"
      router
      unique-opened
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in userInfo.menus"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }} </span>
        </template>
        <el-menu-item
          :index="_item.url"
          v-for="_item in item.children"
          :key="_item.id"
          >{{ _item.title }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      active: "/home",
    };
  },
  mounted() {
    //  console.log(this.$route);
    this.active = this.$route.path;
    // console.log(this.menuList);
    // this.getMenuList();
  },
  computed: {
    ...mapGetters({
      // menuList: "menu/getMenuList",
      userInfo: 'getUserInfo'
    }),
  },
  methods: {
    ...mapActions({
      // getMenuList: "menu/getMenuListAction",
    }),
  },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  min-height: 80vh;
}

</style>
