const BASE_URL = 'http://localhost:3001'

const API = {
    getAddressData(address: string) {
        return fetch(`${BASE_URL}/api/nft/${address}`);
    },
};

export default API;