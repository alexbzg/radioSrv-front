import Vue from 'vue'
import Router from 'vue-router'

import EncodersView from '../components/EncodersView'

Vue.use( Router )

export default new Router({
    routes: [
        { 
            path: '/',
            redirect: '/encodersView' 
        },
        { 
            path: '/encodersView',
            name: 'EncodersView',
            component: EncodersView,
            props: true
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
