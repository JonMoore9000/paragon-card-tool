const express = require('express');
const app = express();
const request = require('superagent');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/cards', (req, res) => {
request
  .get('https://developer-paragon.epicgames.com/v1/cards/complete')
  .set('X-Epic-ApiKey', 'e5f6ebdd3c1e4fd6988d1e5fa90d9ecd')
  .set('Accept', 'application/json')
  .end(function(err, apiRes) {
  		res.json(apiRes.body);
  });
});

app.listen(process.env.PORT || 8080, () => console.log(
	`Your app is listening on port ${process.env.PORT || 8080}`)
);