<template>
 <div>
  <input type="text" placeholder="请输入..." v-model="searchVal">
  <ul>
   <li v-for="(item,index) in NewItems" :key="index" :value="item.value" v-text="item.name"></li>
  </ul>
  <Button @click="data()"></Button>
  <div>
    <!--<img :src="qq" alt="12121">-->
  </div>
   <div>
     <video src="http://livehemujia.aigenwoxue.org/ltNkkdC3iRwIwEaUr5kgDEcwABN0" controls></video>
   </div>
 </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      qq:
        "http://wx.qlogo.cn/mmopen/Q3auHgzwzM5YjCIOV6DyCJSyNJuJT58gy9KzrpHXQl1Z5RGichicIsnemJZibVDqzmLtAcVfNhdhxlm2J4RqYAJMffibuwaLjE9MVRULR9ulEZU/0",
      opop: [],
      searchVal: "",
      items: [
        {
          name: "上海",
          value: "sh"
        },
        {
          name: "北京",
          value: "bj"
        },
        {
          name: "重庆",
          value: "cq"
        },
        {
          name: "嗨嗨嗨",
          value: "hhh"
        },
        {
          name: "海上",
          value: "hs"
        },
        {
          name: "京都",
          value: "jd"
        }
      ]
    };
  },
  methods: {},
  computed: {
    NewItems() {
      var _this = this;
      var NewItems = [];
      this.items.map(function(item) {
        console.log(item.name.search(_this.searchVal));
        if (item.name.search(_this.searchVal) != -1) {
          NewItems.push(item);
        }
      });
      return NewItems;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.opop = this.items
        .filter(x => x.name === "海上")
        .map(x => x.name + x.name);
      console.log(this.opop);
    },
    data() {
      this.$set(this.opop, 1, 1);
      console.log(this.opop);
    }
  }
};
</script>
