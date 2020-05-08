<template>
  <div>
    <div class="my-block">
      <div class="sub-title">推荐</div>
      <el-row :gutter="20">
        <el-col :span="24" class="el-right">
          <el-form
            :inline="false"
            :model="formData"
            label-width="80px"
            size="small"
            class="demo-form-inline"
          >
            <el-form-item label="原标题 : ">
              <div>{{this.formData.oriTitle}}</div>
            </el-form-item>
            <el-form-item label="推荐标题 : ">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="推荐栏目 : ">
              <el-select filterable v-model="formData.columnId">
                <el-option :label="i.name" :value="i.id" v-for="i in typeList" :key="i.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推荐图片 : ">
              <Elupload @load="load" :isDetail="true" />
            </el-form-item>
            <el-form-item label="推荐链接 : " v-if="false">
              <el-input v-model="formData.url" ></el-input>
            </el-form-item>
            <el-form-item label="推荐摘要 : ">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="formData.recAbstract"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="my-block block_bot">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="3">
          <el-button type="warning" @click="save()">保存</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="info" @click="back">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { recommendUp } from "@http/recommend";
import baseUrl from "@/http/baseUrl";
import { mapState } from "vuex";
import { Stidlist } from "@http/inst";
import Elupload from "@com/el-upload";

export default {
  name: "teamDetail",
  data() {
    return {
      imgs: [],
      fileList: [],
      formData: {
        image: ""
      },
      baseUrl: baseUrl,
      imageUrl: "",
      dialogImageUrl: "",
      typeList: [],
      headers: {},
      activeName: "0",
      form: {
        picList: []
      }
    };
  },
  computed: {
    ...mapState({
      recomObj: state => state.recommend.recomObj
    })
  },
  components: {
    Elupload
  },
  methods: {
    load(data) {
      this.formData.image = data;
    },
    back() {
      this.$router.go(-1);
    },
    async save() {
      console.log(this.formData.image);
      if (this.formData.image === "") {
        this.$tools.$mes("图片没上传到服务器，无法提交发布", "warning");
        return false;
      }
      let res = await recommendUp(this.formData);
      if (res && res.code === 1000) {
        this.$tools.$mes("推荐成功", "success");
        this.back();
      }
    },
    init() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.headers = {
        Authorization: userInfo.token
      };
      console.log(this.$route.params);
      let { title, type, rfid } = this.recomObj;
      this.formData.oriTitle = title;
      this.formData.type = type;
      this.formData.rfid = rfid;
    },
    async listCheck() {
      let res2 = await Stidlist(2);
      this.typeList = res2.data;
    }
  },
  created() {
    this.listCheck();
    this.init();
  }
};
</script>

<style scoped>
.el-image {
  width: 300px;
  height: 150px;
}

.el-divider--horizontal {
  margin: 0 0 20px 0;
}

.my-block /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.my-block /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.my-block /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.my-block /deep/ .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  display: block;
}
.my-block /deep/ .el-upload-list__item {
  width: 148px !important;
  height: 148px !important;
}
</style>
