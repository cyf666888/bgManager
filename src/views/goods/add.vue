<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="selectCate(false)"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in cateList2"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="goodsname"
          label="商品名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="market_price"
          label="市场价格"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            list-type="picture-card"
            :on-preview="imgPreview"
            :on-remove="imgRemove"
            action="#"
            :auto-upload="false"
            :on-change="imgChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="exceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="selectSpecs(false)"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="specsattr"
          label="商品属性"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="item in specsList2"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品描述">
          <div id="edit"></div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 使用active-color属性与inactive-color属性来设置开关的背景色 -->
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="addInfo.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入富文本编辑器
import E from "wangeditor";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入封装好的接口
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../utils/axios";

export default {
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        specsid: "",
        specsattr: "",
        description: "",
        isnew: 1,
        ishot: 1,
        status: 1, //状态 1正常 2禁用
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请输入商品属性", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", // 预览图片的地址
      dialogVisible: false, // 预览图片的弹框
      imgUrl: "",
      fileList: [], // 图片位置存放处
      cateList2: [],
      specsList2: [],
      edit: null, //定义一个编辑器变量
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getSpecsList",
    }),
  },
  mounted() {
    // 减少服务器访问
    if (this.cateList.length == 0) {
      this.getCateList();
    }
    if (this.specsList.length == 0) {
      this.getSpecsList();
    }
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getSpecsList: "specs/getSpecsListAction",
      getGoodsCount: "goods/getCountAction",
      getGoodsList: "goods/getGoodsListAction",
    }),
    // 创建富文本编辑器
    createEditor() {
      //  实例一个富文本编辑器
      this.edit = new E("#edit");
      // console.log(this.edit);
      this.edit.create();
      //设置内容 设置表单描述信息参数
      this.edit.txt.html(this.form.description);
    },
    // 选择一级触发事件
    selectCate(n) {
      // console.log(e);
     let index = this.cateList.findIndex(item=>this.form.first_cateid==item.id);
     this.cateList2 = this.cateList[index].children;
      // 一级改变时就先清空二级
      if(!n){
        this.form.second_cateid = ''
      }
    },
    // 选择规格触发事件
    selectSpecs(n) {
      // console.log(this.specsList);
      let index = this.specsList.findIndex(item=>this.form.specsid==item.id);
      // console.log(this.specsList[index]);
     this.specsList2 = this.specsList[index].attrs;
      // 一级改变时就先清空二级
      if(!n){
        this.form.specsattr = ''
      }
    },
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
      this.$refs.dialog.resetFields(); // 清除验证
    },
    add() {
      // 确定验证
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
          this.form.img = this.imgUrl;
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.join(",")
            : "";
          // 把编辑器内容赋给商品描述
          this.form.description = this.edit.txt.html();
          // console.log(this.form);
          let file = new FormData();
          for (let key in this.form) {
            file.append(key, this.form[key]);
          }
          // console.log(file);

          // // 调取添加接口
          getGoodsAdd(file).then((res) => {
            console.log(res, "添加相应");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              //重新获取列表
              this.getGoodsList();
              // 重新获取总数
              this.getGoodsCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    //
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1, //状态 1正常 2禁用
      };
      this.fileList = [];
      this.cateList2 = [];
      this.specsList2 = [];
    },
    // 获取编辑当前数据
    look(id) {
      getGoodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res);
          // console.log(res.data.list.specsattr);
          this.form = res.data.list;
          //图片格式化
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
          // 规格属性列表格式化
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          // 让二级内容出现
          this.selectCate(true);
          this.selectSpecs(true);
          // 添加id给编辑上传时用
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑确定，更新数据
    update() {
      this.form.img = this.imgUrl;
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      // 把编辑器内容赋给商品描述
      this.form.description = this.edit.txt.html();
      // console.log(this.form);
      let file = new FormData();
      for (let key in this.form) {
        file.append(key, this.form[key]);
      }
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
          // 调取修改接口
          getGoodsEdit(file).then((res) => {
            console.log(res);
            console.log(this.form);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 关闭弹窗
              this.getGoodsList(); // 重新获取列表
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },

    // 图片移出
    imgRemove(file, fileList) {
      // console.log(file, fileList);
    },
    //  图片预览
    imgPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传时触发的函数
    imgChange(file) {
      // console.log(file);
      this.imgUrl = file.raw;
    },
    // 图片超出上传限制触发的函数
    exceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>

<style lang="" scoped>
.inpW {
  width: 70%;
}
</style>
