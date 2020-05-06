<template>
  <div>
    <div class="main" v-if="isShow">
      <div class="my-block">
        <div class="sub-title">订单列表</div>
        <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
          <el-form-item label="服务编号">
            <el-input v-model="formData.serviceNo" placeholder="服务编号"></el-input>
          </el-form-item>
          <el-form-item label="服务时间">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formData.serviceStatus">
              <el-option label="未完成" value="0"></el-option>
              <el-option label="已完成" value="1"></el-option>
              <el-option label="已结算" value="2"></el-option>
              <el-option label="争议" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="options">
            <el-button
              @click="formData = {pageNum: 1, pageSize: 10},value1=[],init()"
              size="medium"
            >重 置</el-button>
            <el-button type="primary" size="medium" @click="init(formData)">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="my-block">
        <el-table :data="tableData.records" border>
          <el-table-column type="index" label="序号" width="50" />

          <el-table-column prop="serviceNo" label="服务编号" />
          <el-table-column prop="activityName" label="活动名称" />
          <el-table-column prop="beginTime" label="开始时间" />
          <el-table-column prop="duration" label="时长">
            <template slot-scope="scope">
              {{ scope.row.duration}}小时
            </template>
          </el-table-column>
          <el-table-column prop="value" label="价值" />
          <el-table-column prop="publishName" label="发布方" />
          <el-table-column prop="serviceName" label="服务方" />
          <el-table-column prop="serviceStatus" label="状态">
            <template slot-scope="scope">
              {{ scope.row.serviceStatus === 0 ? "未完成" :
              scope.row.serviceStatus === 1 ? '已完成':
              scope.row.serviceStatus === 2 ? '已结算':
              scope.row.serviceStatus === 3 ? '争议':
              '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="Godetail(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" @pageChange="pageChange" />
      </div>
    </div>
    <div class="detail" v-else>
      <Deatail @Godetail="Godetail" :userInfo="userInfo" />
    </div>
  </div>
</template>

<script>
import pagination from "@com/el-pagination";
import Deatail from "./teamDetail";
import { serviceList } from "@http/order";

export default {
  name: "index",
  data() {
    return {
      isShow: true,
      formData: { pageNum: 1, pageSize: 10 },
      total: 0,
      tableData: {
        records: []
      },
      pageData: {},
      userInfo: {},
      value1: []
    };
  },
  components: {
    pagination,
    Deatail
  },
  methods: {
    Godetail(data) {
      this.userInfo = data;
      this.isShow = !this.isShow;
      this.$router.push({
        name: "orderDetail"
      });
      this.$store.dispatch("baseData/setOrder", data);
      sessionStorage.setItem("OrderData", JSON.stringify(data));
    },
    async init() {
      if (this.value1.length === 0) {
        this.formData.queryBeginTime = "";
        this.formData.queryEndTime = "";
      } else {
        this.formData.queryBeginTime = this.value1[0];
        this.formData.queryEndTime = this.value1[1] + 86400000;
      }
      let res = await serviceList(this.formData);

      let { total, pageNum, pageSize, list } = res.data;
      this.tableData.records = list;
      this.total = total;

      this.tableData.records.forEach(item => {
        item.userStatus === 1
          ? (item.userStatus = true)
          : (item.userStatus = false);
      });
      console.log(this.tableData.records);
    },
    pageChange(item) {
      this.formData.pageNum = item.page_index;
      this.formData.pageSize = item.page_limit;
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
</style>
