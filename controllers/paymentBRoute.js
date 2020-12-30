var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "bmfn8xfc5hsz39gf",
  publicKey: "53cntj7gmgq3qfj3",
  privateKey: "638eb00055252a1da5cb1c92a60362d5",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      return res.status(400).json(Error);
    } else {
      return res.status(200).json(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.nonceFromTheClient;
  let amountFromTheClient = req.body.amount;
  let { fname, lname, address, landmark, postalCode } = req.body.shippingInfo;
  let ShippingInfo = {
    firstName: fname,
    lastName: lname,
    streetAddress: address,
    locality: landmark,
    postalCode: postalCode,
  };
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      shipping: ShippingInfo,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        return res.status(400).json(Error);
      } else {
        return res.status(200).json(result);
      }
    }
  );
};
