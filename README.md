# Chainlink CurrencyLayer External Adapter

## Input Params:

- `endpoint`: Required to specify which endpoint of the API to call
- `date`: Specify the date. Required for the historical endpoint ("YYYY-MM-DD").
- `from`: Specify the currency to convert from. Required for the convert endpoint.
- `to`: Specify the currency to convert to. Required for the convert endpoint.
- `amount`: Specify the amount to convert. Required for the convert endpoint.
- `start_date`: Specify a start date for the range of the timeframe endpoint ("YYYY-MM-DD").
- `end_date`: Specify an end date for the range of the timeframe endpoint ("YYYY-MM-DD").
- `source`: The source currency (defaults to USD if unspecified).
- `currencies`: A comma-delimited list of currencies to query.

## Output

See the [official documentation](https://currencylayer.com/documentation) for the API's response output since it varies based on the endpoint.

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Create the zip

```bash
zip -r cl-currencylayer.zip .
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-currencylayer.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-currencylayer.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key