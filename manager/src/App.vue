<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{width:100%;height:100%;}
*{margin: 0; padding: 0;}
a{text-decoration: none; color: #333;}
li > a{display: block; width: 100%; height:100%;}
.el-menu{background-color: #f4f4f4;}
.el-submenu .el-menu-item,
.el-menu > .el-submenu__title{padding-left: 23%!important; padding-right: 0; min-width: 0;}
.el-menu-item-group__title{padding:0!important;}
.newBtn{float: right; margin: 8px;}
.popo{display: block; margin-left: 20%;}
.el-popover{padding: 20px;background-color: rgba(82,186,181, .9);color: #fff;}
.pd_popo{background-color: #fff; color: #333;}
.el-radio{color: #f2f2f2;}
.el-tabs__content{overflow:visible;}
.el-collapse-item__header{border: none; padding-left: 10px; background-color: #f9f9f9;}
.el-collapse{border: none;}
.change_pwd{
            /* margin: 5% 10%; */
        }
</style>
