<template>
  <div class="peripherals-content">
    <Card title="交易明细列表" icon="ios-people" :padding="5">
      <Form v-if="isShowSearch"
            class="searchForm"
            ref="formValidate"
            :model="formValidate"
            :label-width="70">
        <Row :gutter="16">
          <Col span="4">
            <FormItem label="名称">
              <Input placeholder="支持债券名称检索" v-model="formValidate.name"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="代码">
              <Input placeholder="支持债券代码检索" v-model="formValidate.code"></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="成交编号">
              <Input placeholder="支持成交编号检索" v-model="formValidate.transactionNum"></Input>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <Button type="primary" @click="initTableData">搜索</Button>
            <Button @click="restSearchForm">重置</Button>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card :padding="5">
      <Table id="scroll" :pagination="pagination" :columns="tableOptions.columns" :data="data1"
             :height="tableOptions.height"></Table>
    </Card>
  </div>
</template>
<script>
  export default {
    props: {
      isShowSearch: {
        type: Boolean,
        default: true
      },
      tableHeight: {
        type: Number,
        default: document.body.clientHeight - 385
      }
    },
    data() {
      return {
        formValidate: {
          tradingDirection: '全部',
          code: '',
          name: '',
          transactionNum: ''
        },
        tableOptions: {
          columns: this.initTableColumns(),
          data: [],
          border: true,
          height: document.body.clientHeight - 280
        },
        pagination: {
          isShow: true,
          pageIndex: 1,
          pageSize: 10,
          showTotal: true,
          showSizer: true
        },
        data1: [
          {
            tradingType: '买入',
            transactionNum: '22',
            counterparty: '22',
            counterpartyTrader: '22',
            tradingDirection: '22',
            code: '22',
            name: '22',
            netPrice: '22',
            YieldToMaturity: '22',
            CouponAmount: '22',
            TransactionAmount: '22',
            ClearSpeed: '22',
            AccruedInterest: '22',
            netPrice: '22',
            TotalAccruedInterest: '22'
          },
          {
            tradingType: '买入',
            transactionNum: '11',
            counterparty: '11',
            counterpartyTrader: '11',
            tradingDirection: '11',
            code: '11',
            name: '11',
            netPrice: '11',
            YieldToMaturity: '11',
            CouponAmount: '11',
            TransactionAmount: '11',
            ClearSpeed: '11',
            AccruedInterest: '11',
            netPrice: '11',
            TotalAccruedInterest: '11'
          },
        ]
      };
    },
    mounted() {
      // 1. 初始化列表数据
      this.initTableData();
    },
    methods: {
      // 表格columns数据
      initTableColumns() {
        return [
          {
            title: '交易方式',
            key: 'tradingType',
            align: 'left',
            width: 90,
          },
          {
            title: '成交编号',
            key: 'transactionNum',
            align: 'left',
            width: 90
          },
          {
            title: '对手方',
            key: 'counterparty',
            align: 'left',
            width: 90
          },
          {
            title: '对手方交易员',
            key: 'counterpartyTrader',
            align: 'left',
            width: 120
          },
          {
            title: '交易方向',
            key: 'tradingDirection',
            align: 'left',
            width: 90
          },
          {
            title: '代码',
            key: 'code',
            align: 'left',
            width: 90
          },
          {
            title: '名称',
            key: 'name',
            align: 'left',
            width: 90
          },
          {
            title: '净价（元）',
            key: 'netPrice',
            align: 'right',
            width: 100
          },
          {
            title: '到期收益率（%）',
            key: 'YieldToMaturity',
            align: 'right',
            width: 140
          },
          // {
          //   title: '行权收益率（%）',
          //   key: 'YieldToRight',
          //   align: 'right',
          //   width: 140
          // },
          {
            title: '券面总额（万元）',
            key: 'CouponAmount',
            align: 'right',
            width: 140
          },
          {
            title: '交易金额（元）',
            key: 'TransactionAmount',
            align: 'right',
            width: 140
          },
          {
            title: '清算速度',
            key: 'ClearSpeed',
            align: 'left',
            width: 90
          },
          {
            title: '应计利息（元）',
            key: 'AccruedInterest',
            align: 'right',
            width: 140
          },
          {
            title: '全价（元）',
            key: 'netPrice',
            align: 'right',
            width: 100
          },
          {
            title: '应计利息总额（元）',
            key: 'TotalAccruedInterest',
            align: 'right',
            minWidth: 160
          }
        ];
      },
      // 表格data数据
      initTableData() {
        let pagination = this.pagination;
        let formdata = new FormData();
        this.tableOptions.loading = true;
      },
      restSearchForm() {
        this.formValidate = {
          name: '',
          code: '',
          transactionNum: ''
        }
      }
    }
  };
</script>
