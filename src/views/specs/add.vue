<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          prop="specsname"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(domain, i) in domains"
          :label="'规格属性'"
          :key="domain.key"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="domain.value"
            class="inpW"
            autocomplete="off"
          ></el-input>
          <el-button type="primary" @click="addDomain" v-if="i == 0"
            >新增规格属性</el-button
          >
          <el-button @click.prevent="removeDomain(domain)" v-else
            >删除</el-button
          >
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
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../utils/axios";

export default {
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1, //状态 1正常 2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
      // 增加的输入框
      domains: [
        {
          value: "",
        },
      ],
    };
  },
  props: ["addInfo"],
  computed: {},
  mounted() {},
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getCountAction",
    }),
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    add() {
      //   this.form.attrs = this.form.attrs.join(',');
      //   console.log(this.domains);
      this.form.attrs = this.domains.map((item) => item.value).join(",");

      // 确定验证
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
        //   console.log(this.form);
          //调取添加接口
          getSpecsAdd(this.form).then((res) => {
            // console.log(res, "添加相应");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              //重新获取列表
              this.getSpecsList();
              // 重新获取总数
              this.getSpecsCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },

    reset() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1, //状态 1正常 2禁用
      };
      this.domains = [
        {
          value: "",
        },
      ];
       // 清空验证
       this.$refs['dialog'].resetFields();
    },
    // 获取编辑当前数据
    look(id) {
      getSpecsInfo({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.form.attrs.map((item, idx) => {
            if (idx == 0) {
              this.domains[0].value = item;
            } else {
              this.domains.push({
                value: item,
              });
            }
          });
          //   console.log(this.domains);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑确定，更新数据
    update() {
      this.form.attrs = this.domains.map((item) => item.value).join(",");
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
          // 调取修改接口
          getSpecsEdit(this.form).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 关闭弹窗
              this.getSpecsList(); // 重新获取列表
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 删除表单
    removeDomain(item) {
      var index = this.domains.indexOf(item);
      if (index !== -1) {
        this.domains.splice(index, 1);
      }
    },
    // 增加表单
    addDomain() {
      if (this.domains.length < 6) {
        this.domains.push({
          value: "",
          key: Date.now(),
        });
      } else {
        this.$message.warning("最多添加6个，不能再添加了哟");
      }
    },
  },
};
</script>

<style lang="" scoped>
.inpW {
  width: 70%;
}
</style>
