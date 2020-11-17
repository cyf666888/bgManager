<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%"
      ref="form"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="pid" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="180">
          <template slot-scope="item">
              <img :src=" $imgUrl + item.row.img" alt="" class="img">
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"> 
        <template slot-scope="item">
          <el-tag type="success" plain v-if="item.row.status == 1" >启用</el-tag>
          <el-tag type="danger" plain v-else >禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <!-- {{item.row.id}} -->
            <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
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
// 引入辅助性函数
import { mapActions, mapGetters } from "vuex";
// 引入删除接口
import { getCateDelete } from "../../utils/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  mounted() {
    this.getCateList();
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
    }),
    // 删除事件
    del(id) {
      this.$confirm("确定要删除吗 ! ! ! ? ? ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getCateDelete({ id }).then((res) => {
             console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getCateList();
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
.img
  width 100px
  height 50px
</style>
