<template>
  <div>
    <vbread />
    <vlist @edit="edit"></vlist>
    <v-dialog :isShow="isShow" @cancel="cancel" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vbread from "../../components/breadCrumb";
import vlist from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    vbread,
    vlist,
    vDialog,
  },
  methods: {
   
    // 子组件改变父组件数据
    cancel(e) {
      this.isShow = e;
    },
    // list子组件触发父组件的edit事件
    edit(e) {
      this.isShow = true; // 出现弹框
      // console.log(this.$refs.dialog);
      this.$refs.dialog.look(e);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
