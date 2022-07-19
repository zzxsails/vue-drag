<template>
  <div class="hello">
    <a-layout>
      <a-layout-sider style="background:#fff;height:500px;border: 1px solid #ccc;">
        <div class="component-list" @dragstart="handleDragStart">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="list"
            draggable
            :data-index="index"
            :style="item.style"
          >
            <span>{{ item.label }}</span>
          </div>
        </div>
      </a-layout-sider>
      <a-layout-content style="border: 1px solid red">
        <vue-draggable-resizable
          w="auto"
          h="auto"
          :x="item.style.x"
          :y="item.style.y"
          style="display:inline-block;position: absolute;"
          v-for="(item, index) in com"
          :key="index"
          class-name="my-class"
          @dragging="onDrag"
          @resizing="onResize"
          @activated="getIndex(index)"
          @deactivated="onDeactivated(index)"
        >
          <component 
          :is="item.name"
          :style="item.style"
          >
          </component>
          <a-button
          :style="`${index}`?'opacity:0':'opacity:1'"
        class="del"
          icon="delete"
          @click="delCom"></a-button>
        </vue-draggable-resizable>
        
      </a-layout-content>
      <a-layout-sider class="right" style="background:#fff;height:500px;padding:10px;border: 1px solid #ccc;">
        <div class="tabMenu">
          <ul class="title" @click="changeTab">
            <li data-index="0" :class="{active: tabIndex == 0}">属性</li>
            <li data-index="1" :class="{active: tabIndex == 1}">事件</li>
          </ul>
        </div>
        <div :style="`${tabIndex}`==0?'display:block':'display:none'">
          <a-form :form="form" >
          <a-form-item label="x轴坐标">
            <a-input type="number" v-model.number='curStyle.x'/>
          </a-form-item>
          <a-form-item label="y轴坐标">
            <a-input type="number" v-model.number='curStyle.y' />
          </a-form-item>
          <a-form-item label="宽">
            <a-input v-model='curStyle.width' />
          </a-form-item>
          <a-form-item label="高">
            <a-input v-model='curStyle.height' />
          </a-form-item>
        </a-form>
        </div>
        
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import { list } from "./conponentList";
export default {
  name: "HelloWorld",
  data() {
    return {
      form: this.$form.createForm(this),
      list,
      delShow:false,
      com: [],
      width:'',
      height:'',
      comIndex:'',
      tabIndex:0,
      curStyle:{},
      dels:document.getElementsByClassName('del'),
    };
  },
  created() {
    
  },
  
  updated(){
    // console.log(this.curStyle)
    // console.log(this.com)
    // console.log(this.dels)
  },
  watch:{
    curStyle(newcurStyle){
      if(this.comIndex && this.com.dataIndex==this.comIndex){
        return this.curStyle=newcurStyle  
      }
      return {} 
      }  
  },
  methods: {
    onDrag: function(x, y) {
      let index=this.comIndex
      this.com[index].style.x=x
      this.com[index].style.y=y
      // console.log(x,y,this.comIndex)
    },
    onResize(x, y,width, height) {
      let index=this.comIndex
      this.com[index].style.x=x
      this.com[index].style.y=y
      
      this.com[index].style.width = width+'px'
      this.com[index].style.height = height+'px'
    },
    getIndex(index){
      this.comIndex=index
      this.curStyle=this.com[index].style
      this.dels[index].style.opacity=1
    },
   onDeactivated(index){
     this.dels[index].style.opacity=0
   },
    handleDragStart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
      const index = e.dataTransfer.getData("index");
      let com={}
      com.name= this.list[index].component;
      com.dataIndex=this.com.length
      // console.log(com.dataIndex)
      if(com.name=='v-button'){
        com.style={x:0,y:0,width:'80px',height:'30px'}
      }else if(com.name=='v-input'){
        com.style={x:0,y:0,width:'80px',height:'30px'}
      }
      com.events=[]
      this.com.push(com)
    },
    changeTab(e){
      this.tabIndex=e.target.dataset.index
      console.log(e.target.dataset.index)
    },
    delCom(){
      // console.log(this.comIndex)
      let index=this.comIndex
      this.com.splice(index,1)

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.component-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    .list {
        width: 80%;
        border: 1px solid #ddd;
        cursor: grab;
        margin-bottom: 10px;
        text-align: center;
        color: #333;
        padding: 2px 5px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:active {
            cursor: grabbing;
        }

        .iconfont {
            margin-right: 4px;
            font-size: 20px;
        }

        .icon-wenben,
        .icon-tupian {
            font-size: 18px;
        }
    }
}
  aside.right{
    .tabMenu{
      padding: 0;
      box-sizing: border-box;
      .title{
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        text-align: center;
        li{
          width: 50%;
          &.active{
            color: #406a8b;
            border-bottom: 1px solid #406a8b;
          }
        }
      }
    }
  }
   

</style>
