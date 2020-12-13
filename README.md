# Weather Service Lambda Application

An AWS Lamba REST function designed to query weather information by 
city and country, using the OpenWeatherMap API as the Base URL.

## Query Instructions

- Base URL: https://fghdz5u6jh.execute-api.us-east-1.amazonaws.com/prod/weather
- Query URL Format: https://fghdz5u6jh.execute-api.us-east-1.amazonaws.com/prod/weather?city={city}&country_code={country_code} 
- Query URL Example (Austin,Texas,USA): https://fghdz5u6jh.execute-api.us-east-1.amazonaws.com/prod/weather?city=Austin&country_code=US
- Query Reference: https://openweathermap.org/current#name

### Design

Language(s):

- Node.js

Tools:

- AWS Lambda
- AWS IAM
- openweathermap.org API
- Serverless Framework
- Mocha

Dependencies:

- babel-core: 6.26.3
- chai: 4.1.2
- chai-http: 4.0.0
- mocha: 5.2.0
- node-fetch: 2.1.2
- dotenv: 6.0.0

### AWS Settings

#### AWS Lamba Function Settings (Amazon API Gateway):

-- Method Request (GET):
   * URL Query String Parameters (Name): city, country_code
   * Required Check-box: True (Both Parameters)

-- Integration Request (GET):
   * URL Query String Parameters (Name): city, country_code
   * Mapped from: method.request.querystring.city,
                  method.request.querystring.country_code 	 

#### AWS Lambda Function User Settings (IAM):

- AWSLambdaFullAccess
- AdministratorAccess
- CloudWatchLogsFullAccess
- AmazonAPIGatewayAdministrator     

### Testing Instructions:


#### Unit Test(s):

- Change Directory: service
- Command: npm test

### Servierless Build Instructions (Test):

- AWS Login Credentials
- Change Directory: service
- Command: npm test

### Author

- Christopher S. Powell

