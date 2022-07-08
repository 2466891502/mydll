<template>
  <div id="app">
    <div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </div>
  </div>
</template>

<script>
//import Index from './views/index.vue'

export default {
  name: 'app',
  components:{
    //Index,
  }
}
</script>

<style>

</style>
