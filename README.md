# bespoke-synchro

Presentation Synchronizing for [Bespoke.js](https://github.com/markdalgleish/bespoke.js)

This bespoke plugin causes 

## Installation

```bash
$ npm install bespoke-synchro
```

This module should be installed with npm, 
since it's packaged with a neccessary WebSocket mediator
server


## Usage

On the client side (options shown are defaults):

```js
var bespoke = require('bespoke'),
  synchro = require('bespoke-synchro');

bespoke.from('article', [
  synchro({
    port: 9999,
    url: 'ws://localhost'
  })
]);
```

The bespoke-synchro plugin relies on a WebSocket mediator
to interface between presentation instances (e.g. between
each loaded presentation in a browser).

In node (options shown are defaults)

```
var mediator = require('bespoke-synchro/mediator')
mediator({port:9999});
```

The options supplied to `mediator` are passed directly to
`ws.Server`, see
[https://github.com/websockets/ws/blob/master/doc/ws.md](https://github.com/websockets/ws/blob/master/doc/ws.md)

### Mediator executable

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
