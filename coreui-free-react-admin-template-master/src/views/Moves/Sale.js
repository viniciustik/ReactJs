import { Date } from 'core-js';
import React, { Component, Suspense } from 'react';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import Select from 'react-select';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
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
    Table,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import CurrencyInput from './../../CurrencyInput';

class ListSales extends Component {
    state = {
        accordionState: [true, false, false, false, false, false],

    }


    toggleAccordion = id => {
        let accordionState = this.state.accordionState.map((val, i) => {
            return id === i ? !val : (this.state.oneAtATime ? false : val)
        })
        this.setState({
            accordionState
        })
    }

    toggleLarge = () => {
        this.setState({
            large: !this.state.large
        });
    }

    render() {
        const { results, currentPage, pageSize, rowCount } = this.props;
        return (
            <div>
                <Col lg="13">
                    <div>
                        {/* Checkout Process */}
                        <form action="" method="post" noValidate>
                            <div id="accordion">
                                {/* Checkout Method */}
                                <div className="card b mb-2">
                                    <CardHeader onClick={() => this.toggleAccordion(0)}>
                                        <CardTitle tag="h4">
                                            <a className="text-inherit">
                                                <small>
                                                    <em className="fa fa-plus text-primary mr-2"></em>
                                                </small>
                                                <span>Filtros</span>
                                            </a>
                                        </CardTitle>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordionState[0]}>
                                        <CardBody id="collapse01">
                                            <FormGroup>
                                                <Row>
                                                    <Col lg="12">

                                                        <div className="form-row">
                                                            <div className="col-md-3">
                                                                <Label htmlFor="initialDate">Data Inicial Venda:</Label>
                                                                <Input
                                                                    type="date"
                                                                    id="initialDate"
                                                                    name="initialDate"
                                                                // value={this.state.formFilter.initialDate == '' ? moment(new Date()).format('YYYY-MM-DD') :
                                                                //    moment(this.state.formFilter.initialDate).format('YYYY-MM-DD')}
                                                                //onChange={e => this.setValues(e, 'initialDate')}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <Label htmlFor="finalDate">Data Final Venda:</Label>
                                                                <Input
                                                                    type="date"
                                                                    id="finalDate"
                                                                    name="finalDate"
                                                                // value={this.state.formFilter.initialDate == '' ? moment(new Date()).format('YYYY-MM-DD') :
                                                                //    moment(this.state.formFilter.initialDate).format('YYYY-MM-DD')}
                                                                //onChange={e => this.setValues(e, 'initialDate')}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <Label htmlFor="client">Cliente:</Label>
                                                                <Input
                                                                    type="text"
                                                                    id="client"
                                                                    name="client"
                                                                // value={this.state.formFilter.initialDate == '' ? moment(new Date()).format('YYYY-MM-DD') :
                                                                //    moment(this.state.formFilter.initialDate).format('YYYY-MM-DD')}
                                                                //onChange={e => this.setValues(e, 'initialDate')}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <Label htmlFor="salesman">Vendedor:</Label>
                                                                <Input
                                                                    type="text"
                                                                    id="salesman"
                                                                    name="salesman"
                                                                // value={this.state.formFilter.initialDate == '' ? moment(new Date()).format('YYYY-MM-DD') :
                                                                //    moment(this.state.formFilter.initialDate).format('YYYY-MM-DD')}
                                                                //onChange={e => this.setValues(e, 'initialDate')}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                                                className={'modal-lg ' + 'modal-info '}>
                                                <ModalHeader toggle={this.toggleLarge}>
                                                    <em className='fa fa-shopping-cart'></em>{' '}
                                                    Vendas</ModalHeader>
                                                <FormModalSales />
                                            </Modal>
                                        </CardBody>
                                    </Collapse>
                                </div>
                            </div>
                        </form>
                    </div>
                </Col>
                <div className="form-row">
                    <div className="col-md-6">
                        <Button className="btn btn-sm btn-danger" color="primary" onClick={this.toggleLarge}>
                            <em className="fa fa-plus fa-fw"></em>
                                                     Nova Venda
                        </Button>
                    </div>
                </div>
                {/* modal aqui */}

                <hr className="my-2" />
                <div className="card b">
                    <CardHeader>
                        <CardTitle tag="h4">
                            <a className="text-inherit">Vendas</a>
                        </CardTitle>
                    </CardHeader>
                    <Table size="sm" striped responsive>
                        <thead class="thead-light">
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Data Venda</th>
                                <th>Vendedor</th>
                                <th>Status</th>
                                <th>Valor</th>
                                <th className=""><strong>Opções</strong></th>
                            </tr>
                        </thead>
                        <tbody>

                            <td>
                                1
                                    </td>
                            <td>
                                teste venda
                                    </td>
                            <td>
                                {moment(new Date()).format('DD-MM-YYYY')}
                            </td>
                            <td>
                                Viniciu jose de oliveira
                                    </td>
                            <td>
                                <span className="badge badge-warning">Aberto</span>
                            </td>
                            <td>
                                {<NumberFormat
                                    thousandSeparator={true}
                                    prefix={'R$'}
                                    thousandSeparator=','
                                    decimalSeparator='.'
                                    displayType={'text'}
                                    value={210}
                                />
                                }
                            </td>
                            <td>
                                <button className="btn btn-sm btn-secondary" title="Editar" size="sm"
                                // onClick={e => this.onEdit(fin)}
                                >
                                    <em className="cui-pencil"></em>
                                </button>
                                <button className="btn btn-sm btn-danger" title="Excluir" size="sm"
                                //onClick={e => this.delete(fin)}
                                >
                                    <em className="cui-circle-x "></em>
                                </button>

                                <button className="btn btn-sm btn-success" title="Imprimir" size="sm"
                                //onClick={() => window.print("eiiiiiiiii")}
                                >

                                    <em className="fa fa-print"></em>
                                </button>

                            </td>

                        </tbody>
                    </Table>
                    <CardFooter>
                        <div className="d-flex align-items-left">
                            <div>
                                <select className="custom-select" name="selectOptionAmount" onChange={(pageSize) => this.query(pageSize, '')} defaultValue="" multiple="">
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
                                    onChange={(pageNumber) => this.query('', pageNumber)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="Primeira"
                                    lastPageText="Última"
                                />
                            </div>
                        </div>
                    </CardFooter>
                </div>
            </div>
        )
    }
}

class FormModalSales extends Component {
    render() {
        return (
            <div>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <form>
                                <FormGroup>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <Label for="dateThrow">Data Lançamento:*</Label>
                                            <Input
                                                type="date"
                                                name="dateThrow"
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <Label for="dateSale">Data Venda:*</Label>
                                            <Input
                                                type="date"
                                                name="dateSale"
                                            />
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Label for="nameClient">Nome Cliente:*</Label>
                                            <Select
                                                // name="nameClient"
                                                // placeholder="Cliente..."
                                                // onInputChange={e => this.consultClient(e)}
                                                // onChange={e => this.setValues(e, "idClient")}
                                                // options={nameClient}
                                                // styles={customStyles}
                                                // value={nameClient[0] == null ?
                                                //     valueName : nameClient}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Label for="nameSalesman">Nome Vendedor:*</Label>
                                            <Select
                                                name="nameSalesman"
                                                placeholder="Vendedor..."
                                                // onInputChange={e => this.consultClient(e)}
                                                // onChange={e => this.setValues(e, "idClient")}
                                                // options={nameClient}
                                                // styles={customStyles}
                                                // value={nameClient[0] == null ?
                                                //     valueName : nameClient}
                                            />
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6">
                                            <Label for="product">Produto:</Label>
                                            <Select
                                                name="product"
                                                placeholder="Produtos..."
                                                // onInputChange={e => this.consultClient(e)}
                                                // onChange={e => this.setValues(e, "idClient")}
                                                // options={nameClient}
                                                // styles={customStyles}
                                                // value={nameClient[0] == null ?
                                                //     valueName : nameClient}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Label for="amount">Quantidade:</Label>
                                            <Input
                                            type="text"
                                            name ="amount"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Label for="value">Valor Unitário:</Label>
                                            <Input
                                            type="text"
                                            name ="value"
                                            tag={CurrencyInput}
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Label for="services">Serviços:</Label>
                                            <Select
                                                name="services"
                                                placeholder="Serviços..."
                                                // onInputChange={e => this.consultClient(e)}
                                                // onChange={e => this.setValues(e, "idClient")}
                                                // options={nameClient}
                                                // styles={customStyles}
                                                // value={nameClient[0] == null ?
                                                //     valueName : nameClient}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Label for="amountService">Quantidade:</Label>
                                            <Input
                                            type="text"
                                            name ="amount"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Label for="valueService">Valor Unitário:</Label>
                                            <Input
                                            type="text"
                                            name ="value"
                                            tag={CurrencyInput}
                                            />
                                        </div>
                                        
                                    </div>
                                </FormGroup>
                            </form>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.toggleLarge}>Salvar</Button>{' '}
                    <Button color="secondary" onClick={this.toggleLarge}>Cancelar</Button>
                </ModalFooter>
            </div>
        )
    }
}
export default class FinancialOperation extends Component {
    render() {
        return (
            <div>
                <ListSales />
            </div>
        )
    }
}