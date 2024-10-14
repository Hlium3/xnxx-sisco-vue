<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="cdName">
        <el-input
          v-model="queryParams.cdName"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="cdTime">
        <el-date-picker clearable
          v-model="queryParams.cdTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="${comment}" prop="cdAttachmentName">
        <el-input
          v-model="queryParams.cdAttachmentName"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="cdLabel">
        <el-input
          v-model="queryParams.cdLabel"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['sisco:dynamics:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sisco:dynamics:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['sisco:dynamics:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sisco:dynamics:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dynamicsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="cdId" />
      <el-table-column label="${comment}" align="center" prop="cdName" />
      <el-table-column label="${comment}" align="center" prop="cdTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cdTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="${comment}" align="center" prop="cdContent" />
      <el-table-column label="${comment}" align="center" prop="cdType" />
      <el-table-column label="${comment}" align="center" prop="cdRemake" />
      <el-table-column label="${comment}" align="center" prop="cdAttachmentPath" />
      <el-table-column label="${comment}" align="center" prop="cdAttachmentName" />
      <el-table-column label="${comment}" align="center" prop="cdLabel" />
      <el-table-column label="${comment}" align="center" prop="cdProjectProfile" />
      <el-table-column label="${comment}" align="center" prop="cdOfficialWebsite" />
      <el-table-column label="${comment}" align="center" prop="cdVersionInformation" />
      <el-table-column label="${comment}" align="center" prop="cdChanneliType" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sisco:dynamics:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sisco:dynamics:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改成功案例和资讯动态对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="cdName">
          <el-input v-model="form.cdName" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="cdTime">
          <el-date-picker clearable
            v-model="form.cdTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}">
          <editor v-model="form.cdContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="${comment}" prop="cdRemake">
          <el-input v-model="form.cdRemake" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="cdAttachmentPath">
          <el-input v-model="form.cdAttachmentPath" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="cdAttachmentName">
          <el-input v-model="form.cdAttachmentName" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="cdLabel">
          <el-input v-model="form.cdLabel" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="cdProjectProfile">
          <file-upload v-model="form.cdProjectProfile"/>
        </el-form-item>
        <el-form-item label="${comment}" prop="cdOfficialWebsite">
          <el-input v-model="form.cdOfficialWebsite" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="cdVersionInformation">
          <el-input v-model="form.cdVersionInformation" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDynamics, getDynamics, delDynamics, addDynamics, updateDynamics } from "@/api/sisco/dynamics";

export default {
  name: "Dynamics",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 成功案例和资讯动态表格数据
      dynamicsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cdName: null,
        cdTime: null,
        cdContent: null,
        cdType: null,
        cdRemake: null,
        cdAttachmentPath: null,
        cdAttachmentName: null,
        cdLabel: null,
        cdProjectProfile: null,
        cdOfficialWebsite: null,
        cdVersionInformation: null,
        cdChanneliType: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cdChanneliType: [
          { required: true, message: "$comment不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询成功案例和资讯动态列表 */
    getList() {
      this.loading = true;
      listDynamics(this.queryParams).then(response => {
        this.dynamicsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        cdId: null,
        cdName: null,
        cdTime: null,
        cdContent: null,
        cdType: null,
        cdRemake: null,
        cdAttachmentPath: null,
        cdAttachmentName: null,
        cdLabel: null,
        cdProjectProfile: null,
        cdOfficialWebsite: null,
        cdVersionInformation: null,
        cdChanneliType: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.cdId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加成功案例和资讯动态";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cdId = row.cdId || this.ids
      getDynamics(cdId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改成功案例和资讯动态";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cdId != null) {
            updateDynamics(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDynamics(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const cdIds = row.cdId || this.ids;
      this.$modal.confirm('是否确认删除成功案例和资讯动态编号为"' + cdIds + '"的数据项？').then(function() {
        return delDynamics(cdIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sisco/dynamics/export', {
        ...this.queryParams
      }, `dynamics_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
