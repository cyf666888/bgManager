<template>
  <div>
    <el-table
      :data="specsList"
      style="width: 100%"
      ref="form"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="item">
          <el-tag type="info" v-for="_item in item.row.attrs" :key='_item.attrs'>{{_item}} </el-tag>
        </template>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="specsCount"
      @current-change="currentPage"
      :page-size="specsSize"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入辅助性函数
import { mapActions, mapGetters } from "vuex";
// 引入删除接口
import { getSpecsDelete } from "../../utils/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount: "specs/getSpecsCount",
      specsSize: "specs/getSpecsSize",
    }),
  },
  mounted() {
    this.getSpecsList();
    this.getSpecsCount();
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getCountAction",
      changePage: "specs/changePageAction",
    }),
    // 删除事件
    del(id) {
      this.$confirm("确定要删除吗 ! ! ! ? ? ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsDelete({ id }).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecsList();
              this.getSpecsCount();
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
    edit(id) {
      this.$emit("edit", id);
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

