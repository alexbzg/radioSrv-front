import Vue from 'vue'

import wscEncoders from '../wsc-encoders'
import encodersSettingsService from '../encoders-settings-service'

const e = {
    wsc: wscEncoders,
    settings: {
        'controller': { 'host': null },
        'encoders': {}
    },
    values: wscEncoders.encoders,
    loadSettings: encodersSettingsService.load
}

wscEncoders.onUpdateSettings( encodersSettingsService.load )

encodersSettingsService.onUpdate(
    function () {
        const data = encodersSettingsService.data
        for (const x in data.controller) {
            Vue.set( e.settings.controller, x, data.controller[x] )
        }
        data.encoders.forEach(
            x => Vue.set( e.settings.encoders, x.id, x )
        )
    }
)

encodersSettingsService.load()

export default e
