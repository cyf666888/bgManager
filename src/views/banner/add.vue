<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        
        <el-form-item
          label="标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
            :limit='1'
            :on-exceed='exceed'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入封装好的接口
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../utils/axios";
// 引入路由地址
import { indexRouter } from "../../router";
export default {
  data() {
    return {
      dialogImageUrl: "", // 预览图片的地址
      dialogVisible: false, // 预览图片的弹框
      imgUrl: "",
      fileList: [],
      form: {
        title: "",
        img: "",
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
  },
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 添加
    add() {
      // console.log(this.form);
      // 确定验证
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
          //   console.log(this.form);

          let file = new FormData(); // 上传文件必须要用FormData对象格式
          for (let key in this.form) {
            file.append(key, this.form[key]); // append方式添加
          }
          file.append("img", this.imgUrl);
          // console.log(file.get('bannername'));  // get方式获取
          //   调取添加接口
          getBannerAdd(file).then((res) => {
            // console.log(res, "添加相应");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              //重新获取列表
              this.getBannerList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },

    reset() {
      this.form = {
         title: "",
        img: "",
        status: 1, //状态1正常2禁用
      };
      this.fileList=[];
      this.$refs['dialog'].resetFields();
    },
    // 获取编辑当前数据
    look(id) {
      getBannerInfo({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          // console.log(this.form); // 当前表单没有id, 赋予一条id, 给确定提交用
          this.form.id = id;
          //图片格式化
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑确定，更新数据
    update() {
      let file = new FormData()
      for (let key in this.form) {
        file.append(key,this.form[key]);
      }
      this.imgUrl = this.imgUrl ? this.imgUrl: this.form.img;
      file.append('img',this.imgUrl);
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
          // 调取修改接口
          getBannerEdit(file).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 关闭弹窗
              this.getBannerList(); // 重新获取列表
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
    exceed(files,fileList){
       this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  },
};
</script>

<style lang="" scoped>
</style>
