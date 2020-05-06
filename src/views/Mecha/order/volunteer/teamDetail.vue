<template>
  <div>
    <div class="detail" v-if="isShow">
      <div class="my-block">
        <div class="sub-title">服务详情</div>
        <el-row :gutter="20">
          <el-col :span="24" class="el-right">
            <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
              <el-form-item label="服务编号 : ">
                <div>{{formData.serviceNo}}</div>
              </el-form-item>
              <el-form-item label="活动名称：">
                <div>{{formData.activityName||0}}</div>
              </el-form-item>
              <el-form-item label="活动价值：">
                <div>{{formData.value}}{{assetsUnitName}}/人</div>
              </el-form-item>
              <el-form-item label="状态： ">
                {{formData.serviceStatus===0?'未完成' :
                formData.serviceStatus===1?'已完成':
                formData.serviceStatus===2?'已结算':
                formData.serviceStatus===3?'争议':
                '未知'}}
              </el-form-item>
              <br />
              <el-form-item label="服务方：">
                <div>{{formData.serviceName}}</div>
              </el-form-item>
              <el-form-item label="开始时间：">
                <div>{{formData.beginTime}}</div>
              </el-form-item>
              <el-form-item label="活动时长：">
                <div>{{formData.duration}}小时</div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="my-block block_bot">
        <el-row :gutter="20">
          <!--you-->
          <el-col :span="12" class="el-right">
            <div class="time-address">
              <div class="co-fl">
                <p>签到时间 ：</p>
                <p>{{formData.checkInTime}}</p>
              </div>
            </div>
            <div class="co-fl">
              <p>签到地点：</p>
              <p class="address_right">{{checkInAddress1}}</p>
            </div>
            <div class="map">
              <Map :checkInCo="formData.checkInCo" :userInfo="userInfo" />
            </div>
          </el-col>
          <!--                    zuo-->
          <el-col :span="12" class="el-right">
            <div class="time-address">
              <div class="co-fl">
                <p>签到时间 ：</p>
                <p>{{formData.checkOutTime}}</p>
              </div>
            </div>
            <div class="co-fl">
              <p>签到地点 ：</p>
              <p class="address_left">{{checkInAddress2}}</p>
            </div>
            <div class="map">
              <Map2 :checkInCo="formData.checkOutCo" :userInfo="userInfo" />
            </div>
          </el-col>

          <div class="title">
            <p style="display:inline-block;float:left">签退备注 :</p>
            <div class="imgList" style="float:left">
              <div
                style="color: #8c939d;margin-top:-1px;margin-bottom: 10px"
              >{{formData.checkOutDesc}}</div>
              <el-image v-for="(item,index) in formData.checkOutImageList" :src="item" :key="index"></el-image>
            </div>
          </div>
        </el-row>
      </div>
      <div class="my-block">
        <el-form :inline="true" :model="formData" size="large" class="demo-form-inline">
          <el-form-item label="实际支付： ">
            <div>{{formData.value||0}}{{assetsUnitName}}/人</div>
          </el-form-item>
          <el-form-item label="总计：">
            <div>{{formData.value}}积分</div>
          </el-form-item>
          <el-form-item label="服务评价：">
            <el-rate v-model="commentScore" disabled text-color="#ff9900"></el-rate>
          </el-form-item>
          <br />
          <el-form-item label="评价内容： " class="comment">
            <el-input type="textarea" :autosize="{ minRows: 10}" v-model="formData.comment"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="my-block block_bot">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="5">
            <el-button type="warning" @click="isShow=false">提起争议</el-button>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="info" @click="back">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="deal" v-else>
      <div class="my-block block_bot">
        <div class="sub-title">发起争议</div>

        <el-form :inline="true" :model="formData" size="small" class="demo-form-inline">
          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-form-item label="服务编号 : ">
                <div>{{formData.serviceNo}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="活动名称：">
                <div>{{formData.activityName||0}}</div>
              </el-form-item>
            </el-col>
            <br />
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-form-item label="服务方：">
                <div>{{formData.serviceName}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="开始时间：">
                <div>{{formData.beginTime}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="凭证：">
            <div class="imgList">
              <Elupload @load="load" />
            </div>
          </el-form-item>
          <br />

          <el-form-item label="处理结果： " class="comment">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8}"
              placeholder="请输入内容"
              v-model="formData.disputeDesc"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="my-block block_bot">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="5">
            <el-button type="warning" @click="dealpute">提交处理结果</el-button>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="info" @click="isShow=true">返回</el-button>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="服务争议" :visible.sync="dialogVisible" width="30%">
        <span>您已经成功发起服务争议，请等候第三方处理争议</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Map from "@com/map-QQ";
import Map2 from "@com/map-QQ/index2";
import { serviceDetail, dispute, raisedispute } from "@http/order";
import { mapState } from "vuex";
import Elupload from "./upload";

export default {
  name: "teamDetail",
  data() {
    return {
      isShow: true,
      checkInAddress1: "",
      checkInAddress2: "",
      commentScore: "",
      assetsUnitName: "",
      formData: {
        imageList: []
      },
      title: "服务详情",
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      tableData: {
        records: []
      },
      value1: null,
      imageList: [],
      dialogVisible: false
    };
  },
  components: {
    Map,
    Map2,
    Elupload
  },
  computed: {
    ...mapState({
      userInfo: state => state.baseData.OrderData
    })
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async init() {
      this.assetsUnitName = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).assetsUnitName;
      let res = await serviceDetail(this.userInfo.id);
      this.formData = res.data;
      this.commentScore = res.data.commentScore;
      var checkInAddress = "";
      let info = res.data.checkInCo;
      let info2 = res.data.checkOutCo;
      var myLatlng = new qq.maps.LatLng(info.split(",")[1], info.split(",")[0]);
      var myLatlng2 = new qq.maps.LatLng(
        info2.split(",")[1],
        info2.split(",")[0]
      );
      let that = this;
      that.getAddCode1 = new qq.maps.Geocoder({
        complete: function(result) {
          that.checkInAddress1 = result.detail.address;
        }
      });
      that.getAddCode2 = new qq.maps.Geocoder({
        complete: function(result) {
          that.checkInAddress2 = result.detail.address;
        }
      });
      setTimeout(() => {
        that.getAddCode1.getAddress(myLatlng);
        that.getAddCode2.getAddress(myLatlng2);
        console.log(this.formData);
      }, 500);
    },
    async dealpute() {
      let obj = {
        disputeDesc: this.formData.disputeDesc,
        id: this.formData.id,
        imageList: this.imageList
      };
      let res = await raisedispute(obj);
      if (res && res.code === 1000) {
        this.dialogVisible = true;
      }
    },
    deal() {
      this.isShow = false;
      this.title = "发起争议";
    },
    load(data) {
      this.imageList = [];
      data.forEach(element => {
        this.imageList.push(element.response.data.url);
      });
      console.log(this.imageList);
    },
    sure() {
      this.dialogVisible = false;
      this.$router.push({
        name: "ordervolunteer"
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.el-image {
  width: 100%;
  height: 380px;
}

.time-address {
  display: flex;
  align-self: center;
  justify-content: space-between;
}
.co-fl {
  p {
    display: inline-block;
    &:nth-child(2) {
      color: #8e9aac;
    }
  }
}
.imgList {
  padding: 18px 10px;

  .el-image {
    margin-right: 25px;
    margin-bottom: 10px;
    flex: 1;
    width: 150px;
    height: 150px;
  }
}

.title {
  padding: 0px 10px;

  .left,
  .right {
    display: inline-block;
    margin-right: 20px;
    float: left;
    margin-top: 30px;
  }

  .right {
  }
}

.name {
  display: inline-block;
  position: absolute;
  margin-top: 3px;
}

.el-avatar--circle {
  margin-top: -3px;
}
.comment {
  /deep/ .el-form-item__content {
    width: 500px;
  }
}
.address_right,
.address_left {
}
</style>
