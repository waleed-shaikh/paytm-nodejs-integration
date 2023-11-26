const PaytmChecksum = require('paytmchecksum');
const express = require('express');
const router = express();

//production api details
var mid = "RtZYvX44163568075252"
var key = "4vnQO9l9aHZzM1X%"

router.post('/callback', async (req, res) => {
    try {
        console.log(req.body)
        const {ORDERID, RESPMSG} = req.body

        var paytmChecksum = req.body.CHECKSUMHASH;
        delete req.body.CHECKSUMHASH;
    
        var isVerifySignature = PaytmChecksum.verifySignature(req.body, key, paytmChecksum);
        
        if (isVerifySignature) {
            console.log("Checksum Matched");
            if(req.body.STATUS === "TXN_SUCCESS"){
                return res.redirect(`http://localhost:3000/success?orderId=${ORDERID}&message=${RESPMSG}`);
            } else{
                return res.redirect(`http://localhost:3000/failure?orderId=${ORDERID}&message=${RESPMSG}`);
            }
        } else {
            console.log("Checksum Mismatched");
            return res.send("something went wrong")
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/payment", (req, res) => {
    const {amount, email} = req.body
    const totalAmount = JSON.stringify(amount);

    var orderId = `ORDERID_${Date.now()}`
    var custId = `CUST_${Date.now()}`
    var params = {};
  
    /* initialize an array */
    (params["MID"] = mid),
    (params["WEBSITE"] = "DEFAULT"),
    (params["CHANNEL_ID"] = "WEB"),
    (params["INDUSTRY_TYPE_ID"] = "Retail"),
    (params["ORDER_ID"] = orderId),
    (params["CUST_ID"] = custId),
    (params["TXN_AMOUNT"] = totalAmount),
    (params["CALLBACK_URL"] = "http://localhost:5000/api/callback"),
    (params["EMAIL"] = email),
    (params["MOBILE_NO"] = "7498608775");
  
    /**
     * Generate checksum by parameters we have
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    var paytmChecksum = PaytmChecksum.generateSignature(
      params,
      key
    );
    paytmChecksum
      .then(function (checksum) {
        let paytmParams = {
          ...params,
          CHECKSUMHASH: checksum,
        };
        res.json(paytmParams);
      })
      .catch(function (error) {
        console.log(error);
      });
  });


module.exports = router
