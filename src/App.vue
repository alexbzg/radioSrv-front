<template>
  <div id="app">
    <EncodersView :encoders="encoders"/>
    <input type="button" :value="showSetup ? 'Закрыть' : 'Настройки'" @click="showSetup = !showSetup"/>
    <EncodersSetup :encoders="encoders" v-if="showSetup"/>
  </div>
</template>

<script>
import EncodersView from './components/EncodersView.vue'
import EncodersSetup from './components/EncodersSetup.vue'

import encoders from './encoders'

export default {
    name: 'app',
    components: {
        EncodersView,
        EncodersSetup
    },
    data () {
        return {
            encoders: encoders,
            showSetup: false
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
