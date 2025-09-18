const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { parseStringPromise } = require('xml2js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdW5pdmVyc2l0eV91c3IiLCJpYXQiOjE3MzMyMDEzNTYsImFwcHMiOiJkYXRhcHVzaCJ9.Uunf-ngMOupOegtYTyESnWj41uzvJ4pZ5XWIYPvKJvtC-RMiPNMV0NJKpGjBtgRGfY-4-cgYJ4kq5D8Kmq5_7A"

let token = ""; // Global variable to store the token

// Function to fetch the token
const fetchToken = async () => {
    try {
        const response = await axios.post(
            'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/user/login',
            {
                // Replace with the required credentials for login
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
            },
            {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                timeout: 10000,
            }
        );
        token = response.data.token; // Update the token
        console.log('Token fetched successfully:', token);
    } catch (error) {
        console.error('Failed to fetch token:', error.message);
    }
};

// Fetch the token initially
fetchToken();

// Set an interval to refresh the token every hour (3600000ms)
setInterval(fetchToken, 3600000);



app.post('/api/verify', async (req, res) => {
    try {
        const { dlnumber, dob } = req.body;
        const response = await axios.post(
            'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/SARATHI/01',
            { dlnumber, dob },
            {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                timeout: 10000,
            }
        );
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error details:", error.toJSON());
        console.error(error.message);
        res.status(500).send('Error occurred');
    }
});

app.post('/api/verify/carbon', async (req, res) => {
    try {
        const { distance, weight = "218.6", tripCount="1" } = req.body;
        const response = await axios.post(
            'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/CARBON/01',
            { distance, weight, tripCount },
            {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                timeout: 10000,
            }
        );
        console.log(response.data);
        res.json(response.data.response[0].response);
    } catch (error) {
        console.error("Error details:", error.toJSON());
        console.error(error.message);
        res.status(500).send('Error occurred');
    }
});

app.post('/api/verify/gati', async (req, res) => {
    try {
        const { stateid } = req.body;
        const response = await axios.post(
            'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/GATISHAKTI/04',
            { stateid},
            {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                timeout: 10000,
            }
        );
        console.log(response.data);
        res.json(response.data.response[0].response);
    } catch (error) {
        console.error("Error details:", error.toJSON());
        console.error(error.message);
        res.status(500).send('Error occurred');
    }
});

app.post('/api/verify/vahaan', async (req, res) => {
    try {
        const { vehiclenumber } = req.body;
        console.log(vehiclenumber);
        const response = await axios.post(
            'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/VAHAN/01',
            { vehiclenumber },
            {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                timeout: 10000,
            }
        );
        const xmlResponse = response.data.response[0].response;

        // Parse XML response
        const jsonResponse = await parseStringPromise(xmlResponse, { explicitArray: false });

        // Extract required fields
        const vehicleDetails = jsonResponse.VehicleDetails;
        const extractedData = {
            rc_regn_no: vehicleDetails.rc_regn_no,
            rc_regn_dt: vehicleDetails.rc_regn_dt,
            rc_regn_upto: vehicleDetails.rc_regn_upto,
            rc_owner_name: vehicleDetails.rc_owner_name,
            state_cd: vehicleDetails.state_cd,
            rto_cd: vehicleDetails.rto_cd,
            rc_chasi_no: vehicleDetails.rc_chasi_no,
            rc_eng_no: vehicleDetails.rc_eng_no,
            rc_maker_desc: vehicleDetails.rc_maker_desc,
            rc_insurance_policy_no: vehicleDetails.rc_insurance_policy_no,
            rc_insurance_upto: vehicleDetails.rc_insurance_upto,
            rc_registered_at: vehicleDetails.rc_registered_at,
            rc_status: vehicleDetails.rc_status,
            rc_vch_catg_desc: vehicleDetails.rc_vch_catg_desc,
        };

        res.json(extractedData);
    } catch (error) {
        // console.error("Error details:", error.toJSON());
        console.error(error.message);
        res.status(500).send('Error occurred');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
