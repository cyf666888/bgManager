<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择" @change="select">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
              :class="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :label="item.path"
              :value="item.path"
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
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入封装好的接口
import { getMenuAdd, getMenuInfo, getMenuEdit } from "../../utils/axios";
// 引入路由地址
import { indexRouter } from "../../router";
export default {
  data() {
    return {
      form: {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      iconList: [
        "el-icon-setting",
        " el-icon-s-tools",
        " el-icon-s-goods",
        " el-icon-goods",
        "el-icon-user",
        " el-icon-user-solid",
      ],
      indexRouter,
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    add() {
      // console.log(this.form);

      // 确定验证
      this.$refs["dialog"].validate((valid) => {
        if (valid) {
          //调取添加接口
          getMenuAdd(this.form).then((res) => {
            // console.log(res, "添加相应");
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              //重新获取列表
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    select() {
      // console.log(this.form.pid);
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    reset() {
      this.form = {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
       this.$refs['dialog'].resetFields();
    },
    // 获取编辑当前数据
    look(id) {
      getMenuInfo({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          // console.log(this.form); // 当前表单没有id, 赋予一条id, 给确定提交用
          this.form.id = id;
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
          // 调取修改接口
          getMenuEdit(this.form).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 关闭弹窗
              this.getMenuList(); // 重新获取列表
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
