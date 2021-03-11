import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, FormGroup, Table, Modal, ModalBody, ModalHeader, ModalFooter, Input, Form, Label } from 'reactstrap';
import { API } from '../../configs';
import { useForm } from '../../utils';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

const Customer = () => {

  const [customers, setCustomer] = useState([]);

  const getInitialData = async () => {
    try { 
      const response = await API.customer();

      if(response.data) {
        setCustomer(response.data);
      }
    } catch(err) {
      toast.error('server errror')
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
            <Table responsive hover bordered>
              <thead className="bg-primary">
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Bergabung pada</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
  )
}


export default Customer;