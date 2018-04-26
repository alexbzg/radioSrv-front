<template>
    <table class="encoders_setup">
        <tr>
            <th class="id">ID</th>
            <th class="name">Название</th>
            <th class="current">Показания</th>
            <th class="north">Север</th>
            <th class="buttons"></th>
        </tr>
        <tr v-for="(enc, id) in settings" :key="id">
            <td class="id">
                {{id}}
            </td>
            <td class="name">
                <input type="text" v-model="enc.name"/>
            </td>
            <td class="current">
                {{encoders.values[id]}}
            </td>
            <td>
                <input type="text" v-model="enc.north"/>
            </td>
            <td>
                <button @click="save(id)">Сохранить</button>
                <button @click="remove(id)">Удалить</button>
            </td>
        </tr>
        <tr class="new">
            <td class="id" colspan="5">
                Новый ID <input type="text" v-model="newID"/>
                <button @click="add()">Добавить</button>
            </td>
        </tr>
    </table>
</template>

<script>
import request from '../request'

export default {
    name: 'EncodersSetup',
    props: ['encoders'],
    data () {
        return {
            newID: null,
            settings: this.loadSettings()
        }
    },
    methods: {
        loadSettings () {
            return JSON.parse( JSON.stringify( this.encoders.settings ) )
        },
        post ( data ) {
            request.post( 'encSettings', data )
                .catch( function () {
                    alert( 'Ошибка сервера!' )
                })
        },
        save (id) {
            this.post( this.settings[id] )
        },
        remove (id) {
            if (window.confirm('Вы действительно хотите удалить настройки энкодера?')) {
                const d = { 'id': id, 'delete': 1 }
                this.post( d )
            }
        },
        add () {
            this.post( { 'id': this.newID } )
        }
    },
    watch: {
        'encoders.settings': function () {
            this.settings = this.loadSettings()
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
