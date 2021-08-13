import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ErrorMessage, Formik, Form, Field } from 'formik'
import axios from 'axios'
import { history } from '../../../history'
import * as yup from 'yup'
import { URL_login } from '../../../services/loginService'
import swal from 'sweetalert';

class Register extends Component {

  render() {
    const DADOS_CRIPTOGRAFAR = {
      algoritmo: "aes256",
      segredo: "chaves",
      tipo: "hex"
    };

    function criptografar(senha) {
      const crypto = require("crypto");
      const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
      cipher.update(senha);
      return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    };

    const handleSubmit = values => {
      const map = {
        name: values.firtName,
        email: values.email,
        password: criptografar(values.password),
        birthDate: new Date(),
        role: 'Admin',
        idCompany: values.idCompany
      }
      axios.post(URL_login, map)
        .then(resp => {
          const { data } = resp
          if (data) {
            swal("Cadastro efetuado com sucesso!", {
              icon: "success"
            })
          }
          else {
            swal("Cadastro não efetuado!", {
              icon: "warning"
            })
          }
        })
    }

    const validations = yup.object().shape({
      firtName: yup.string().min(4).required('Informe seu Primeiro nome, min 4 caracteres'),
      email: yup.string().email().required("Informe o Email"),
      password: yup.string().min(3).required("Informe a Senha, mínimo de 3 caracteres"),
      Confirmedpassword: yup.string().min(3).required('mínimo de 3 caracteres'),
      idCompany: yup.number().min(1).required("Informe o ID do contratante"),

    })
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Formik
                    initialValues={{
                      firtName: '',
                      email: '',
                      password: '',
                      Confirmedpassword: '',
                      idCompany: ''
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validations}

                  >
                    <Form>
                      <h1>Registrar</h1>
                      <p className="text-muted">Criar Conta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field className="form-control" name="firtName" placeholder="Primeiro nome" autoComplete="username" />
                        <ErrorMessage
                          style={{ color: 'red' }}
                          // component="span"
                          name="firtName"
                        // className="Login-Error"
                        //{<div style={{ color: 'red' }}></div> }
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Field className="form-control" name="email" placeholder="Email" autoComplete="email" />
                        <ErrorMessage
                          component="span"
                          name="email"
                          className="Login-Error"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field className="form-control" name="password" placeholder="Password" type='password' />
                        <ErrorMessage
                          component="span"
                          name="password"
                          className="Login-Error"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field className="form-control" name="Confirmedpassword" type="password" placeholder="Confirme o password" autoComplete="new-password" />
                        <ErrorMessage
                          component="span"
                          name="Confirmedpassword"
                          className="Login-Error"

                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i>ID</i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field className="form-control" name="idCompany" placeholder="ID contratante" autoComplete="" />
                        <ErrorMessage
                          component="span"
                          name="idCompany"
                          className="Login-Error"
                        />
                      </InputGroup>
                      <Button className="px-4" color="success" type="submit" block>Registrar</Button>
                    </Form>
                  </Formik>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
