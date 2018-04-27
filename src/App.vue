<template>
  <div id="app">
    <EncoderView :encoders="encoders"/>
    <EncoderView :encoders="encoders"/><br/>
    Server {{serverConnected ? 'connected' : 'not connected'}} &nbsp; Controller {{controllerConnected ? 'connected' : 'not connected'}}<br/>
    <input type="button" :value="showSetup ? 'Закрыть' : 'Настройки'" @click="showSetup = !showSetup"/>
    <EncodersSetup :encoders="encoders" v-if="showSetup"/>
  </div>
</template>

<script>
import './style.css'

import EncoderView from './components/EncoderView.vue'
import EncodersSetup from './components/EncodersSetup.vue'

import encoders from './encoders'

export default {
    name: 'app',
    components: {
        EncoderView,
        EncodersSetup
    },
    data () {
        return {
            encoders: encoders,
            showSetup: false
        }
    },
    computed: {
        controllerConnected () {
            return this.encoders.wsc.controllerConnected
        },
        serverConnected () {
            return this.encoders.wsc.serverConnected
        }
    }
}
</script>

<style>
</style>
