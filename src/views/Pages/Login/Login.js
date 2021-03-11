import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { API } from '../../../configs';
import { toast } from 'react-toastify';

const Login = ({ history, location }) => {
  console.log('history', history, location)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    color: '',
    message: '',
  })

  const handleToggleAlert = () => setAlert(prev => ({...prev, visible: !prev.visible }))


  const handleGetProfile = async () => {

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
      throw err;
    }
  }

  const handleSumbit = async (e) => {
    if(e) e.preventDefault();

    if(!email || !password) {
      return setAlert({
        visible: true,
        message: 'Kolom harus diisi semua',
        color: 'danger'
      })
    }

    try {
      const response = await API.login({ body: { email, password }})

      if(!response || !response.data) {
        return setAlert({
          visible: true,
          message: 'Terjadi Kesalahan',
          color: 'danger'
        })
      }

      const { data } = response;
      const authData = JSON.stringify(data);
      localStorage.setItem('authData', authData);
      await handleGetProfile();
      toast.success('Login Berhasil')
      setAlert({
        visible: true,
        message: 'Login Berhasil',
        color: 'success',
      })
      setTimeout(() => {
        history.replace('/dashboard')
      }, 1000)

    } catch (err) {
      console.log('login error:', err)
      setAlert({
        visible: true,
        message: err?.message || 'Terjadi kesalahan',
        color: 'danger'
      })
    }

    API.login({
      body: {
        email,
        password
      }
    }).then(response => {
      if(!response || !response.data) {
        return setAlert({
          visible: true,
          message: 'Terjadi Kesalahan',
          color: 'danger'
        })
      }

      setAlert({
        visible: true,
        message: 'Login Berhasil',
        color: 'success',
      })

      const { data } = response;
      const authData = JSON.stringify(data);
      localStorage.setItem('authData', authData);
      setTimeout(() => {
        history.replace('/dashboard')
      }, 1000)

    }).catch(error => {
      console.log('login error:', error)
      setAlert({
        visible: true,
        message: error?.message || 'Terjadi kesalahan',
        color: 'danger'
      })
    })
  }


  const removeSessionOfUser = () => {
    localStorage.clear();
  }


  useEffect(() => {
    removeSessionOfUser();
  }, [])
  

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSumbit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                      <Alert color={alert.color} isOpen={alert.visible} toggle={handleToggleAlert} >
                        {alert.message}
                      </Alert>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" onChange={e => setEmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
