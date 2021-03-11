import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, FormGroup, Table, Modal, ModalBody, ModalHeader, ModalFooter, Input, Form, Label } from 'reactstrap';
import { API } from '../../configs';
import { useForm } from '../../utils';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

const JenisParkir = () => {

  const [isLoading, setLoading] = useState(false);
  const [daftarJenisParkir, setDaftarJenisParkir] = useState([]);
  const [showModal, setModal] = useState(false);
  const [form, setForm] = useForm({
    name: '',
    biaya: ''
  });


  const getInitialData = async () => {
    try {
      setLoading(true)
      const response = await API.jenisParkir();
      setLoading(false)

      if(response.data) {
        setDaftarJenisParkir(response.data);
      }


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
      biaya: item.biaya
    }, 'multiple')

    handleOpenModal();
  }


  const handlePressDelete = async (item) => {
    const id = item?.id;

    if(id) {
      const conf = window.confirm(`Ingin menghapus ${item.name} dari daftar`);
      if(conf) {
        try {
          const res = await API.deleteJenisParkir({
            path: id
          })

          toast.success(res.message || 'Sukses')

          return getInitialData();

        } catch (err) {
          toast.error(err?.message || 'Terjadi Kesalahan')
        }
      }
    }

  }

  const renderBiaya = value => {
    return <NumberFormat value={value} displayType="text" thousandSeparator="." decimalSeparator="," prefix={'Rp. '} /> 
  }

  const handleSubmitForm = async event => {

    if(event) event.preventDefault();
    try {
      const payload = {
        body: {
          name: form.name,
          biaya: form.biaya
        },
        ...(form.id && { path: form.id })
      }

      const response = form.id ? await API.updateJenisParkir(payload) : await API.tambahJenisParkir(payload);
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
                {daftarJenisParkir.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{renderBiaya(item.biaya)}</td>
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
              <h5><strong>Form Jenis Parkir</strong></h5>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Nama Parkir</Label>
                <Input value={form.name} type="text" placeholder="ex: Parkir motor" onChange={e => setForm(e.target.value, 'name')} />
              </FormGroup>
              <FormGroup>
                <Label>Biaya</Label>
                <Input min={0} value={form.biaya} type="number" placeholder="0" onChange={e => setForm(e.target.value, 'biaya')} />
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