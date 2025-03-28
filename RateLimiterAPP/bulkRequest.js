const axios = require('axios');

async function sendRequests() {
    for (let i = 0; i < 150; i++) {
        try {
            const res = await axios.post('http://localhost:5500/limit/register', {
                empName: `User${i}`,
                emp_id: `${i}`,
                role: "Tester"
            });
            console.log(`Request ${i} Success:`, res.data);
        } catch (error) {
            console.error(`Request ${i} Failed:`, error.response?.data || error.message);
        }
    }
}

sendRequests();
