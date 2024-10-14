<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="项目id" prop="projectId">
        <el-input
          v-model="queryParams.projectId"
          placeholder="请输入项目id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="款项名称(存数据字典的code)" prop="backCode">
        <el-input
          v-model="queryParams.backCode"
          placeholder="请输入款项名称(存数据字典的code)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票金额" prop="invoiceNum">
        <el-input
          v-model="queryParams.invoiceNum"
          placeholder="请输入发票金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票时间" prop="invoiceTime">
        <el-date-picker clearable
          v-model="queryParams.invoiceTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择发票时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回款金额" prop="backNum">
        <el-input
          v-model="queryParams.backNum"
          placeholder="请输入回款金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回款日期" prop="backTime">
        <el-date-picker clearable
          v-model="queryParams.backTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择回款日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="归属" prop="attribution">
        <el-input
          v-model="queryParams.attribution"
          placeholder="请输入归属"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-date-picker clearable
          v-model="queryParams.createDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建时间">
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
          v-hasPermi="['sisco:back:add']"
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
          v-hasPermi="['sisco:back:edit']"
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
          v-hasPermi="['sisco:back:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sisco:back:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="backList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="项目id" align="center" prop="projectId" />
      <el-table-column label="款项名称(存数据字典的code)" align="center" prop="backCode" />
      <el-table-column label="发票金额" align="center" prop="invoiceNum" />
      <el-table-column label="发票时间" align="center" prop="invoiceTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.invoiceTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回款金额" align="center" prop="backNum" />
      <el-table-column label="回款类型" align="center" prop="backType" />
      <el-table-column label="回款日期" align="center" prop="backTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.backTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属" align="center" prop="attribution" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建时间" align="center" prop="createDate" width="180">
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sisco:back:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sisco:back:remove']"
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="项目id" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目id" />
        </el-form-item>
        <el-form-item label="款项名称(存数据字典的code)" prop="backCode">
          <el-input v-model="form.backCode" placeholder="请输入款项名称(存数据字典的code)" />
        </el-form-item>
        <el-form-item label="发票金额" prop="invoiceNum">
          <el-input v-model="form.invoiceNum" placeholder="请输入发票金额" />
        </el-form-item>
        <el-form-item label="发票时间" prop="invoiceTime">
          <el-date-picker clearable
            v-model="form.invoiceTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发票时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="回款金额" prop="backNum">
          <el-input v-model="form.backNum" placeholder="请输入回款金额" />
        </el-form-item>
        <el-form-item label="回款日期" prop="backTime">
          <el-date-picker clearable
            v-model="form.backTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择回款日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="归属" prop="attribution">
          <el-input v-model="form.attribution" placeholder="请输入归属" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker clearable
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBack, getBack, delBack, addBack, updateBack } from "@/api/sisco/back";

export default {
  name: "Back",
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
      // 【请填写功能名称】表格数据
      backList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        projectId: null,
        backCode: null,
        invoiceNum: null,
        invoiceTime: null,
        backNum: null,
        backType: null,
        backTime: null,
        attribution: null,
        createDate: null,
        createUserCode: null,
        lastModifyDate: null,
        lastModifyUserCode: null
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listBack(this.queryParams).then(response => {
        this.backList = response.rows;
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
        id: null,
        projectId: null,
        backCode: null,
        invoiceNum: null,
        invoiceTime: null,
        backNum: null,
        backType: null,
        backTime: null,
        attribution: null,
        remark: null,
        createDate: null,
        createUserCode: null,
        lastModifyDate: null,
        lastModifyUserCode: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBack(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBack(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBack(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项？').then(function() {
        return delBack(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('sisco/back/export', {
        ...this.queryParams
      }, `back_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
