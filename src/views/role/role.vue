<template>
  <div>
    <vbread/>
     <el-button type="primary" size="small" plain @click="add">添加</el-button>
     <vlist @edit='edit' ></vlist>
     <vadd :addInfo='addInfo' @cancel='cancel' ref='dialog'></vadd>
  </div>
</template>

<script>
// 引入组件
import vbread from "../../components/breadCrumb";
import vlist from './list'
import vadd from './add'

export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
   components:{
      vbread,
      vlist,
      vadd
  },
  methods:{
    add(){
      this.addInfo.isShow=true;
      this.addInfo.isAdd=true;
    },
    cancel(e){
      this.addInfo.isShow=false;
    },
    edit(e){
      this.addInfo.isShow=true;
      this.addInfo.isAdd=false;
      this.$refs.dialog.look(e);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-button 
  margin-top: 30px;

</style>
