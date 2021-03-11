import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, FormGroup, Table, Modal, ModalBody, ModalHeader, ModalFooter, Input, Form, Label } from 'reactstrap';
import { API } from '../../configs';
import { useForm } from '../../utils';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

const Customer = () => {


  return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Daftar Kustomer Parkir</strong>
          </CardHeader>
          <CardBody>
          </CardBody>
        </Card>
      </div>
  )
}


export default Customer;