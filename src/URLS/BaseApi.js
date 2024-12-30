const ENV = process.env.NODE_ENV;

const BaseApi = {
    local: {
        baseUrl: 'http://localhost:8085',
    },
    development: {
        baseUrl: 'http://localhost:8085',
    },
    production: {
        baseUrl: 'https://api.example.com',
    },
};

export default BaseApi.local;
