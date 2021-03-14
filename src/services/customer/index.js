import { API } from '../../configs';

export const getCustomers = async () => {
  try {
    const response = await API.customer();
    if(!response || !response.data) {
      throw response;
    }
    const { data } = response;

    return data;
  } catch (err) {
    console.log('getCustomers error:', err);
    throw err;
  }
}