import React, { Component, Suspense } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Table,
    Alert
} from 'reactstrap';
import InputMask from 'react-input-mask';
import json_city from './json_cities.json';
import Pagination from 'react-js-pagination';
import swal from 'sweetalert';
import moment from 'moment';
import axios from 'axios';
import CharacterRemover from 'character-remover';
import PubSub from 'pubsub-js';
import { URL_Client } from './../../services/clientService'
import NumberFormat from 'react-number-format';
class FormProvider extends Component {

    state = {
        errors: {},
        listCities: [],
        modelClient: {
            id: 0,
            name: '',
            document: '',
            zipCode: '',
            address: '',
            bairro: '',
            cellPhone: '',
            nameCity: '',
            nameState: '',

        },
        visible: true
    }

    validate = () => {
        let isError = 0;
        const dados = this.state.modelClient
        const errors = {}

        if (!dados.name) {
            isError++;
            errors.nameError = true;
        }
        else
            errors.nameError = false;

        if (!dados.nameState) {
            isError++;
            errors.nameStateError = true;
        }
        else
            errors.nameStateError = false;
        if (!dados.nameCity) {
            isError++;
            errors.nameCityError = true;
        }
        else
            errors.nameCityError = false;
        if (!dados.cellPhone && dados.cellPhone.length < 13) {
            isError++;
            errors.cellPhoneError = true;
        }
        else
            errors.cellPhoneError = false;

        this.setState({
            errors
        });

        return isError;
    }

    componentWillMount() {
        PubSub.subscribe('edit-client', (topic, client) => {

            this.setState({
                modelClient: client,
                listCities: [`${client.nameCity}`]

            })
        })
    }
    setValues = (e, field) => {
        const { modelClient } = this.state;
        modelClient[field] = e.target.value;
        if (field == 'nameState')
            this.buscaCidades(e)
        this.setState({ modelClient });
    }

    save = async () => {
        const { modelClient } = this.state

        if (this.validate() == 0) {

            let data = {
                idCompany: modelClient.idCompany,
                id: parseInt(modelClient.id),
                name: modelClient.name,
                document: modelClient.document,
                zipCode: CharacterRemover.removeAll(modelClient.zipCode),
                address: modelClient.address,
                bairro: modelClient.bairro,
                nameState: modelClient.nameState,
                nameCity: modelClient.nameCity,
                cellPhone: CharacterRemover.removeAll(modelClient.cellPhone)
            }



            if (data.id > 0) {
                await axios.put(URL_Client, data).then(resp => {
                    const { data } = resp
                    if (data) {
                        swal("Atualizado com sucesso!", { icon: "success" }).then(r => {
                            if (r) {
                                this.clearModelClient();
                                this.props.consultAll();
                            }
                        })

                    }
                }).catch(
                    swal("N??o foi poss??vel salvar!", { icon: "warning" })
                )
            } else {
                await axios.post(URL_Client, data).then(resp => {
                    const { data } = resp
                    if (data) {
                        swal("Salvo com sucesso!", { icon: "success" }).then(r => {
                            if (r) {
                                this.clearModelClient();
                                this.props.consultAll();
                            }
                        })
                    }
                }).catch(
                    swal("N??o foi poss??vel salvar!", { icon: "warning" })
                )
            }
        }
    }
    clearModelClient() {
        this.setState({
            modelClient: {
                id: 0,
                name: '',
                document: '',
                zipCode: '',
                address: '',
                bairro: '',
                cellPhone: '',
                nameCity: '',
                nameState: '',

            },
        })
    }

    buscaCidades = (e) => {
        const data = json_city.states;
        const val = e.target.value
        if (val != '') {
            //  this.setValues(e, 'nameState');
            var filterObj = data.find(function (item, i) {

                if (item.sigla === val) {
                    const city = item.cidades
                    return city
                }
            })
            this.state.listCities = filterObj.cidades
            this.setState({

            })
        }
    }
    render() {
        const { modelClient, errors } = this.state;

        return (
            <div>

                <Card>
                    <CardHeader>
                        <strong>Cadastro</strong>
                        <small> Cliente</small>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <div className='form-row'>
                                    <div className="col-md-2">
                                        <Label htmlFor="name">Id:</Label>
                                        <Input
                                            type="text"
                                            id="id"

                                            disabled={true}
                                            value={modelClient.id}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Label htmlFor="name">Nome:*</Label>
                                        <Input
                                            id="name"
                                            className="form-control-warning"
                                            type="text"
                                            invalid={errors.nameError}
                                            value={modelClient.name}
                                            onChange={e => this.setValues(e, 'name')}
                                        />
                                        <FormFeedback></FormFeedback>
                                    </div>
                                    <div className="col-md-4">
                                        <Label htmlFor="document">Documento:</Label>
                                        <Input
                                            type="text"
                                            className="form-control-warning"
                                            value={modelClient.document}
                                            onChange={e => this.setValues(e, 'document')}
                                        />
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="row">
                                    <div className="col-md-3">
                                        <Label htmlFor="zipCode">Cep:</Label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            mask='99.999-999'
                                            tag={InputMask}
                                            value={modelClient.zipCode}
                                            onChange={e => this.setValues(e, 'zipCode')}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Label htmlFor="address">Endere??o:</Label>
                                        <Input
                                            className="form-control-warning"
                                            type="text"
                                            value={modelClient.address}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Label htmlFor="bairro">Bairro:</Label>
                                        <Input
                                            className="form-control-warning"
                                            type="text"
                                            value={modelClient.bairro}
                                            onChange={e => this.setValues(e, 'bairro')}
                                        />
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <FormGroup row className="my-0">
                                    <div className="col-md-4">
                                        <Label htmlFor="state">Estado:*</Label>
                                        <Input
                                            type="select"
                                            value={modelClient.nameState}
                                            onChange={e => this.setValues(e, 'nameState')}

                                            invalid={errors.nameStateError}
                                        >

                                            <option Value="">UF</option>
                                            <option Value="AC"> Acre</option>
                                            <option Value="AL"> Alagoas</option>
                                            <option Value="AP"> Amap??</option>
                                            <option Value="AM"> Amazonas</option>
                                            <option Value="BA"> Bahia</option>
                                            <option Value="CE"> Cear??</option>
                                            <option Value="DF"> Distrito Federal</option>
                                            <option Value="ES"> Esp??rito Santo</option>
                                            <option Value="GO"> Goi??s</option>
                                            <option Value="MA"> Maranh??o</option>
                                            <option Value="MT"> Mato Grosso</option>
                                            <option Value="MS"> Mato Grosso do Sul</option>
                                            <option Value="MG"> Minas Gerais</option>
                                            <option Value="PA"> Par??</option>
                                            <option Value="PB"> Para??ba</option>
                                            <option Value="PR"> Paran??</option>
                                            <option Value="PE"> Pernambuco</option>
                                            <option Value="PI"> Piau??</option>
                                            <option Value="RJ"> Rio de Janeiro</option>
                                            <option Value="RN"> Rio Grande do Norte</option>
                                            <option Value="RS"> Rio Grande do Sul</option>
                                            <option Value="RO"> Rond??nia</option>
                                            <option Value="RR"> Roraima</option>
                                            <option Value="SC"> Santa Catarina</option>
                                            <option Value="SP"> S??o Paulo</option>
                                            <option Value="SE"> Sergipe</option>
                                            <option Value="TO"> Tocantins</option>
                                        </Input>
                                    </div>
                                    <div className="col-md-4">
                                        <FormGroup>
                                            <Label htmlFor="city">Cidade:*</Label>
                                            <Input id="nameCity"
                                                type="select"
                                                invalid={errors.nameCityError}
                                                value={modelClient.nameCity}
                                                onChange={e => this.setValues(e, 'nameCity')}
                                            >
                                                <FormFeedback></FormFeedback>
                                                {this.state.listCities.map(city => (<option>{city}</option>))}

                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-4">
                                        <Label htmlFor="cellphone">Telefone Celular:*</Label>
                                        <Input id="cellphone"
                                            name="cellphone"
                                            type="text"
                                            invalid={errors.cellPhoneError}
                                            mask='(99) 9 9999-9999'
                                            tag={InputMask}
                                            value={modelClient.cellPhone}
                                            onChange={e => this.setValues(e, 'cellPhone')}
                                        >
                                        </Input>
                                        <FormFeedback></FormFeedback>
                                    </div>
                                </FormGroup>

                            </FormGroup>
                            <Button
                                size="sm"
                                color="success"
                                onClick={e => this.save()}
                            ><i className="fa fa-dot-circle-o"></i> Salvar</Button>
                            <p className="float-right text-sm">
                                <i>Os campos marcados com (*) s??o obrigat??rios</i>
                            </p>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


class ListFormProvider extends Component {
    state = {

        modelClient: {},
        formFilter: {}
    }
    query = (pageSizeValue, pageNumber) => {
        let pageSize = ''
        if (pageSizeValue.target != undefined)
            pageSize = pageSizeValue.target.value;
        else
            pageSize = pageSizeValue;

        this.props.consultByPagination(pageSize, pageNumber);
    }

    onEdit = (client) => {
        PubSub.publish('edit-client', client)
    }

    render() {
        const { formClient } = this.props

        const { results, currentPage, pageSize, rowCount } = formClient;
        return (
            <Card>
                <CardHeader>
                    <strong>Consultar</strong>
                    <small> Clientes Cadastrados</small>
                </CardHeader>
                <CardBody>
                    <Table responsive size="sm">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Op????es</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                results.map(c => (
                                    <tr>
                                        <td>{c.name}</td>
                                        <td>{
                                            <NumberFormat
                                                displayType={'text'}
                                                value={c.cellPhone}
                                                format="(##) # #### ####"
                                            />
                                        }</td>
                                        <td>
                                            <Button
                                                onClick={e => this.onEdit(c)}
                                                color="secondary"
                                                outline>
                                                <i className="cui-pencil text-dark"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>
                    <div className="d-flex align-items-left">
                        <div>
                            <select className="custom-select"
                                name="selectOptionAmount"
                                onChange={(pageSize) => this.query(pageSize, currentPage)}
                                value={pageSize}
                                multiple="">
                                <option >10</option>
                                <option defaultValue="1">25</option>
                                <option defaultValue="2">50</option>
                                <option defaultValue="3">100</option>
                            </select>
                        </div>
                        <div className="ml-auto">
                            <Pagination
                                activePage={currentPage}
                                totalItemsCount={rowCount}
                                itemsCountPerPage={pageSize}
                                onChange={(pageNumber) => this.query(pageSize, pageNumber)}
                                itemClass="page-item"
                                linkClass="page-link"
                                firstPageText="Primeira"
                                lastPageText="??ltima"
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}


export default class Provider extends Component {

    state = {
        visible: false,
        formClient: { results: [], currentPage: '', pageCount: '', pageSize: '' },
    }

    componentDidMount() {
        this.consultAll();
    }
    consultByPagination = async (pageSize, pageNumber) => {

        await axios.get(URL_Client, {
            params: {
                pageSize: pageSize, pageNumber: pageNumber
            }
        }).then(resp => {
            const { data } = resp
            if (data) {
                this.setState({
                    formClient: data
                })
            }
        })
    }
    consultAll = async () => {
        await axios.get(URL_Client).then(resp => {
            const { data } = resp
            if (data) {
                this.setState({
                    formClient: data
                })
            }
        })
    }
    render() {
        const { formClient } = this.state
        return (
            <div>

                <div className="row">

                    <div className="col-md-5 my-3">
                        <ListFormProvider
                            formClient={formClient}
                            consultByPagination={this.consultByPagination}
                        />

                    </div>

                    <div className="col-md-7 my-3" >
                        <FormProvider
                            consultAll={this.consultAll}
                        />
                    </div>
                </div>
            </div>
        )

    }
}