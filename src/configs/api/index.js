import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};

// Authentication
API.login = apiRequest.post(apiEndpoint.login);
API.profile = apiRequest.get(apiEndpoint.profile, true);
API.jenisParkir = apiRequest.get(apiEndpoint.jenisParkir, true);
API.tambahJenisParkir = apiRequest.post(apiEndpoint.jenisParkir, true);
API.updateJenisParkir = apiRequest.put(apiEndpoint.jenisParkir, true);
API.deleteJenisParkir = apiRequest.delete(apiEndpoint.jenisParkir, true);

API.customer = apiRequest.get(apiEndpoint.customer, true);

export default API;
