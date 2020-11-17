<template>
  <div>
    <el-table
      :data="seckList"
      style="width: 100%"
      ref="form"
      row-key="id"
      border
    >
     
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag type="success" plain v-if="item.row.status == 1">启用</el-tag>
          <el-tag type="danger" plain v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <!-- {{item.row.id}} -->
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入接口
import { getSeckDelete } from "../../utils/axios";
// 引入辅助性函数
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList",
    }),
  },
  mounted() {
    this.getSeckList();
  },
  methods: {
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
    }),
    // 删除
    del(id) {
      this.$confirm("确定要删除吗 ! ! ! ? ? ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSeckDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSeckList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-table {
  margin-top: 10px;
}
</style>
