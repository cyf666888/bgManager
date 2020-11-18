<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加活动' : '编辑活动'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" ref="dialog" :rules="rules">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth" prop="">
          <div class="block">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="change(false)"
              :disabled='!addInfo.isAdd '
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
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changeTwo(false)"
               :disabled='!addInfo.isAdd '
          >
            <el-option
              v-for="item in cateList2"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择"    :disabled='!addInfo.isAdd '>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
// 引入辅助性函数
import { mapGetters, mapActions } from "vuex";
// 引入接口
import {
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
  getGoodsList,
} from "../../utils/axios";
export default {
  data() {
    return {
      cateList2: [],
      goodsList: [],
      dateValue: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },

      formLabelWidth: "120px",
      //规则验证
      rules: {
        title: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      // 时间选项
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  mounted() {
    // 减少服务器交互
    if (this.cateList.length == 0) {
      this.getCateList();
    }
  },

  props: ["addInfo"],
  methods: {
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
      getCateList: "cate/getCateListAction",
    }),
    // 级别分类关联
    change(n) {
      let index = this.cateList.findIndex((item) => {
        return this.form.first_cateid == item.id;
      });
      //  console.log(index);
      this.cateList2 = this.cateList[index].children;
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    changeTwo(n) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.goodsList = res.data.list;
        }
      });
      if (!n) {
        this.form.goodsid = "";
      }
    },
    // 重置
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.cateList2 = [];
      this.goodsList = [];
      this.dateValue = [];
       // 清空验证
       this.$refs['dialog'].resetFields();
    },
    // 取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 添加
    add() {
      // console.log(this.form);
      //   确定验证
      this.$refs["dialog"].validate((valid) => {
        this.form.begintime = this.dateValue[0];
        this.form.endtime = this.dateValue[1];
        if (valid) {
          getSeckAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSeckList();
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 编辑数据状态显示
    look(id) {
      getSeckInfo({ id }).then((res) => {
        // console.log(this.dateValue);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id; // 为提交做准备
          // console.log(this.form);
          this.dateValue = [this.form.begintime, this.form.endtime];
          // 清空二级三级内容显示
          this.change(true);
          this.changeTwo(true);
        }
      });
    },
    // 编辑提交
    update() {
      // 确定验证
      this.$refs["dialog"].validate((valid) => {
        this.form.begintime = this.dateValue[0];
        this.form.endtime = this.dateValue[1];
        console.log(this.form);
        // console.log(this.$refs.el_tree.getCheckedKeys());
        if (valid) {
          getSeckEdit(this.form)
          .then(res=>{
            console.log(res);
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              this.getSeckList();
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        }
      });
    },
    // 开始时间与结束时间
    // dateRecive(e) {
    //   // console.log(e);
    //   this.form.begintime = e[0];
    //   this.form.endtime = e[1];
    //   console.log(this.dateValue);
    // },
  },
};
</script>

<style lang="" scoped>
</style>
