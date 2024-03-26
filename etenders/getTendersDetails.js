const axios = require('axios');
const xml2js = require('xml2js');
const parser = new xml2js.Parser(); // Create a new xml2js parser instance

async function getTenderDetails(req, res) {
    const { id: workItemId } = req.params; // Assuming the work item ID is passed as a query parameter

    const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mob="http://mobile.webservices.nic.gov">
        <soapenv:Header/>
        <soapenv:Body>
            <mob:getTenderDetailsByWorkItemId>
                <mob:workItemId>${workItemId}</mob:workItemId>
            </mob:getTenderDetailsByWorkItemId>
        </soapenv:Body>
    </soapenv:Envelope>`;

    const config = {
        method: 'post',
        url: 'https://etenders.hry.nic.in/nicgep_mobile_webservice/services/EprocMobileServices',
        headers: {
            'Content-Type': 'text/xml'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        // Use xml2js to parse the response data
        parser.parseString(response.data, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                res.status(500).send('Error parsing XML response');
                return;
            }

            const rawTenderDetails = result['soapenv:Envelope']['soapenv:Body'][0]['ns:getTenderDetailsByWorkItemIdResponse'][0]['ns:return'];

            // Check if rawTenderDetails exists
            if (rawTenderDetails) {
                // rawTenderDetails might be wrapped in an array, and the actual XML might be the first element
                const tenderDetailsXml = rawTenderDetails[0];

                // Parse the nested XML in tenderDetailsXml
                parser.parseString(tenderDetailsXml, (nestedErr, nestedResult) => {
                    if (nestedErr) {
                        console.error('Error parsing nested XML:', nestedErr);
                        res.status(500).send('Error parsing nested XML in tender details');
                        return;
                    }

                    // Send the further parsed tender details
                    res.json(nestedResult);
                });
            } else {
                res.status(404).send('Tender details not found');
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tender details');
    }
}

module.exports = getTenderDetails;
