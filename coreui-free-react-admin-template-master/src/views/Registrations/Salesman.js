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
import json_city from './json_cities.json'
import CurrencyInput from './../../CurrencyInput%';
import NumberFormat from 'react-number-format';

class FormSalesman extends Component {

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
                    <small> Vendedor</small>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <div className='form-row'>
                                <div className="col-md-8">
                                    <Label htmlFor="name">Nome:*</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        className="form-control-warning"
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Label htmlFor="cpf">Cpf:*</Label>
                                    <Input
                                        type="text"
                                        id="cpf"
                                        mask='999.999.999-99'
                                        tag={InputMask}
                                        className="form-control-warning"
                                        required
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="row">
                                <div className="col-md-3">
                                    <Label htmlFor="zipCode">Cep:*</Label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="zipCode"
                                        mask='99.999-999'
                                        tag={InputMask}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Label htmlFor="address">Endereço:*</Label>
                                    <Input
                                        className="form-control-warning"
                                        type="text"
                                        id="number"
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Label htmlFor="bairro">Bairro:*</Label>
                                    <Input
                                        className="form-control-warning"
                                        type="text"
                                        id="bairro"
                                        required
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <FormGroup row className="my-0">
                                <div className="col-md-2">
                                    <Label htmlFor="state">Estado:*</Label>
                                    <Input id="state"
                                        name="state"
                                        type="select"
                                        // value={this.state.model.state}
                                        onChange={this.buscaCidades}
                                        required
                                    >
                                        <option Value="">UF</option>
                                        <option Value="AC"> Acre</option>
                                        <option Value="AL"> Alagoas</option>
                                        <option Value="AP"> Amapá</option>
                                        <option Value="AM"> Amazonas</option>
                                        <option Value="BA"> Bahia</option>
                                        <option Value="CE"> Ceará</option>
                                        <option Value="DF"> Distrito Federal</option>
                                        <option Value="ES"> Espírito Santo</option>
                                        <option Value="GO"> Goiás</option>
                                        <option Value="MA"> Maranhão</option>
                                        <option Value="MT"> Mato Grosso</option>
                                        <option Value="MS"> Mato Grosso do Sul</option>
                                        <option Value="MG"> Minas Gerais</option>
                                        <option Value="PA"> Pará</option>
                                        <option Value="PB"> Paraíba</option>
                                        <option Value="PR"> Paraná</option>
                                        <option Value="PE"> Pernambuco</option>
                                        <option Value="PI"> Piauí</option>
                                        <option Value="RJ"> Rio de Janeiro</option>
                                        <option Value="RN"> Rio Grande do Norte</option>
                                        <option Value="RS"> Rio Grande do Sul</option>
                                        <option Value="RO"> Rondônia</option>
                                        <option Value="RR"> Roraima</option>
                                        <option Value="SC"> Santa Catarina</option>
                                        <option Value="SP"> São Paulo</option>
                                        <option Value="SE"> Sergipe</option>
                                        <option Value="TO"> Tocantins</option>
                                    </Input>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup>
                                        <Label htmlFor="city">Cidade:*</Label>
                                        <Input id="nameCity"
                                            name="city"
                                            type="select"
                                            required
                                        //value={this.state.model.nameCity}
                                        //onChange={e => this.setValues(e, 'nameCity')}
                                        >
                                            {this.state.listCities.map(city => (<option>{city}</option>))}

                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <Label htmlFor="cellphone">Telefone:*</Label>
                                    <Input id="cellphone"
                                        name="cellphone"
                                        type="text"
                                        required
                                        mask='(99) 99999-9999'
                                        tag={InputMask}
                                    //value={this.state.model.nameCity}
                                    //onChange={e => this.setValues(e, 'nameCity')}
                                    >
                                    </Input>
                                </div>
                                <div className="col-md-2">
                                    <Label htmlFor="commission">% Comissão:*</Label>
                                    <Input id="commission"
                                        name="commission"
                                        type="text"
                                        required
                                        tag={CurrencyInput}
                                    //value={this.state.model.nameCity}
                                    //onChange={e => this.setValues(e, 'nameCity')}
                                    >
                                    </Input>
                                </div>
                            </FormGroup>
                     
                            <FormGroup row>
                                <Col md="3"><Label>Produtos</Label></Col>
                                <Col md="9">
                                    <FormGroup check className="checkbox">
                                        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                        <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                                    </FormGroup>
                                    <FormGroup check className="checkbox">
                                        <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                                        <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                                    </FormGroup>
                                    <FormGroup check className="checkbox">
                                        <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3" />
                                        <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
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


class ListFormSalesman extends Component {
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
                                <th>Telefone</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Carwyn Fachtna</td>
                                <td>(34) 99229-5856</td>
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


export default class Prospect extends Component {

    render() {
        return (
            <div>
                <div className="row">

                    <div className="col-md-4 my-3">
                        <ListFormSalesman />

                    </div>

                    <div className="col-md-8 my-3" >
                        <FormSalesman />
                    </div>
                </div>
            </div>
        )

    }
}