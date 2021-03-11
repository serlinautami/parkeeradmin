import { appActiveConfig } from '../appConfig';

// api endpoint list
const apiEndpoint = {
  // authentication
  login: `${appActiveConfig.api.baseUrl}/api/admin/login`,
  profile: `${appActiveConfig.api.baseUrl}/api/admin/profile`,
  jenisParkir: `${appActiveConfig.api.baseUrl}/api/admin/jenis-parkir`,
  customer: `${appActiveConfig.api.baseUrl}/api/admin/customer`,
};

export { apiEndpoint };
