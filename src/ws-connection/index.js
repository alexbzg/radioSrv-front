export default function (url) {
    const wsc = this
    this.url = url
    const listeners = { 'open': [], 'close': [], 'message': [] }

    this.addEventListener = addEventListener
    this.removeEventListener = removeEventListener

    connect()

    function connect () {
        wsc.ws = new WebSocket(wsc.url)
        for ( const type in listeners ) {
            listeners[type].forEach( cb => wsc.ws.addEventListener( type, cb ) )
        }
        wsc.ws.onclose = onDisconnect
    }

    function addEventListener ( type, cb ) {
        listeners[type].push( cb )
        if (wsc.ws != null) {
            wsc.ws.addEventListener( type, cb )
        }
    }

    function removeEventListener () {
    }

    function onDisconnect () {
        wsc.ws = null
        setTimeout( connect, 5000 )
    }
}
