import API from '../api/requests'
import { Data } from '../api/responses/ZoraResponse'
import handleResponse, { APIResponse } from '../api/handleResponse'

const ZoraService = {
    async getAddressData(address: string): Promise<APIResponse<Data>> {
        const response = await API.getAddressData(address)
        return await handleResponse<Data>(response)
    },
}

export default ZoraService