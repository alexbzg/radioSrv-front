<template>
  <div class="encoders_view">
      {{serverConnected ? 'connected' : 'not connected'}} <br/>
      Controller {{controllerConnected ? 'connected' : 'not connected'}}<br/>
      <div v-for="(val, enc) in this.encoders.wsc.encoders" :key="enc">
          {{enc}}: {{val}}<br/>
      </div>
  </div>
</template>

<script>
export default {
    name: 'EncodersView',
    props: ['encoders'],
    data () {
        return {}
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
