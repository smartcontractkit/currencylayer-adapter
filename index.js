const rp = require('request-promise')
const retries = process.env.RETRIES || 3
const delay = process.env.RETRY_DELAY || 1000

const requestRetry = (options, retries) => {
  return new Promise((resolve, reject) => {
    const retry = (options, n) => {
      return rp(options)
        .then(response => {
          if (response.body.error || response.body.success === false) {
            if (n === 1) {
              reject(response)
            } else {
              setTimeout(() => {
                retries--
                retry(options, retries)
              }, delay)
            }
          } else {
            return resolve(response)
          }
        })
        .catch(error => {
          if (n === 1) {
            reject(error)
          } else {
            setTimeout(() => {
              retries--
              retry(options, retries)
            }, delay)
          }
        })
    }
    return retry(options, retries)
  })
}

const createRequest = (input, callback) => {
  let url = 'https://apilayer.net/api/'
  const endpoint = input.data.endpoint || 'convert'
  url = url + endpoint

  const date = input.data.date || ''
  const from = input.data.from || ''
  const to = input.data.to || ''
  let amount = input.data.amount || ''
  if (endpoint == 'convert' && amount == '') {
    amount = 1
  }
  const start_date = input.data.start_date || ''
  const end_date = input.data.end_date || ''
  const currencies = input.data.currencies || ''
  const source = input.data.source || ''

  let queryObj = {
    date: date,
    from: from,
    to: to,
    amount: amount,
    start_date: start_date,
    end_date: end_date,
    currencies: currencies,
    source: source,
    access_key: process.env.API_KEY
  }
  for (let key in queryObj) {
    if (queryObj[key] === '') {
      delete queryObj[key]
    }
  }

  const options = {
    url: url,
    qs: queryObj,
    json: true,
    resolveWithFullResponse: true
  }
  requestRetry(options, retries)
    .then(response => {
      const result = response.body.result
      callback(response.statusCode, {
        jobRunID: input.id,
        data: response.body,
        result,
        statusCode: response.statusCode
      })
    })
    .catch(error => {
      callback(error.statusCode, {
        jobRunID: input.id,
        status: 'errored',
        error,
        statusCode: error.statusCode
      })
    })
}

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

module.exports.createRequest = createRequest
