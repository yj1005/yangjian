<template>
  <div>
    <!-- <ButtonGroup class="mtb10">
        <Button @click="getUserList">刷新</Button>
        <Button type="primary" @click="handleAdd">增加</Button>
        <Button @click="test">测试</Button>
    </ButtonGroup> -->
    <Table
      id="scroll"
      :columns="tableOptions.columns"
      :data="userList"
      :height="tableOptions.height"
      :loading="loading"
      class="table_top"
    ></Table>
    <div v-if="isShow" class="pgone">
      <Page
        @on-change="onPageChange"
        :total="total"
        :page-size="40"
        show-total
      >
      </Page>
    </div>
    <Form
      class="searchForm"
      :model="addForm"
      :label-width="80"
      :rules="rulefilter"
      ref="addForm"
    >
      <Row :gutter="16">
        <Col span="21">
          <FormItem label="姓名：" prop="name">
            <Input placeholder="输入姓名" v-model="addForm.name"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="21">
          <FormItem label="年纪：" prop="age">
            <AutoComplete
              v-model="value1"
              :data="data1"
              @on-search="handleSearch"
              placeholder="input here"
              style="width:200px"></AutoComplete>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="21">
          <FormItem label="生日：" prop="birth">
            <DatePicker v-model="addForm.birth" format="yyyy-MM-dd"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="21">
          <FormItem label="性别：" prop="sex">
            <RadioGroup v-model="addForm.sex">
              <Radio label=1>男</Radio>
              <Radio label=0>女</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="21">
          <FormItem label="地址：" prop="addr">
            <Input placeholder="输入地址" :maxlength='10' v-model="addForm.addr"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="Submit">提交</Button>
      <Button @click="addOrderModal = false">取消</Button>
      <Button @click="getSubStr('1054182510726070274')">1111</Button>
    </div>
    <span>{{arr}}}</span>
    <Button @click="Test">Test</Button>
  </div>
</template>
<script>
  import {
    getUserPageList,
    removeUser,
    addUser,
    editUser,
    batchUsers
  } from "../../../api/api";
  import { valid } from "semver";

  export default {
    data() {
      return {
        arr: [
          {
            name: "小小毛",
            age: 18
          },
          {
            name: "小小毛",
            age: 11
          },
          {
            name: "小小毛",
            age: 22
          },
          {
            name: "小红",
            age: 17
          },
          {
            name: "小绿",
            age: 16
          }
        ],
        value1: "",
        data1: [],
        addOrderModal: false,
        editOrderModal: false,
        tableOptions: {
          columns: this.initTableColumns(),
          data: [],
          border: true,
          width: 237,
          height: document.body.clientHeight - 650
        },
        userList: [],
        filter: {
          name: "",
          addr: ""
        },
        isShow: true,
        total: null,
        page: 2,
        loading: false,
        sels: [],
        //新增数据初始化
        dialogAddVisible: false,
        addLoading: false,
        addForm: {
          age: 0,
          name: "",
          sex: "",
          birth: "",
          addr: ""
        },
        count: 0,
        selected: [],
        dialogEditVisible: false,
        editLoading: false,
        rulefilter: {
          age: [{required: true, message: "请输入年龄", trigger: "blur"}],
          name: [{required: true, message: "请输入姓名", trigger: "blur"}],
          addr: [{required: true, message: "请输入地址", trigger: "blur"}],
          //   birth:[{required :true,message:'请选择生日',trigger:'blur'}],
          sex: [{required: true, message: "请选择性别", trigger: "blur"}]
        }
      };
    },
    mounted() {
      this.getUserList();
      this.Test();
      // $('#test').on('click', function(){
      //   console.log($layer)
      // })
    },
    methods: {
      Test() {
        var oldArray = [
          {
            name: 'i m name',
            num: 230
          },
          {
            name: 'i m name',
            num: 230
          },
          {
            name: 'i m name',
            num: 230
          }
        ];
        var newArrayOne = oldArray.map(function (v) {
          // 回调函数代码
          return v.name
          //这里我想返回以 oldArray['name']值组成的数组
        });
        console.log(newArrayOne);
        var newArrayTwo = oldArray.map(function (v) {
          // 回调函数代码
          return v.num
          //这里我想返回以 oldArray['num']值组成的数组
        })
        console.log(newArrayTwo)

        function todo() {  //传入两个数组参数
          //do something
          var one = newArrayOne, two = newArrayTwo;
          console.log("newArrayOne=" + one + ";newArrayTwo=" + two)
        }
        todo();
        // console.log(this.arr);
        let arr2 = [];
        let a = [];
        let b = [];
        a = this.arr.filter(x=>x.age);
        // a = this.arr.filter(function (x) {
        //   return x.age
        // });
        b = this.arr.map(function (x) {
          return x.age
        });
        console.log(a);
        console.log(b);

        // for (let i = 0; i < this.arr.length; i++) {
        //   if (this.arr[i].name === '小小毛') {
        //     b.push(this.arr[i])
        //   }
        // }
        // console.log(b);
        let sum3 = 0;
        for (let i = 0; i < arr2.length; i++) {
          sum3 = sum3 + arr2[i].age
        }
      },
      //截取字符串中间用省略号显示
      getSubStr(str) {
        var subStr1 = str.substr(0, 4);
        var subStr2 = str.substr(str.length - 14, 5);
        var subStr = subStr1 + "....." + subStr2;
        console.log(subStr)
      },

      handleSearch(value) {
        this.count++;
        console.log(this.count);
        this.data1 = !value ? [] : [value, value + 1, value + value + value];
      },
      // 表格columns数据
      initTableColumns() {
        return [
          {
            title: "年纪",
            key: "age",
            align: "left",
            width: 140
          },
          {
            title: "名称",
            key: "name",
            align: "left",
            width: 140
          },
          {
            title: "性别",
            key: "sex",
            align: "left",
            width: 140,
            filters: [
              {
                label: "男",
                value: "0"
              },
              {
                label: "女",
                value: "1"
              }
            ],
            render: (h, params) => {
              let sex = params.row.sex;
              let label;
              if (sex == "0") {
                label = "女";
              } else if (sex == "1") {
                label = "男";
              } else {
                label = "未知";
              }
              return h("span", label);
            }
          },
          {
            title: "地址",
            key: "addr",
            align: "left",
            width: 140
          },
          {
            title: "生日",
            key: "birth",
            align: "left",
            width: 140
            // render:(h,params)=>{
            //   let birth = (params.row.birth).format('YYYY-MM-DD');
            //   return h ('Tooltip',birth)
            // }
          },
          {
            title: "操作",
            width: 212,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.handleEdit(params.row);
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.delUserList(params.row.id);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ];
      },
      // 列表
      getUserList() {
        let data = {
          page: this.page,
          name: this.filter.name
        };
        this.loading = true;
        getUserPageList(data).then(res => {
          // console.log(res);
          this.total = res.data.total;
          this.userList = res.data.users;
          this.loading = false;
          // console.log(this.total)
          this.loading = false;
        });
      },
      //显示新增页面
      handleAdd() {
        this.addForm = {
          name: "",
          sex: "",
          age: "",
          birth: "",
          addr: ""
        };
        this.$refs["addForm"].resetFields();
        this.addOrderModal = true;
      },
      //显示编辑页面
      handleEdit(row) {
        this.$refs["addForm"].resetFields();
        this.addForm = {};
        this.editOrderModal = true;
        this.addForm = Object.assign({}, row);
        this.addForm.name = this.addForm.name.toString();
        this.addForm.age = this.addForm.age.toString();
        this.addForm.addr = this.addForm.addr.toString();
        this.addForm.sex = this.addForm.sex.toString();
      },
      //提交
      Submit() {
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].name === this.addForm.nam) {
            this.addSubmit;
          } else {
            this.addSubmit;
          }
        }
      },
      //提交添加
      addSubmit() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            let data = Object.assign({}, this.addForm);
            console.log(data);
            addUser(data).then(res => {
              console.log(res);
              this.$Message.success("添加成功");
              this.$refs["addForm"].resetFields();
              this.addOrderModal = false;
              this.getUserList();
            });
          }
        });
      },
      //提交编辑
      editSubmit() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            // console.log(this.$refs.addForm);
            let data = Object.assign({}, this.addForm);
            editUser(data).then(res => {
              // console.log(res);
              this.$Message.success("编辑成功");
              this.$refs["addForm"].resetFields();
              this.editOrderModal = false;
              this.getUserList();
            });
          }
        });
      },
      // 删除操作
      delUserList(id) {
        let _this = this;
        this.$Modal.confirm({
          title: "提示",
          content: "确定删除该条信息吗",
          onOk: function () {
            removeUser(id)
              .then(request => {
                console.log(request);
                if (request.status === 210) {
                  _this.$Message.success("删除成功");
                  _this.getUserList();
                }
              })
              .catch(e => {
                _this.$Message.error("失败重试");
              });
          }
        });
      },
      //重置搜索
      restSearchForm() {
        this.filter = {
          name: "",
          addr: ""
        };
      },

      test() {
        function a() {
          for (var i = 0; i < 10; i++) {
            result[i] = function () {
              return i; //这里i存储的是「引用」而不是值，所以其「值」只有在执行时才能确定。
            };
            console.log(i);
          }
        }
      },
      // 分页
      onPageChange(val) {
        // console.log(val)
        this.page = val;
        this.getUserList();
      }
    }
  };
</script>
