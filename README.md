# bespoke-synchro

Presentation Synchronizing for [Bespoke.js](https://github.com/markdalgleish/bespoke.js)

This bespoke plugin synchronises the current slide index
between multiple clients.

By default only slides accessed on localhost can broadcast 
a new slide index to other slides.

## Installation

```bash
$ npm install bespoke-synchro
```

This module should be installed with npm, 
since it's packaged with a necessary WebSocket mediator
server


## Usage

On the client side (options shown are defaults):

```javascript
var bespoke = require('bespoke'),
  synchro = require('bespoke-synchro');

bespoke.from('article', [
  synchro({
    port: 9999,
    url: 'ws://' + location.href,
    control: <internal function>
  })
]);
```

The bespoke-synchro plugin relies on a WebSocket mediator
to interface between presentation instances (e.g. between
each loaded presentation in a browser).

In node (options shown are defaults)

```javascript
var mediator = require('bespoke-synchro/mediator')
mediator({port:9999, control: <internal function>});
```

The options supplied to `mediator` are passed directly to
`ws.Server`, see
[https://github.com/websockets/ws/blob/master/doc/ws.md](https://github.com/websockets/ws/blob/master/doc/ws.md)

### Control

On both the client and server side a `control` function can
be supplied to configure the decision mechanism for choosing
the clients that broadcast synchronization signals.

Client side contract is a function accepting `origin` and `socket`
parameters, which must return an object with a `local` property.

```javascript
  function (origin <String>, socket <Object>} {
    return {
      local: <Boolean>
    }
  }
```

Absence of the object will cause a throw, absence of a `local`
property will result in an assumed `false` value. 

Server side contract is a function accepting `origin`, `socket`
and `clients` parameters, which must return an object containing
`local` and `primary` properties.

```javascript
  function (origin <String>, socket <Object>, clients <Array>} {
    return {
      local: <Boolean>,
      primary: <socket Object>
    }
  }
```

The primary control socket should stay consistent, it's used
to broadcast the current page to newly connected clients. We
have to choose *one* socket to do this, otherwise clients are
hit multiple times.

Absence of the object will cause a throw, absence of a `local`
property will result in an assumed `false` value, absence of
a `primary` property will prevent clients from receiving the
current active slide upon loading.


## Mediator executable

When `bespoke-synchro` is installed globally, the mediator
can started via an executable:

```sh
npm install -g bespoke-synchro
bespoke-synchro-mediator --port 9999
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Sponsoship

Sponsored by [nearForm](http://nearform.com)
