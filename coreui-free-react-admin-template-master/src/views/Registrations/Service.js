import React, { Component, Suspense } from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
    Table
} from 'reactstrap';
import InputMask from 'react-input-mask';
import json_city from './json_cities.json';
import CurrencyInput from './../../CurrencyInput';

class FormService extends Component {

    state = {
        listCities: []
    }

    buscaCidades = (e) => {
        const data = json_city.states;
        const val = e.target.value
        console.log("ccc", val)
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
                ...this.state,
            })
        }
    }
    render() {
        return (
            <Card>
                <CardHeader>
                    <strong>Cadastro</strong>
                    <small> Serviços</small>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <div className='form-row'>
                                <div className="col-md-8">
                                    <Label htmlFor="nameService">Nome Serviço:*</Label>
                                    <Input
                                     type="text"
                                        id="nameService"
                                        className="form-control-warning"
                                        required
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Label htmlFor="serviceValue">Valor Serviço:*</Label>
                                    <Input id="serviceValue"
                                        name="serviceValue"
                                        type="text"
                                        required
                                        tag={CurrencyInput}
                                    //value={this.state.model.nameCity}
                                    //onChange={e => this.setValues(e, 'nameCity')}
                                    >
                                    </Input>
                                </div>
                                </div>
                                </FormGroup>
                        <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Salvar</Button>
                        <p className="float-right text-sm">
                            <i>Os campos marcados com (*) são obrigatórios</i>
                        </p>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}


class ListFormService extends Component {


    render() {
        return (
            <Card>
                <CardHeader>
                    <strong>Consultar</strong>
                    <small> Prospects Cadastrados</small>
                </CardHeader>
                <CardBody>
                    <Table responsive size="sm">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Carwyn Fachtna</td>
                                <td>R$ 100</td>
                                <td>
                                    <Button color="secondary" outline>
                                        <i className="cui-pencil"></i>&nbsp;Editar
                   </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        )
    }
}


export default class Service extends Component {

    render() {
        return (
            <div>
                <div className="row">

                    <div className="col-md-4 my-3">
                    <ListFormService />
                     
                    </div>

                    <div className="col-md-8 my-3" >
                    <FormService />
                    </div>
                </div>
            </div>
        )

    }
}