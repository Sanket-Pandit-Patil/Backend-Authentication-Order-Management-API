const http = require('http');

const makeRequest = (method, path, data, token) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const runTests = async () => {
    try {
        const testUser = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'password123',
        };

        console.log('--- Register User ---');
        const registerRes = await makeRequest('POST', '/api/register', testUser);
        console.log('Status:', registerRes.status);
        console.log('Data:', registerRes.data);

        console.log('\n--- Login User ---');
        const loginRes = await makeRequest('POST', '/api/login', {
            email: testUser.email,
            password: testUser.password,
        });
        console.log('Status:', loginRes.status);
        console.log('Token:', loginRes.data.token ? 'Received' : 'Missing');
        const token = loginRes.data.token;

        if (!token) {
            throw new Error('No token received, stopping tests.');
        }

        console.log('\n--- Get Profile ---');
        const profileRes = await makeRequest('GET', '/api/profile', null, token);
        console.log('Status:', profileRes.status);
        console.log('Data:', profileRes.data);

        console.log('\n--- Create Order ---');
        const orderRes = await makeRequest('POST', '/api/order', {
            product_name: 'Laptop',
            quantity: 1,
        }, token);
        console.log('Status:', orderRes.status);
        console.log('Data:', orderRes.data);

        console.log('\n--- List Orders ---');
        const listRes = await makeRequest('GET', '/api/orders', null, token);
        console.log('Status:', listRes.status);
        console.log('Data:', listRes.data);

        console.log('\n--- Verification Complete ---');
    } catch (error) {
        console.error('Test Failed:', error);
    }
};

runTests();
