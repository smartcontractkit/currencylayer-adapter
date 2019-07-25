const request = require('request');

const createRequest = (input, callback) => {
  let url = "http://apilayer.net/api/";
  const endpoint = input.data.endpoint || "";
  url = url + endpoint;

  const date = input.data.date || "";
  const from = input.data.from || "";
  const to = input.data.to || "";
  const amount = input.data.amount || "";
  const start_date = input.data.start_date || "";
  const end_date = input.data.end_date || "";
  const currencies = input.data.currencies || "";
  const source = input.data.source || "";

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
    if (queryObj[key] === "") {
      delete queryObj[key];
    }
  }

  const options = {
    url: url,
    qs: queryObj,
    json: true
  }
  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400 || body.success == false) {
      callback(response.statusCode, {
        jobRunID: input.id,
        status: "errored",
        error: body,
        statusCode: response.statusCode
      });
    } else {
      callback(response.statusCode, {
        jobRunID: input.id,
        data: body,
        statusCode: response.statusCode
      });
    }
  });
};

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
}

module.exports.createRequest = createRequest;