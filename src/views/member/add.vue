<template>
  <div>
    <el-dialog
      title=" 编辑会员"
      :visible.sync="isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入封装好的接口
import { getMemberInfo, getMemberEdit } from "../../utils/axios";

export default {
  data() {
    return {
      pwd: "",
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1, //状态1正常2禁用
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号为11位",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isShow"],
  computed: {},
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //
    reset() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1, //状态1正常2禁用
      };
        this.$refs['dialog'].resetFields();
    },
    // 获取编辑当前数据
    look(uid) {
      getMemberInfo({ uid }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          // console.log(this.form); // 当前表单没有id, 赋予一条id, 给确定提交用
          this.form.uid = uid;
          this.pwd = this.form.password;
          // console.log(this.form);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑确定，更新数据
    update() {
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
          this.form.password = this.form.password ? this.form.password : this.pwd;
          // 调取修改接口
          getMemberEdit(this.form).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 关闭弹窗
              this.getMemberList(); // 重新获取列表
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
