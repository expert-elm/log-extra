Yet anthor logger tool
----

Works on Nodejs and Browsers

Terminal:

![Terminal](https://user-images.githubusercontent.com/5752902/43772728-a6ec9fbe-9a75-11e8-95bc-7d6fe7a9aa72.png)

Browser:

![browser](https://user-images.githubusercontent.com/5752902/43772620-47e41182-9a75-11e8-9632-68d5944db477.png)


## Install

```sh
npm i -D @rabbitcc/log
```

## Usage

```js
import log from '@rabbitcc/log'

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


### Log sync on terminal and browser via `webpack-hot-client` socket server

```js
import log from '@rabbitcc/log/browser-socket'

log.info('name', 'action', 'contents')
```
