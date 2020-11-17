<template>
  <div>
    <el-table
      :data="memberList"
      style="width: 100%"
      ref="form"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      
      <el-table-column prop="status" label="状态"> 
        <template slot-scope="item">
          <el-tag type="success" plain v-if="item.row.status == 1" >启用</el-tag>
          <el-tag type="danger" plain v-else >禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.uid)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入辅助性函数
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  mounted() {
    this.getMemberList();
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    
    // 编辑事件
    edit(uid){
      this.$emit('edit',uid)

    }
  },
};
</script>

<style lang="stylus" scoped>
.el-table {
  margin-top: 20px;
}
</style>
