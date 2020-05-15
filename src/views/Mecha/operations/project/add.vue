<template>
  <div>
    <div class="my-block">
      <div class="sub-title">新增物资</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form
            :inline="false"
            :model="formData"
            size="small"
            class="demo-form-inline"
            label-width="100px"
          >
            <el-form-item label="物资名称 : ">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="供应单位：">
              <el-input v-model="formData.provider"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-radio-group v-model="formData.goodsStatus">
                <el-radio label="1">上架</el-radio>
                <el-radio label="0">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="入库数量：">
              <el-input
                v-model="formData.totalStock"
                style="    width: 25%;
    float: left;"
                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              ></el-input>
              <el-input
                v-model="formData.unit"
                style="    width: 25%;
    float: left;margin-left: 10px"
                placeholder="单位"
              ></el-input>
            </el-form-item>
            <el-form-item label="兑换标准：">
              <el-input v-model="formData.exhAmount" style="    width: 25%;
    float: left;" onkeyup="value=value.match(/\d+\.?\d{0,6}/,'')"></el-input>
              <span style="margin-left: 14px;">{{assetsUnitName}}/单位</span>
            </el-form-item>
            <el-form-item label="购买价格：">
              <el-input v-model="formData.buyAmount" style="    width: 25%;
    float: left;" onkeyup="value=value.match(/\d+\.?\d{0,6}/,'')"></el-input>
              <span style="margin-left: 14px;">元/单位</span>
            </el-form-item>
            <el-form-item label="购买回馈：">
              <el-input v-model="formData.refundAmount" style="    width: 25%;
    float: left;" onkeyup="value=value.match(/\d+\.?\d{0,6}/,'')"></el-input>
              <span style="margin-left: 14px;">{{assetsUnitName}}/单位</span>
            </el-form-item>
            <el-form-item label="摘要：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="formData.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="缩略图：" style="margin-right: 10px">
              <Banner @load="load" :limit="limit" :isDetail="true" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-form
        :inline="false"
        :model="formData"
        size="small"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="物品说明 : ">
          <Quill ref="kindeditor" :content="formData.introduction" @input="qutil"></Quill>

        </el-form-item>
      </el-form>
    </div>
    <div class="my-block">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="3">
          <el-button type="warning" @click="save">保存</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="info" @click="back">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Quill from "@com/quill-editor";
import { exhadd } from "@http/exh";
import Banner from "./upload";

export default {
  name: "teamDetail",
  data() {
    return {
      formData: { imageList:[], introduction: "", type: 0 },
      limit: 3,
      assetsUnitName: "",

    };
  },
  components: {
    Quill,
    Banner
  },
  methods: {
    back() {
      this.$store.dispatch("mecha_asset/setProject", 1);
      this.$router.go(-1);
    },
    load(data) {
      console.log(data);
      this.formData.imageList = [];
      if (data){
        data.forEach(item=>{
          this.formData.imageList.push(item.url)
        })
      }
    },
    qutil(data) {
      this.formData.introduction = data;
    },
    async save() {
      if (this.formData.imageList === "") {
        this.$tools.$mes("图片没上传到服务器，无法提交发布", "warning");
        return false;
      }

      let res = await exhadd(this.formData);
      if (res && res.code === 1000) {
        this.$tools.$mes("操作成功", "success");
        this.$emit("init");
        this.back();
      }
    },
    init() {
      this.assetsUnitName = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).assetsUnitName;
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>

</style>
