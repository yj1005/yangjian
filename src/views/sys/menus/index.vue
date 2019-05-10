<template>
        <div>
          <Card title="交易明细列表" icon="ios-people" :padding="5" dis-hover>
            <Form
                  class="searchForm"
                  ref="filter"
                  :model="filter"
                  :label-width="70">
                <Row :gutter="16">
                    <Col span="4">
                        <FormItem label="姓名">
                            <Input placeholder="按姓名搜索" v-model="filter.name"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4">
                        <FormItem label="地址">
                            <Input placeholder="按地址搜索" v-model="filter.addr"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" offset="1">
                        <Button type="primary" @click="getUserList">搜索</Button>
                        <Button @click="restSearchForm">重置</Button>
                    </Col>
                </Row>
            </Form>
            <ButtonGroup class="mtb10">
                <Button @click="getUserList">刷新</Button>
                <Button type="primary" @click="handleAdd">增加</Button>
                <Button @click="test">测试</Button>
            </ButtonGroup>
            <Table 
            id="scroll" 
            :columns="tableOptions.columns" 
            :data="userList" 
            :height="tableOptions.height" 
            :loading="loading"
            ></Table>
            </Card>
             <div v-if="isShow" class="pgone">
                 <Page  
                   @on-change="onPageChange"
                   :total="total"
                   :page-size="20"
                   show-total
                 >
                 </Page>
            </div>
            <Modal title="新建"
            width="820"
            v-model="addOrderModal">
            <Form
            class="searchForm"
            :model="addForm"
            :label-width="80"
            :rules="rulefilter"
            ref="addForm"
            >
              <Row :gutter="16">
                    <Col span="9">
                        <FormItem label="姓名：" prop="name">
                            <Input placeholder="输入姓名" v-model="addForm.name"></Input>
                        </FormItem>
                    </Col>
                    <Col span="9">
                        <FormItem label="年纪：" prop="age">
                            <Input placeholder="输入年纪" v-model="addForm.age"></Input>
                         </FormItem>
                    </Col>
              </Row>		
              <Row :gutter="16">
                    <Col span="9">
                        <FormItem label="地址：" prop="addr">
                            <Input placeholder="输入地址" :maxlength='10' v-model="addForm.addr"></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                         <FormItem label="生日：" prop="birth">
                               <DatePicker v-model="addForm.birth" format="yyyy-MM-dd"></DatePicker>
                         </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="性别：" prop="sex">
                            <RadioGroup v-model="addForm.sex">
                                    <Radio label=1>男</Radio>
                                    <Radio label=0>女</Radio>
                          </RadioGroup>
                         </FormItem>
                    </Col>
              </Row>
            </Form>
            <div slot="footer">
              <Button type="primary" @click="addSubmit">提交</Button>
              <Button @click="addOrderModal = false">取消</Button>
            </div>
        </Modal>
            <Modal title="编辑"
            width="820"
            v-model="editOrderModal">
            <Form
            class="searchForm"
            :model="editForm"
            :label-width="80"
            :rules="rulefilter"
            ref="editForm"
            >
              <Row :gutter="16">
                    <Col span="9">
                        <FormItem label="姓名：" prop="name">
                            <Input placeholder="输入姓名" v-model="editForm.name"></Input>
                        </FormItem>
                    </Col>
                    <Col span="9">
                        <FormItem label="年纪：" prop="age">
                            <Input placeholder="输入年纪" v-model="editForm.age"></Input>
                         </FormItem>
                    </Col>
              </Row>		
              <Row :gutter="16">
                    <Col span="9">
                        <FormItem label="地址：" prop="addr">
                            <Input placeholder="输入地址" :maxlength='10' v-model="editForm.addr"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                         <FormItem label="生日：" prop="birth">
                               <DatePicker v-model="editForm.birth"></DatePicker>
                         </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="性别：" prop="sex">
                            <RadioGroup v-model="editForm.sex">
                                    <Radio label=1>男</Radio>
                                    <Radio label=0>女</Radio>
                          </RadioGroup>
                         </FormItem>
                    </Col>
              </Row>
            </Form>
            <div slot="footer">
              <Button type="primary" @click="editSubmit">提交</Button>
              <Button @click="editOrderModal = false">取消</Button>
            </div>
        </Modal>
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
      addOrderModal: false,
      editOrderModal: false,
      tableOptions: {
        columns: this.initTableColumns(),
        data: [],
        border: true,
        width: 237,
        height: document.body.clientHeight - 385
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
      selected: [],
      //编辑数据初始化
      editForm: {
        age: "",
        name: "",
        sex: "",
        birth: "",
        addr: ""
      },
      dialogEditVisible: false,
      editLoading: false,
      rulefilter: {
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
        //   birth:[{required :true,message:'请选择生日',trigger:'blur'}],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getUserList();
    // $('#test').on('click', function(){
    //   console.log($layer)
    // })
  },
  methods: {
    // 表格columns数据
    initTableColumns() {
      return [
        {
          title: "年纪",
          key: "age",
          align: "left",
          width: 316
        },
        {
          title: "名称",
          key: "name",
          align: "left",
          width: 316
        },
        {
          title: "性别",
          key: "sex",
          align: "left",
          width: 316,
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
          width: 316
        },
        {
          title: "生日",
          key: "birth",
          align: "left",
          width: 316
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
      this.$refs["editForm"].resetFields();
      this.editForm = {};
      this.editOrderModal = true;
      this.editForm = Object.assign({}, row);
      this.editForm.name = this.editForm.name.toString();
      this.editForm.age = this.editForm.age.toString();
      this.editForm.addr = this.editForm.addr.toString();
      this.editForm.sex = this.editForm.sex.toString();
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
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // console.log(this.$refs.editForm);
          let data = Object.assign({}, this.editForm);
          editUser(data).then(res => {
            // console.log(res);
            this.$Message.success("编辑成功");
            this.$refs["editForm"].resetFields();
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
        onOk: function() {
          removeUser(id)
            .then(request => {
              console.log(request);
              if (request.status === 200) {
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
      function a(){
      for (var i = 0; i < 10; i++) {
        result[i] = function() {
          return i; //这里i存储的是「引用」而不是值，所以其「值」只有在执行时才能确定。
        };
        console.log(i)
      }
    }
      // function a() {
      //   var i = 0;
      //   function b() {
      //     console.log(i--);
      //   }
      //   function c() {
      //     console.log(i++);
      //   }

      //   return [b, c];
      // }
      // var m = a();
      // m[0]();
      // m[1]();
      // m[0]();
      // m[1]();
      // m[0]();
      // m[1]();
      //   function a (){
      //     var n = 0;
      //     this.inc = function(){
      //       n++;
      //       console.log(n);
      //     }
      //   }
      // var c = new a ();
      // c.inc();
      // c.inc();
      // function a() {
      //   var i = 0;
      //   function b() {
      //     console.log(i--);
      //   }
      //   function c() {
      //     console.log(i++);
      //   }

      //   return [b, c];
      // }
      // var m = a();
      // m[0]();
      // m[0]();
      // m[0]();
      // m[1]();
      // m[1]();
      // m[1]();
      // 0   2 3 5 4 1
      // for (var i = 0; i < 5; i++) {
      //   setTimeout(
      //     (function(i) {
      //       console.log(i);
      //     })(i),
      //     i * 1000
      //   );
      // }
      // const name = {
      //   a: 1,
      //   b: 2
      // };
      // const age = {
      //   c: 3,
      //   d: 4
      // };
      // const users = { ...name, ...age };
      // console.log(users);

      // const  color = ['red','yellow']
      // const  colorall =[...color,'bule','pink']
      // console.log(colorall)
      // const number={
      //   first:'1',
      //   second:'2',
      //   lsd:'3'
      // }
      // const {first,seconde, ...rest}= number
      // console.log(rest)
      // this.$layer.tab({
      //   area: ["600px", "300px"],
      //   tab: [
      //     {
      //       title: "TAB1",
      //       content: "内容1"
      //     },
      //     {
      //       title: "TAB2",
      //       content: "内容2"
      //     },
      //     {
      //       title: "TAB3",
      //       content: "内容3"
      //     }
      //   ]
      // });
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