<p align="center">
  <img src="/mookie.png" height="300">
  <h1 align="center">
    &nbsp;mookie
    <br>
        <a href="https://circleci.com/gh/kevinrambaud/mookie/tree/master"><img alt="build-status" src="https://img.shields.io/circleci/project/github/kevinrambaud/mookie.svg?style=flat-square" /></a>
    <a href="https://codecov.io/gh/kevinrambaud/mookie"><img alt="build-status" src="https://img.shields.io/codecov/c/github/kevinrambaud/mookie.svg?style=flat-square" /></a>
    <a href="https://www.npmjs.com/package/mookie"><img alt="build-status" src="https://img.shields.io/npm/v/mookie.svg?style=flat-square" /></a>
    <a href="https://www.npmjs.com/package/mookie"><img alt="build-status" src="https://img.shields.io/npm/dt/mookie.svg?style=flat-square" /></a>
  </h1>
</p>

Node.js middleware engine for AWS Lambda using async functions.

## Installation

```bash
npm install mookie
```

## Usage

```javascript
const mookie = require('mookie')

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
