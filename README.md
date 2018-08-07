Yet anthor logger tool
----

Works on Nodejs and Browsers

## Install

```sh
npm i -D @rabbitcc/logger
```

## Usage

```js
import log from '@rabbitcc/logger'

log.info('name', 'action', 'contents')

```


### Setup logger level

```js
// via cross-env scripts

cross-env LOGGER_LEVEL=DEBUG

```

Or if you want works on browser, can pass the evn via `webpack.EnvironmentPlugin`

```js
plugins: [
  //...other plugins

  new EnvironmentPlugin([ 'LOGGER_LEVEL' ]),

  // or pass default level if not set

  new EnvironmentPlugin({ LOGGER_LEVEL: 'DEBUG' }),
]
```
