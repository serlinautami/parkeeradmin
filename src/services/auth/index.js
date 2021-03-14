import { API } from '../../configs';

export const login = async (email, password) => {
  try {
    const payload = {
      body: { 
        email,
        password
       }
    }
    const response = await API.login(payload);
    const { data } = response;
    const authData = JSON.stringify(data);
    localStorage.setItem('authData', authData);
    return response;
  } catch (err) {
    console.log('login error:', err)
    throw err;
  }
}

export const getProfile = async () => {
  try {
    const response = await API.profile();
    if(!response || !response.data) {
      throw response;
    }
    const { data } = response;
    const userData = JSON.stringify(data);
    localStorage.setItem('userData', userData);
    return userData;
  } catch(err) {
    console.log('getProfile error:', err);
    throw err;
  }
}