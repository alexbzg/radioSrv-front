export default function (url) {
    const wsc = this
    if ( url.startsWith('ws') ) {
        this.url = url
    } else {
        const loc = window.location
        if (loc.protocol === 'https:') {
            this.url = 'wss:'
        } else {
            this.url = 'ws:'
        }
        this.url += '//' + loc.host
        if (!url.startsWith( '/' )) {
            this.url += loc.pathname
        }
        this.url += url
    }
    this.timeout = 500
    let pingTimeoutID = null
    let answerTimeoutID = null

    const listeners = { 'open': [], 'close': [], 'message': [] }

    this.addEventListener = addEventListener
    this.removeEventListener = removeEventListener

    connect()

    function connect () {
        wsc.ws = new WebSocket(wsc.url)
        for ( const type in listeners ) {
            listeners[type].forEach( cb => wsc.ws.addEventListener( type, cb ) )
        }
        wsc.ws.onmessage = onMessage
        wsc.ws.onclose = onDisconnect
        schedulePing()
    }

    function schedulePing () {
        pingTimeoutID = setTimeout( ping, wsc.timeout )
    }

    function ping () {
        wsc.ws.send( '__ping__' )
        answerTimeoutID = setTimeout(
            function () { wsc.ws.close() },
            wsc.timeout
        )
    }

    function onMessage () {
        clearTimeouts()
        schedulePing()
    }

    function addEventListener ( type, cb ) {
        listeners[type].push( cb )
        if (wsc.ws != null) {
            wsc.ws.addEventListener( type, cb )
        }
    }

    function removeEventListener () {
    }

    function clearTimeouts () {
        if ( answerTimeoutID ) {
            clearTimeout( answerTimeoutID )
            answerTimeoutID = null
        }
        if ( pingTimeoutID ) {
            clearTimeout( pingTimeoutID )
        }
    }

    function onDisconnect () {
        clearTimeouts()
        wsc.ws = null
        setTimeout( connect, 5000 )
    }
}
