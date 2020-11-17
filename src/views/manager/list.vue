<template>
  <div>
    <el-table
      :data="userList"
      style="width: 100%"
      ref="form"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="userCount"
      @current-change="currentPage"
      :page-size="userSize"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入辅助性函数
import { mapActions, mapGetters } from "vuex";
// 引入删除接口
import { getUserDelete } from "../../utils/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userList: "manager/getUserList",
      userCount: "manager/getUserCount",
      userSize: "manager/getUserSize",
    }),
  },
  mounted() {
    this.getUserList();
    this.getUserCount();
  },
  methods: {
    ...mapActions({
      getUserList: "manager/getUserListAction",
      getUserCount: "manager/getCountAction",
      changePage: "manager/changePageAction",
    }),
    // 删除事件
    del(uid) {
      this.$confirm("确定要删除吗 ! ! ! ? ? ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserDelete({ uid }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserList();
              this.getUserCount();
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
    // 编辑事件
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 当前页
    currentPage(e) {
      // console.log(e);
      this.changePage(e);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-table {
  margin-top: 10px;
}

.el-pagination {
  float: right;
  margin-top: 30px;
}
</style>

