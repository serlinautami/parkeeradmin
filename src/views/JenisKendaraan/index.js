import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, FormGroup, Table, Modal, ModalBody, ModalHeader, ModalFooter, Input, Form, Label } from 'reactstrap';
import { API } from '../../configs';
import { useForm } from '../../utils';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { getVehicleTypes, addVehicleType, updateVehicleType, deleteVehicleType } from '../../services';

const JenisKendaraan = () => {

  const [isLoading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleData] = useState([]);
  const [showModal, setModal] = useState(false);
  const [form, setForm] = useForm({
    name: ''
  });


  const getInitialData = async () => {
    try {
      setLoading(true)
      const data = await getVehicleTypes();
      setLoading(false)
      setVehicleData(data);
      return data;
    } catch (err) {
      setLoading(true)
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
    setForm({
      id: item.id,
      name: item.name,
    }, 'multiple')

    handleOpenModal();
  }


  const handlePressDelete = async (item) => {
    const id = item?.id;

    if(id) {
      const conf = window.confirm(`Ingin menghapus ${item.name} dari daftar`);
      if(conf) {
        try {
          const res = await deleteVehicleType(id)

          toast.success(res.message || 'Sukses')

          return getInitialData();

        } catch (err) {
          toast.error(err?.message)
        }
      }
    }

  }

  const handleSubmitForm = async event => {

    if(event) event.preventDefault();
    try {
      const payload = {
        name: form.name
      }

      const response = form.id ? await updateVehicleType(form.id, payload) : await addVehicleType(payload);
      toast.success(response.message);
      handleCloseModal();
      return getInitialData();
    } catch (err) {
      toast.error(err?.message)
    }
  }
    

  useEffect(() => {
    getInitialData()
  }, [])


  return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Daftar Jenis Kendaraan</strong>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Button onClick={handleOpenModal} color="primary">Tambah Jenis Kendaraan</Button>
            </FormGroup>
            <Table bordered hover responsive>
              <thead className="bg-primary">
                <tr>
                  <th>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {vehicleTypes.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
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
              Formulir
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Nama</Label>
                <Input value={form.name} type="text" placeholder="ex: Motor" onChange={e => setForm(e.target.value, 'name')} />
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


export default JenisKendaraan;