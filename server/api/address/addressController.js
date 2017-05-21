const request = require('request');
const _ = require('lodash');

exports.get = (req, res) => {
  const url = `https://blockchain.info/address/${req.params.addressHash}?format=json`;
  request(url, (error, response, body) => {
    if (error || response.statusCode === 500) {
      res.sendStatus(500);
    } else {
      const transactions = [];
      _.map(JSON.parse(body).txs, ({ result, inputs, out, block_height, hash }) => {
        transactions.push({
          total: result,
          inputs,
          outputs: out,
          block_height,
          hash
        });
      });
      res.send(transactions);
    }
  });
};
