const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const getTenderDetails = require('./getTendersDetails');
const parser = new xml2js.Parser();
const cors = require('cors'); // Require the cors package
const app = express();
const port = 3000; // You can choose any port you prefer

app.use(cors());
app.get('/getTenders', (req, res) => {
    let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mob="http://mobile.webservices.nic.gov">\r\n    <soapenv:Header/>\r\n    <soapenv:Body>\r\n        <mob:getTendersOpeningTodayForGeneralUsers>\r\n            <!--Optional:-->\r\n            <mob:pageOffsetValue>0</mob:pageOffsetValue>\r\n        </mob:getTendersOpeningTodayForGeneralUsers>\r\n    </soapenv:Body>\r\n</soapenv:Envelope>';

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://etenders.hry.nic.in/nicgep_mobile_webservice/services/EprocMobileServices',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Content-Length': '334',
            'Host': 'etenders.hry.nic.in',
            'Content-Type': 'text/xml', // This is typically not required when making requests, as the Host header is set automatically by the HTTP client.
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Android SDK built for x86_64 Build/TE1A.220922.034; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/101.0.4951.61 Mobile Safari/537.36',
            'X-Requested-With': 'gov.nic.eproc'
        },
        data: data
    };


    axios.request(config)
        .then((response) => {
            parser.parseString(response.data, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err.message);
                    res.status(500).send('Error parsing XML');
                } else {
                    // Assuming 'soapenv' and 'ns' are replaced with the actual namespaces defined in your XML
                    let parsedData = result['soapenv:Envelope']['soapenv:Body'][0]['ns:getTendersOpeningTodayForGeneralUsersResponse'][0]['ns:return'];
                    // Assuming parsedData is a string containing XML
                    parser.parseString(parsedData, (err, furtherParsedResult) => {
                        if (err) {
                            console.error('Error parsing nested XML:', err.message);
                            // Handle error...
                        } else {
                            // furtherParsedResult now contains the JavaScript object representation of the nested XML
                            res.json(furtherParsedResult);
                        }
                    });

                }
            });

        })
        .catch((error) => {
            console.error(error.message);
            res.status(500).send('Error making SOAP request');
        });
});


app.get('/api/tenderDetails/:id', getTenderDetails);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
