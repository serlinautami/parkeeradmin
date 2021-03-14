import { API } from '../../configs';

/**
 * ========================================================
 * PARKING TYPE
 * ========================================================
 */

export const getParkingTypes = async () => {
  try {
    const response = await API.parkingType();

    if(!response || !response.data) {
      throw response;
    }
    const { data } = response;
    return data;
  } catch (err) {
    console.log('getParkingTypes error:', err);
    throw err;
  }
}


export const addParkingType = async (form) => {
  try {
    const payload = {
      body: { ...form }
    }
    const response = await API.addParkingType(payload);
    return response;
  } catch (err) {
    console.log('addParkingType error:', err);
    throw err;
  }
}


export const updateParkingType = async (id, form) => {
  try {
    const payload = {
      path: id,
      body: { ...form }
    }
    const response = await API.updateParkingType(payload);
    return response;
  } catch (err) {
    console.log('updateParkingType error:', err);
    throw err;
  }
}

export const deleteParkingType = async (id) => {
  try {
    const payload = {
      path: id
    }
    const response = await API.deleteParkingType(payload);
    return response;
  } catch (err) {
    console.log('deleteParkingType error:', err);
    throw err;
  }
}


/**
 * ========================================================
 * VEHICLE TYPE
 * ========================================================
 */

export const getVehicleTypes = async () => {
  try {
    const response = await API.vehicleType();

    if(!response || !response.data) {
      throw response;
    }

    const { data } = response;

    return data;
  } catch (err) {
    console.log('getVehicleType error:', err);
    throw err;
  }
}


export const addVehicleType = async (form) => {
  try {
    const payload = {
      body: {...form}
    }
    const response = await API.addVehicleType(payload);
    return response;
  } catch (err) {
    console.log('createVehicleType error:', err);
    throw err;
  }
}


export const updateVehicleType = async (id, form) => {
  try {
    const payload = {
      path: id,
      body: {...form}
    }
    const response = await API.updateVehicleType(payload)
    return response;
  } catch (err) {
    console.log('updateVehicleType error:', err);
    throw err;
  }
}


export const deleteVehicleType = async (id) => {
  try {
    const payload = {
      path: id
    }
    const response = await API.deleteVehicleType(payload);
    return response;
  } catch (err) {
    console.log('deleteVehicleType error:', err);
    throw err;
  }
}


/**
 * ========================================================
 * MEMBER ADMIN
 * ========================================================
 */

export const getMemberAdmin = async () => {
  try {
    const response = await API.memberAdmin();
    if(!response || !response.data) {
      throw response;
    }
    const { data } = response;
    return data;
  } catch (err) {
    console.log('getMemberAdmin error:', err);
  }
}

export const addMemberAdmin = async (form) => {
  try {
    const payload = {
      body: {...form}
    }
    const response = await API.createMemberAdmin(payload);
    return response;
  } catch (err) {
    console.log('addMemberAdmin error:', err);
    throw err;
  }
}

export const updateMemberAdmin = async (id, form) => {
  try {
    const payload = {
      path: id,
      body: {
        ...form
      }
    }
    const response = await API.updateMemberAdmin(payload);
    return response;
  } catch (err) {
    console.log('updateMemberAdmin error:', err);
    throw err;
  }
}

export const deleteMemberAdmin = async (id) => {
  try {
    const payload = {
      path: id
    }
    const response = await API.deleteMemberAdmin(payload);

    return response;
  } catch (err) {
    console.log('deleteMemberAdmin error:', err);
    throw err;
  }
}