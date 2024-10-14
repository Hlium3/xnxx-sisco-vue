<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="clientId">
        <el-input
          v-model="queryParams.clientId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="isUse">
        <el-input
          v-model="queryParams.isUse"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="finishTime">
        <el-date-picker clearable
          v-model="queryParams.finishTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="${comment}" prop="startTime">
        <el-date-picker clearable
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="${comment}" prop="acceptance">
        <el-date-picker clearable
          v-model="queryParams.acceptance"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="质保期" prop="warrantyPeriod">
        <el-date-picker clearable
          v-model="queryParams.warrantyPeriod"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择质保期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="附件" prop="attachmentPath">
        <el-input
          v-model="queryParams.attachmentPath"
          placeholder="请输入附件"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="附件名称" prop="attachmentName">
        <el-input
          v-model="queryParams.attachmentName"
          placeholder="请输入附件名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已回款" prop="alreadyPayBack">
        <el-input
          v-model="queryParams.alreadyPayBack"
          placeholder="请输入已回款"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未回款" prop="notPayBack">
        <el-input
          v-model="queryParams.notPayBack"
          placeholder="请输入未回款"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="坏账" prop="badDebt">
        <el-input
          v-model="queryParams.badDebt"
          placeholder="请输入坏账"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="评估工期(人日)" prop="planMandays">
        <el-input
          v-model="queryParams.planMandays"
          placeholder="请输入评估工期(人日)"
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
          v-hasPermi="['sisco:project:add']"
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
          v-hasPermi="['sisco:project:edit']"
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
          v-hasPermi="['sisco:project:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sisco:project:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="projectList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="projectId" />
      <el-table-column label="${comment}" align="center" prop="clientId" />
      <el-table-column label="${comment}" align="center" prop="projectName" />
      <el-table-column label="${comment}" align="center" prop="isUse" />
      <el-table-column label="${comment}" align="center" prop="finishTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.finishTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="${comment}" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="${comment}" align="center" prop="projectLog" />
      <el-table-column label="${comment}" align="center" prop="acceptance" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.acceptance, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="质保期" align="center" prop="warrantyPeriod" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.warrantyPeriod, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件" align="center" prop="attachmentPath" />
      <el-table-column label="附件名称" align="center" prop="attachmentName" />
      <el-table-column label="项目状态" align="center" prop="projectStatus" />
      <el-table-column label="已回款" align="center" prop="alreadyPayBack" />
      <el-table-column label="未回款" align="center" prop="notPayBack" />
      <el-table-column label="坏账" align="center" prop="badDebt" />
      <el-table-column label="评估工期(人日)" align="center" prop="planMandays" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sisco:project:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sisco:project:remove']"
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

    <!-- 添加或修改项目管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="clientId">
          <el-input v-model="form.clientId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="isUse">
          <el-input v-model="form.isUse" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="finishTime">
          <el-date-picker clearable
            v-model="form.finishTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="projectLog">
          <el-input v-model="form.projectLog" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="acceptance">
          <el-date-picker clearable
            v-model="form.acceptance"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="质保期" prop="warrantyPeriod">
          <el-date-picker clearable
            v-model="form.warrantyPeriod"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择质保期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件" prop="attachmentPath">
          <el-input v-model="form.attachmentPath" placeholder="请输入附件" />
        </el-form-item>
        <el-form-item label="附件名称" prop="attachmentName">
          <el-input v-model="form.attachmentName" placeholder="请输入附件名称" />
        </el-form-item>
        <el-form-item label="已回款" prop="alreadyPayBack">
          <el-input v-model="form.alreadyPayBack" placeholder="请输入已回款" />
        </el-form-item>
        <el-form-item label="未回款" prop="notPayBack">
          <el-input v-model="form.notPayBack" placeholder="请输入未回款" />
        </el-form-item>
        <el-form-item label="坏账" prop="badDebt">
          <el-input v-model="form.badDebt" placeholder="请输入坏账" />
        </el-form-item>
        <el-form-item label="评估工期(人日)" prop="planMandays">
          <el-input v-model="form.planMandays" placeholder="请输入评估工期(人日)" />
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
import { listProject, getProject, delProject, addProject, updateProject } from "@/api/sisco/project";

export default {
  name: "Project",
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
      // 项目管理表格数据
      projectList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clientId: null,
        projectName: null,
        isUse: null,
        finishTime: null,
        startTime: null,
        projectLog: null,
        acceptance: null,
        warrantyPeriod: null,
        attachmentPath: null,
        attachmentName: null,
        projectStatus: null,
        alreadyPayBack: null,
        notPayBack: null,
        badDebt: null,
        planMandays: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询项目管理列表 */
    getList() {
      this.loading = true;
      listProject(this.queryParams).then(response => {
        this.projectList = response.rows;
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
        projectId: null,
        clientId: null,
        projectName: null,
        isUse: null,
        finishTime: null,
        startTime: null,
        projectLog: null,
        acceptance: null,
        warrantyPeriod: null,
        attachmentPath: null,
        attachmentName: null,
        projectStatus: null,
        alreadyPayBack: null,
        notPayBack: null,
        badDebt: null,
        planMandays: null
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
      this.ids = selection.map(item => item.projectId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加项目管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const projectId = row.projectId || this.ids
      getProject(projectId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改项目管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.projectId != null) {
            updateProject(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProject(this.form).then(response => {
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
      const projectIds = row.projectId || this.ids;
      this.$modal.confirm('是否确认删除项目管理编号为"' + projectIds + '"的数据项？').then(function() {
        return delProject(projectIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sisco/project/export', {
        ...this.queryParams
      }, `project_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
