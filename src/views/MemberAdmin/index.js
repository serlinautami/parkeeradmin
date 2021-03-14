import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, FormGroup, Table, Modal, ModalBody, ModalHeader, ModalFooter, Input, Form, Label } from 'reactstrap';
import { API } from '../../configs';
import { useForm } from '../../utils';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getMemberAdmin, addMemberAdmin, updateMemberAdmin, deleteMemberAdmin } from '../../services';

const MemberAdmin = () => {

  const [admins, setAdmin] = useState([]);
  const [showModal, setModal] = useState(false);
  const [form, setForm] = useForm({
    name: '',
    email: ''
  })

  const getInitialData = async () => {
    try {
      const data = await getMemberAdmin();
      setAdmin(data);
    } catch(err) {
      toast.error('server errror')
    }
  }

  const handleOpenModal = () => {
    setModal(true);
  }

  const handleCloseModal = () => {
    setForm(null, 'reset');
    setModal(false);
  }

  const handleSubmit = async e => {
    try {
      if(e) e.preventDefault();

      if(!form.name || !form.email) {
        throw new Error('kolom nama dan email harus diisi')
      }

      const payload = {
        name: form.name,
        email: form.email,
      }

      const response =  await addMemberAdmin(payload);
      toast.success(response.message);
      getInitialData();
      return handleCloseModal();

    } catch (err) {
      toast.error(err?.message || 'terjadi kesalahan')
    }
  }

  useEffect(() => {
    getInitialData();
  }, [])

  return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Daftar Kustomer Parkir</strong>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Button color="primary" onClick={handleOpenModal}>Tambar Admin</Button>
            </FormGroup>
            <Table responsive hover bordered>
              <thead className="bg-primary">
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Bergabung pada</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{moment(item.createdAt).format('DD MMMM YYYY')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Modal isOpen={showModal}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={handleCloseModal}>
              Form Member Admin
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Nama Lengkap</Label>
                <Input onChange={e => setForm(e.target.value, 'name')} value={form.name} placeholder="Nama Lengkap" />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input onChange={e => setForm(e.target.value, 'email')} value={form.email} type="email" placeholder="email@mail.com" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success">Simpan</Button>
              <Button color="secondary" onClick={handleCloseModal}>Batal</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
  )
}


export default MemberAdmin;