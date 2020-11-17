<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%"
      ref="form"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="商品编号" width="80">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格">
      </el-table-column>
       <el-table-column prop="market_price" label="市场价格">
      </el-table-column>
       <el-table-column prop="img" label="图片" width="180">
          <template slot-scope="item">
              <img :src=" $imgUrl + item.row.img" alt="" class="img">
          </template>
      </el-table-column>
        <el-table-column prop="isnew" label="是否新品">
             <template slot-scope="item">
          <el-tag type="success" plain v-if="item.row.isnew == 1">是</el-tag>
          <el-tag type="danger" plain v-else>否</el-tag>
        </template>
      </el-table-column>
        <el-table-column prop="ishot" label="是否热卖">
             <template slot-scope="item">
          <el-tag type="success" plain v-if="item.row.ishot == 1">是</el-tag>
          <el-tag type="danger" plain v-else>否</el-tag>
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
      :total="goodsCount"
      @current-change="currentPage"
      :page-size="goodsSize"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入辅助性函数
import { mapActions, mapGetters } from "vuex";
// 引入删除接口
import { getGoodsDelete } from "../../utils/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount: "goods/getGoodsCount",
      goodsSize: "goods/getGoodsSize",
    }),
  },
  mounted() {
    this.getGoodsList();
    this.getGoodsCount();
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount: "goods/getCountAction",
      changePage: "goods/changePageAction",
    }),
    // 删除事件
    del(id) {
      this.$confirm("确定要删除吗 ! ! ! ? ? ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodsDelete({ id }).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getGoodsList();
              this.getGoodsCount();
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
img{
  width: 100px;
}
</style>

