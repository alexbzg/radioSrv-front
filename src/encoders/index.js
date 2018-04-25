import Vue from 'vue'

import wscEncoders from '../wsc-encoders'
import encodersSettingsService from '../encoders-settings-service'

const e = {
    wsc: wscEncoders,
    settings: {},
    loadSettings: encodersSettingsService.load
}

wscEncoders.onUpdateSettings( encodersSettingsService.load )

encodersSettingsService.onUpdate(
    function () {
        encodersSettingsService.data.forEach(
            x => Vue.set( e.settings, x.id, x )
        )
    }
)

encodersSettingsService.load()

export default e
