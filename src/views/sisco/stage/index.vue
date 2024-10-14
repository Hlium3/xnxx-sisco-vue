<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="parentTypeId">
        <el-input
          v-model="queryParams.parentTypeId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="typeId">
        <el-input
          v-model="queryParams.typeId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="planTaskTime">
        <el-input
          v-model="queryParams.planTaskTime"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="actualTaskTime">
        <el-input
          v-model="queryParams.actualTaskTime"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="usedTaskTime">
        <el-input
          v-model="queryParams.usedTaskTime"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="schedule">
        <el-input
          v-model="queryParams.schedule"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="delay">
        <el-input
          v-model="queryParams.delay"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间" prop="createDate">
        <el-date-picker clearable
          v-model="queryParams.createDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建人" prop="createUserCode">
        <el-input
          v-model="queryParams.createUserCode"
          placeholder="请输入创建人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最后修改时间" prop="lastModifyDate">
        <el-date-picker clearable
          v-model="queryParams.lastModifyDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择最后修改时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最后修改人" prop="lastModifyUserCode">
        <el-input
          v-model="queryParams.lastModifyUserCode"
          placeholder="请输入最后修改人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="版本" prop="versionId">
        <el-input
          v-model="queryParams.versionId"
          placeholder="请输入版本"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="stageName">
        <el-input
          v-model="queryParams.stageName"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="beginDate">
        <el-date-picker clearable
          v-model="queryParams.beginDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="${comment}" prop="endDate">
        <el-date-picker clearable
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择${comment}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="${comment}" prop="isSort">
        <el-input
          v-model="queryParams.isSort"
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
          v-hasPermi="['sisco:stage:add']"
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
          v-hasPermi="['sisco:stage:edit']"
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
          v-hasPermi="['sisco:stage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sisco:stage:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="stageId" />
      <el-table-column label="${comment}" align="center" prop="projectId" />
      <el-table-column label="${comment}" align="center" prop="parentTypeId" />
      <el-table-column label="${comment}" align="center" prop="typeId" />
      <el-table-column label="${comment}" align="center" prop="planTaskTime" />
      <el-table-column label="${comment}" align="center" prop="actualTaskTime" />
      <el-table-column label="${comment}" align="center" prop="usedTaskTime" />
      <el-table-column label="${comment}" align="center" prop="schedule" />
      <el-table-column label="${comment}" align="center" prop="delay" />
      <el-table-column label="${comment}" align="center" prop="state" />
      <el-table-column label="时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createUserCode" />
      <el-table-column label="最后修改时间" align="center" prop="lastModifyDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastModifyDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后修改人" align="center" prop="lastModifyUserCode" />
      <el-table-column label="版本" align="center" prop="versionId" />
      <el-table-column label="${comment}" align="center" prop="executionContext" />
      <el-table-column label="${comment}" align="center" prop="stageName" />
      <el-table-column label="${comment}" align="center" prop="beginDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="${comment}" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="${comment}" align="center" prop="isSort" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sisco:stage:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sisco:stage:remove']"
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

    <!-- 添加或修改项目阶段管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="parentTypeId">
          <el-input v-model="form.parentTypeId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="planTaskTime">
          <el-input v-model="form.planTaskTime" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="actualTaskTime">
          <el-input v-model="form.actualTaskTime" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="usedTaskTime">
          <el-input v-model="form.usedTaskTime" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="schedule">
          <el-input v-model="form.schedule" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="delay">
          <el-input v-model="form.delay" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="state">
          <el-input v-model="form.state" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="时间" prop="createDate">
          <el-date-picker clearable
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" prop="createUserCode">
          <el-input v-model="form.createUserCode" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="最后修改时间" prop="lastModifyDate">
          <el-date-picker clearable
            v-model="form.lastModifyDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最后修改时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后修改人" prop="lastModifyUserCode">
          <el-input v-model="form.lastModifyUserCode" placeholder="请输入最后修改人" />
        </el-form-item>
        <el-form-item label="版本" prop="versionId">
          <el-input v-model="form.versionId" placeholder="请输入版本" />
        </el-form-item>
        <el-form-item label="${comment}" prop="executionContext">
          <el-input v-model="form.executionContext" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="stageName">
          <el-input v-model="form.stageName" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="beginDate">
          <el-date-picker clearable
            v-model="form.beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="endDate">
          <el-date-picker clearable
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="isSort">
          <el-input v-model="form.isSort" placeholder="请输入${comment}" />
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
import { listStage, getStage, delStage, addStage, updateStage } from "@/api/sisco/stage";

export default {
  name: "Stage",
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
      // 项目阶段管理表格数据
      stageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        projectId: null,
        parentTypeId: null,
        typeId: null,
        planTaskTime: null,
        actualTaskTime: null,
        usedTaskTime: null,
        schedule: null,
        delay: null,
        state: null,
        createDate: null,
        createUserCode: null,
        lastModifyDate: null,
        lastModifyUserCode: null,
        versionId: null,
        executionContext: null,
        stageName: null,
        beginDate: null,
        endDate: null,
        isSort: null
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
    /** 查询项目阶段管理列表 */
    getList() {
      this.loading = true;
      listStage(this.queryParams).then(response => {
        this.stageList = response.rows;
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
        stageId: null,
        projectId: null,
        parentTypeId: null,
        typeId: null,
        planTaskTime: null,
        actualTaskTime: null,
        usedTaskTime: null,
        schedule: null,
        delay: null,
        state: null,
        createDate: null,
        createUserCode: null,
        lastModifyDate: null,
        lastModifyUserCode: null,
        versionId: null,
        executionContext: null,
        stageName: null,
        beginDate: null,
        endDate: null,
        isSort: null
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
      this.ids = selection.map(item => item.stageId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加项目阶段管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const stageId = row.stageId || this.ids
      getStage(stageId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改项目阶段管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.stageId != null) {
            updateStage(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStage(this.form).then(response => {
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
      const stageIds = row.stageId || this.ids;
      this.$modal.confirm('是否确认删除项目阶段管理编号为"' + stageIds + '"的数据项？').then(function() {
        return delStage(stageIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sisco/stage/export', {
        ...this.queryParams
      }, `stage_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
