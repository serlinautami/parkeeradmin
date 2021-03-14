import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};

// Authentication
API.login = apiRequest.post(apiEndpoint.login);
API.profile = apiRequest.get(apiEndpoint.profile, true);

// parking type
API.parkingType = apiRequest.get(apiEndpoint.parkingType, true);
API.addParkingType = apiRequest.post(apiEndpoint.parkingType, true);
API.updateParkingType = apiRequest.put(apiEndpoint.parkingType, true);
API.deleteParkingType = apiRequest.delete(apiEndpoint.parkingType, true);

// vehicle type
API.vehicleType = apiRequest.get(apiEndpoint.vehicleType, true);
API.addVehicleType = apiRequest.post(apiEndpoint.vehicleType, true);
API.updateVehicleType = apiRequest.put(apiEndpoint.vehicleType, true);
API.deleteVehicleType = apiRequest.delete(apiEndpoint.vehicleType, true);


// Customer
API.customer = apiRequest.get(apiEndpoint.customer, true);

// Member Admin
API.memberAdmin = apiRequest.get(apiEndpoint.memberAdmin, true);
API.createMemberAdmin = apiRequest.post(apiEndpoint.memberAdmin, true);
API.resetPasswordMemberAdmin = apiRequest.put(apiEndpoint.memberAdmin, true);
API.deleteMemberAdmin = apiRequest.delete(apiEndpoint.memberAdmin, true);

export default API;
