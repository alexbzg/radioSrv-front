import dataServiceFactory from '../data-service-factory'

let s = dataServiceFactory()

s.url = '/static/encoders.json'
s.eventName = 'encoders-settings-updated'

export default s
