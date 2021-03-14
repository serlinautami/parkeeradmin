import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  // authentication
  login: `${appActiveConfig.api.baseUrl}/api/admin/login`,
  profile: `${appActiveConfig.api.baseUrl}/api/admin/profile`,
  parkingType: `${appActiveConfig.api.baseUrl}/api/admin/parking-type`,
  vehicleType: `${appActiveConfig.api.baseUrl}/api/admin/vehicle-type`,
  customer: `${appActiveConfig.api.baseUrl}/api/admin/customer`,
  memberAdmin: `${appActiveConfig.api.baseUrl}/api/admin/member-admin`
};

export { apiEndpoint };
