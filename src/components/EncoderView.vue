<template>
    <div class="encoders_view">
        <div class="map">
            <div class="arrow" :style="arrowStyle">
                <img src="/static/images/arrow.png">
            </div>
        </div>
        <select v-model="encoderID">
            <option disabled value="">Выберите энкодер</option>
            <option v-for="(enc, id) in encoders.settings" :value="id" :key="id">
                {{id + (enc.name ? ': ' + enc.name : '')}}
            </option>
        </select>
        <span v-if="encoderID != ''">
            {{angle}}
        </span>
    </div>
</template>

<script>
export default {
    name: 'EncodersView',
    props: ['encoders'],
    data () {
        return {
            encoderID: ''
        }
    },
    computed: {
        angle () {
            if (this.encoderID === '') {
                return ''
            }
            if (!this.encoders.settings[this.encoderID].north ||
                    this.encoders.values[this.encoderID] === -1) {
                return this.encoders.values[this.encoderID]
            }
            let angle = ( this.encoders.values[this.encoderID] -
                    this.encoders.settings[this.encoderID].north ) / ( 1024 / 360 )
            if (angle < 0) {
                angle += 360
            }
            return Math.round( angle )
        },
        arrowStyle () {
            if ( this.angle === '' || this.angle === -1 ) {
                return { 'display': 'none' }
            } else {
                return { 'transform': 'rotate(' + this.angle + 'deg)' }
            }
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
