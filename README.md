<p align="center">
  <img src="/mookie.png" height="300">
  <h1 align="center">
    &nbsp;mookie
    <br>
  </h1>
</p>

Node.js middleware engine for AWS Lambda using async functions.

## Installation

```bash
npm install @mookie/core
```

## Usage

```javascript
const mookie = require('@mookie/core')

function debug(v) {
  console.log(JSON.stringify(v, null, 2), '\n')
}

async function error(handler, next) {
  try {
    await next()
  } catch (err) {
    console.log(err.message)
  }
}

async function inputOutputLogger(handler, next) {
  debug({ event: handler.event })
  await next()
  debug({ response: handler.response })
}

async function myLambdaFunction(event, context) {
  return {
    event,
    context,
    message: 'Hello world!'
  }
}

exports.handler = mookie(myLambdaFunction)
  .use(error)
  .use(inputOutputLogger)
```
