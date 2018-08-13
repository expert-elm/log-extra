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

  new EnvironmentPlugin({ LOGGER_LEVEL: process.env.LOGGER_LEVEL }),
]
```

You can pass log level by number and string type, below syntax are vaild.

```js
cross-env LOGGER_LEVEL=warn
cross-env LOGGER_LEVEL=WARN
cross-env LOGGER_LEVEL=40
```

If `process.env.DEBUG` flag was found, the logger level is set to `DEBUG`.

There is some build-in logger levels:

| NAME  | WEIGHT | DEFAULT? |
|-------|--------|----------|
| trace | 100    |   no     |
| debug | 80     |   no     |
| info  | 60     |   yes    |
| warn  | 40     |   no     |
| error | 20     |   no     |
| fatal |  0     |   no     |

By the way, the `FATAL` level will highlight by background color.

<details>
<summary>
<h3>Feature, log sync on terminal and browser via `webpack-hot-client` socket server</h3>
</summary>

```js
import log, { createSocket } from '@rabbitcc/log/socket'

if('production' !== process.env.NODE_ENV) {
  createSocket()
}

log.info('name', 'action', 'contents')
```

And log from terminal to browser:

```js
import { createSocket } from '@rabbitcc/log/socket'

serve: {
  on: {
    listening() {
      createSocket()
    }
  }
}
```
</details>


<details>
<summary>
<h3> Feature, log with origin file position </h3>
</summary>

![show origin file position](https://user-images.githubusercontent.com/5752902/44018351-0b1d63dc-9f0e-11e8-9b02-7625db60f730.png)

Enable this feature need setup as babel plugins:

```js
{
  "plugins": ["@rabbitcc/log/inject-position"]
}

// setup with options

{
  "plugins": [["@rabbitcc/log/inject-position", {
    // ...options see below
  }]]
}
```

The inject position plugin options:

```js
type InjectPositionPluginOptions = {
  test?: RegExp = /^@rabbitcc\/log/
}
```

In browser, you need to add folder to **chrome devtools workspace**.

![browser workspace](https://user-images.githubusercontent.com/5752902/44018496-925f25c4-9f0e-11e8-8eac-01db00148c0d.gif)

This feature also works on terminal. Your terminal should support hyperlinks.

![cmder hyperlinks](https://user-images.githubusercontent.com/5752902/44021314-10aac3d6-9f17-11e8-9c9b-dd264dc058a5.gif)
</details>
