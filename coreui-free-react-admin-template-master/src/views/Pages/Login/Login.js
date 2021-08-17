import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios'
import { history } from '../../../history'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { URL_login } from '../../../services/loginService'
import swal from 'sweetalert';

class Login extends Component {

  render() {
    const DADOS_CRIPTOGRAFAR = {
      algoritmo: "aes256",
      codificacao: "utf8",
      segredo: "chaves",
      tipo: "hex"
    };

    function descriptografar(senha) {
      const crypto = require("crypto");
      const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
      decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
      return decipher.final();
    };

    const handleSubmit = values => {
      localStorage.setItem('app-token', '2522')
      history.push('/dashboard')
      // const map = {
      //   password: values.password,
      //   email: values.email
      // }

      // axios.post(`${URL_login}/login`, map)
      //   .then(resp => {
      //     const { data } = resp
      //     if (data) {
      //      
      //       const password = descriptografar(data.password)
      //      
      //       if (data.password == map.password) {
      //         localStorage.setItem('app-token', data.token)
      //         history.push('/dashboard')
      //       }
      //       else {
      //         alert("Senha Incorreta!", { icon: "warning" })
      //       }
      //     }
      //     else {
      //       alert('Usuário e senha incorreto!')
      //     }
      //   })
    }

    const validations = yup.object().shape({
      email: yup.string().email().required("email"),
      password: yup.string().min(3).required("senha")
    });

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody >
                    <Formik
                      initialValues={{}}
                      onSubmit={handleSubmit}
                    // validationSchema={validations}
                    >
                      <Form >
                        <h1>Login</h1>
                        <p className="text-muted">Faça login em sua conta</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field className="form-control" name="email" placeholder="Email" autoComplete="username" />
                          <ErrorMessage
                            component="span"
                            name="email"
                            className="Login-Error"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field name="password" className="form-control" placeholder="Password" type="password" autoComplete="current-password" />
                          <ErrorMessage
                            component="span"
                            name="password"
                            className="Login-Error"
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button color="primary" type="submit" className="px-4">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Esqueceu a senha?</Button>
                          </Col>
                        </Row>
                      </Form>
                    </Formik>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Registre-se</h2>
                      <p>Antes de se inscrever verifique o ID do contratante!</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Novo Registro!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
