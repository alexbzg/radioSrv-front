import WSConnection from '../ws-connection'
import Vue from 'vue'

const wsc = new WSConnection('/aiohttp/ws/encoders')
wsc.addEventListener( 'open', onConnect )
wsc.addEventListener( 'close', onDisconnect )
wsc.addEventListener( 'message', onMessage )
const updateSettingsEventName = 'server-update-encoders-settings'

const bus = new Vue({})

const e = {
    serverConnected: false,
    controllerConnected: false,
    encoders: {},
    onUpdateSettings: onUpdateSettings
}

function onUpdateSettings ( callback ) {
    bus.$on( updateSettingsEventName, callback )
}

function onConnect () {
    e.serverConnected = true
}

function onDisconnect () {
    e.serverConnected = false
    e.controllerConnected = false
}

function onMessage (evt) {
    if (evt.data === '__pong__') {
        return
    }
    const data = JSON.parse( evt.data )
    if ('controllerConnection' in data) {
        e.controllerConnected = data.controllerConnection
    }
    if ('encoders' in data) {
        for (const id in data.encoders) {
            Vue.set( e.encoders, id, data.encoders[id] )
        }
    }
    if ('updateSettings' in data) {
        bus.$emit(updateSettingsEventName)
    }
}

export default e
