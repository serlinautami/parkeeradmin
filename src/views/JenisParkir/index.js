import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, FormGroup, Table, Modal, ModalBody, ModalHeader, ModalFooter, Input, Form, Label } from 'reactstrap';
import { API } from '../../configs';
import { useForm } from '../../utils';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { getParkingTypes, addParkingType, updateParkingType, deleteParkingType, getVehicleTypes } from '../../services';

import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const JenisParkir = () => {

  const [isLoading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleType] = useState([]);
  const [parkingTypes, setParkingType] = useState([]);
  const [showModal, setModal] = useState(false);
  const [form, setForm] = useForm({
    name: '',
    fee: '',
    list: []
  });


  const getInitialData = async () => {
    try {
      setLoading(true);
      const parkingTypeList = await getParkingTypes();
      const vehicleTypeList = await getVehicleTypes();

      setLoading(false);
      setParkingType(parkingTypeList);
      setVehicleType(vehicleTypeList);
      return parkingTypeList;
    } catch (err) {
      setLoading(true);
      console.log('getInitialData err', err);
    }
  }

  const handleOpenModal = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setForm(null, 'reset')
    setModal(false)
  }

  const handlePressEdit = (item) => {
    let list = [];
    const parkingVehicleList = item.parking_vehicle_lists;

    if(parkingVehicleList) {
      list = parkingVehicleList.map(val => ({
        id: val?.vehicle_type?.id,
        name: val?.vehicle_type?.name
      }))
    }
    setForm({
      id: item.id,
      name: item.name,
      fee: item.fee,
      list
    }, 'multiple')

    handleOpenModal();
  }


  const handlePressDelete = async (item) => {
    const id = item?.id;

    if(id) {
      const conf = window.confirm(`Ingin menghapus ${item.name} dari daftar`);
      if(conf) {
        try {
          const res = await deleteParkingType(id);

          toast.success(res.message || 'Sukses')

          return getInitialData();

        } catch (err) {
          toast.error(err?.message || 'Terjadi Kesalahan')
        }
      }
    }

  }

  const handleSelectChange = value => {
    setForm(value, 'list');
  }

  const renderBiaya = value => {
    return <NumberFormat value={value} displayType="text" thousandSeparator="." decimalSeparator="," prefix={'Rp. '} /> 
  }

  const handleSubmitForm = async event => {
    if(event) event.preventDefault();
    

    try {



      const payload = {
        name: form.name,
        fee: form.fee
      }

      if(form?.list?.length > 0) {
        payload.vehicle_list = form.list.map(item => item.id);
      }

      const response = form.id ? await updateParkingType(form.id, payload) : await addParkingType(payload);
      toast.success(response.message || 'Sukses');
      handleCloseModal();
      return getInitialData();
    } catch (err) {
      toast.error(err?.message || 'Terjadi Kesalahan')
    }
  }
    

  useEffect(() => {
    getInitialData()
  }, [])


  return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Daftar Jenis Parkir</strong>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Button onClick={handleOpenModal} color="primary">Tambah Jenis Parkir</Button>
            </FormGroup>
            <Table bordered hover responsive>
              <thead className="bg-primary">
                <tr>
                  <th>Nama</th>
                  <th>Biaya</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {parkingTypes.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{renderBiaya(item.fee)}</td>
                      <td className="text-right">
                        <Button onClick={() => handlePressEdit(item)} className="ml-2" color="primary" size="sm">Edit</Button>
                        <Button onClick={() => handlePressDelete(item)} className="ml-2" color="danger" size="sm">Hapus</Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Modal isOpen={showModal}>
          <Form onSubmit={handleSubmitForm}>
            <ModalHeader toggle={handleCloseModal}>
              Form Jenis Parkir
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Nama Parkir</Label>
                <Input value={form.name} type="text" placeholder="ex: Parkir motor" onChange={e => setForm(e.target.value, 'name')} />
              </FormGroup>
              <FormGroup>
                <Label>Biaya</Label>
                <Input min={0} value={form.fee} type="number" placeholder="0" onChange={e => setForm(e.target.value, 'fee')} />
              </FormGroup>
              <FormGroup>
                <Label>Jenis Kendaraan</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                  onChange={handleSelectChange}
                  value={form.list}
                  isMulti
                  options={vehicleTypes}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" >Simpan</Button>
              <Button type="button" onClick={handleCloseModal}  color="secondary" >Batal</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
  )
}


export default JenisParkir;