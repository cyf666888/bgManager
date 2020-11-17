<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" ref="dialog" :rules="rules">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色权限"
          :label-width="formLabelWidth"
          prop="menus"
        >
          <el-tree
            :data="menuList"
            default-expand-all
            show-checkbox
            ref="el_tree"
            node-key="id"
            :props="{
              children: 'children',
              label: 'title',
            }"
            check-strictly
          >
          </el-tree>
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
import { getRoleAdd,getRoleInfo ,getRoleEdit} from "../../utils/axios";
export default {
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
      //规则验证
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
    //减少对服务器的交互
    if (this.menuList.length == 0) {
      this.getMenuList();
    }
  },

  props: ["addInfo"],
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getMenuList: "menu/getMenuListAction",
    }),
    // 重置
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      //清空tree结构框
      this.$refs.el_tree.setCheckedKeys([]);
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
      // 确定验证
      this.$refs["dialog"].validate((valid) => {
        // console.log(this.$refs.el_tree.getCheckedKeys());
        if (valid) {
          this.form.menus = this.$refs.el_tree.getCheckedKeys().join(",");
          getRoleAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getRoleList();
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 编辑数据状态显示
    look(id){
      getRoleInfo({id})
      .then(res=>{
        if(res.data.code==200){
          this.form = res.data.list;
          this.$refs.el_tree.setCheckedKeys(res.data.list.menus.split(','));
          this.form.id = id; // 为提交做准备
          // console.log(this.form);
        }
      })
    },
    // 编辑提交
    update() {
        // 确定验证
      this.$refs["dialog"].validate((valid) => {
        // console.log(this.$refs.el_tree.getCheckedKeys());
        if (valid) {
           this.form.menus = this.$refs.el_tree.getCheckedKeys().join(",");
          getRoleEdit(this.form).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getRoleList();
              this.cancel();
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
