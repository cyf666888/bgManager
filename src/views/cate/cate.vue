<template>
  <div>
    <vbread />
    <el-button type="primary" size="small" plain @click="add">添加</el-button>
    <vlist @edit="edit"></vlist>
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vbread from "../../components/breadCrumb";
import vlist from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    vbread,
    vlist,
    vDialog,
  },
  methods: {
    // 点击添加按钮，打开弹窗
    add() {
      this.addInfo.isShow = true;
       this.addInfo.isAdd = true;
    },
    // 子组件改变父组件数据
    cancel(e) {
      this.addInfo.isShow = e;
    },
    // list子组件触发父组件的edit事件
    edit(e) {
      this.addInfo.isShow = true; // 出现弹框
      this.addInfo.isAdd = false;  //  是编辑框
      // console.log(this.$refs.dialog);
      this.$refs.dialog.look(e)
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-top: 30px;
}
</style>
