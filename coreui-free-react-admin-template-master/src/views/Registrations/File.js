import React, { Component, Suspense } from 'react';
import {

    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    FormFeedback,
    Input,
    Label,
    Row,
    Table,
    Modal,
    ModalBody,
    Container,
    Nav,
    NavItem,
    NavLink,
    TabPane,
    TabContent
} from 'reactstrap';

import swal from 'sweetalert';
import moment from 'moment';
import axios from 'axios';
import ContentWrapper from '../Theme/ContentWrapper';
import { URL_DescriptionFiles } from '../../services/fileService';

import CurrencyInput from 'react-currency-input';
import ConvertToUSD from './../../ConvertCurrency';
import NumberFormat from 'react-number-format';
import PubSub from 'pubsub-js'
import Pagination from 'react-js-pagination';

class FormUpload extends Component {
    listFiles = [];
    state = {
        modelFile: { id: 0, nameProduct: '', descriptionProduct: '', valueProduct: '', groupItems: '', files: [] }

    }

    onUpload = acceptedFiles => {
        if (this.listFiles.length > 1) {
            swal("Não é possível anexar mais de duas imagens!",
                { icon: 'warning' })
        }
        else {
            this.setState({
                files: acceptedFiles.target.files[0]
            })
        }
    };

    createImageItem = (file, index) => (
        <div>
            {
                this.listFiles.length <= 1 ?
                    this.listFiles.push(file)
                    :
                    null
            }
            <Row>
                {
                    this.listFiles.map(f => (
                        <Col md={3} key={index}>
                            <img className="img-fluid mb-2"
                                src={URL.createObjectURL(f)} alt="Item" />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )

    validate = () => {
        let isError = 0;
        const dados = this.state.modelFile
        const errors = {}

        if (dados.nameProduct.length <= 2) {
            isError++;
            errors.nameProductError = true;
        }
        else
            errors.nameProductError = false;

        if (dados.descriptionProduct.length <= 2) {
            isError++;
            errors.descriptionProductError = true;
        }
        else
            errors.descriptionProductError = false;

        // if (dados.valueProduct == '') {
        //     isError++;
        //     errors.valueProductError = true;
        // }
        // else
        //     errors.valueProductError = false;

        if (dados.groupItems == '0' || dados.groupItems == '') {
            isError++;
            errors.groupError = true;
        }
        else
            errors.groupError = false;
        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    }

    create = () => {
        if (this.validate() == 0)
            this.save()
    }

    clear = () => {
        this.clearFiles()
        this.setState({ modelFile: { nameProduct: '', descriptionProduct: '', valueProduct: '', groupItems: 0, files: [] } })
    }
    clearFiles = () => {
        this.setState({ files: undefined })
        this.listFiles = []
        //e.preventDefault()
    }

    setValues = (e, field) => {
        const { modelFile } = this.state;
        modelFile[field] = e.target.value;
        this.setState({ modelFile });
        this.validate()
    }

    NewsFiles = () => {
        swal("Irá limpar todos os campos!", {
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(resp => {
            if (resp) {
                this.clearFiles()
                this.setState({ modelFile: { nameProduct: '', descriptionProduct: '', valueProduct: '' } })
            }
        })
    }
    save = () => {
        const chars = ['R', '$',]
        const data = this.state.modelFile

        const valueProduct = ConvertToUSD(data.valueProduct)

        const files = this.listFiles

        if (files.length == 0 && data.id == 0) {

            swal('Nenhuma Imagem Inserida!', {
                icon: 'warning'
            })
        }
        else {

            const formData = new FormData();
            files.forEach(element => {
                formData.append('body', element);
            });

            const descriptionFiles = {
                id: parseInt(data.id),
                nameProduct: data.nameProduct,
                descriptionProduct: data.descriptionProduct,
                valueProduct: parseFloat(valueProduct),
                groupItems: parseInt(data.groupItems),
                formData,
            }

            if (descriptionFiles.id > 0) {
                axios.put(`${URL_DescriptionFiles}/${descriptionFiles.id}/${descriptionFiles.nameProduct}/${descriptionFiles.descriptionProduct}/${descriptionFiles.valueProduct}/${descriptionFiles.groupItems}`, formData).
                    then(resp => {
                        const { data } = resp
                        if (data) {
                            swal("Atualizado com sucesso!", {
                                icon: 'success'
                            })
                            this.clear()
                        }
                    })
            }
            else {
                axios.post(`${URL_DescriptionFiles}/${descriptionFiles.nameProduct}/${descriptionFiles.descriptionProduct}/${descriptionFiles.valueProduct}/${descriptionFiles.groupItems}`, formData).
                    then(resp => {
                        const { data } = resp
                        if (data) {
                            swal("Salvo com sucesso!", {
                                icon: 'success'
                            })
                            this.clear()
                        }
                    })
            }
        }

    }

    componentWillMount() {
        PubSub.subscribe('edit-files', (topic, f) => {
            this.setState({ modelFile: f })
            this.props.toggleTab('edit')
        })
    }

    render() {
        let allFiles = this.state.files
        return (
            <div>
                <ContentWrapper>
                    <Card>
                        <CardBody>
                            <Container className="container-md">
                                <div className="row">
                                    <Col xs="6" md="9">
                                        <label htmlFor="inputImage" title="Upload image file" className="btn btn-info btn-sucess">
                                            <input ref="inputImage"
                                                id="inputImage"
                                                name="file"
                                                onChange={e => this.onUpload(e)}
                                                type="file"
                                                multiple
                                                className="sr-only" />

                                            <span title="Import image with Blob URLs" className="docs-tooltip">
                                                <em className="fa fa-plus-square-o"></em> Nova Imagem
                                            </span>
                                        </label>
                                    </Col>
                                    {this.state.modelFile.files.length > 0
                                        ?
                                        <Col md={6}>
                                            <small>Imagem salva!.</small>
                                            {
                                                this.state.modelFile.files.map(a => (
                                                    <img className="img-fluid"
                                                        width="80"
                                                        height="80"
                                                        src={"data:image/png;base64," + a.files}
                                                        alt="Responsive image" />
                                                ))
                                            }
                                        </Col>
                                        :
                                        null
                                    }

                                </div>
                                <div className="row">
                                    <div className="mt-3">
                                        {allFiles != undefined ?
                                            <div>
                                                {this.createImageItem(allFiles)}</div>
                                            :
                                            <div><small>Nenhuma Imagem Importada!.</small></div>
                                        }
                                    </div>
                                </div>
                                <div className="md-col-3">
                                    <Button size="sm" color="danger" onClick={e => this.clearFiles()}>
                                        <i className="fa fa-eraser"></i> Limpar Imagens</Button>
                                </div>
                            </Container>
                        </CardBody>
                        <CardBody>
                            <Row>
                                <Col md={3}>
                                    <Label>Nome do Produto:*</Label>
                                    <Input
                                        name='nameProduct'
                                        type='text'
                                        invalid={this.state.nameProductError}
                                        onChange={e => this.setValues(e, 'nameProduct')}
                                        value={this.state.modelFile.nameProduct}
                                    />
                                    <FormFeedback invalid>Campo Obrigatório!</FormFeedback>
                                </Col>
                                <Col md={6}>
                                    <Label>Descrição Produto:*</Label>
                                    <Input
                                        name='descriptionProduct'
                                        type='text'
                                        invalid={this.state.descriptionProductError}
                                        onChange={e => this.setValues(e, 'descriptionProduct')}
                                        value={this.state.modelFile.descriptionProduct}
                                    />
                                    <FormFeedback invalid>Campo Obrigatório!</FormFeedback>
                                </Col>

                                <Col md={2}>
                                    <Label>Valor Produto:*</Label>
                                    <CurrencyInput
                                        className="form-control"
                                        type="text"
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        prefix="R$"
                                        onChangeEvent={e => this.setValues(e, 'valueProduct')}
                                        value={this.state.modelFile.valueProduct}
                                    >
                                    </CurrencyInput>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Label>Grupo:*</Label>
                                    <Input
                                        type="select"
                                        onChange={e => this.setValues(e, 'groupItems')}
                                        value={this.state.modelFile.groupItems}
                                        defaultValue='0'
                                        invalid={this.state.groupError}
                                    >
                                        <option Value='0'>Selecione...</option>
                                        <option value='1'>Prod. Mary Key</option>
                                        <option value='2'>Semi Joiás</option>
                                        <option value='3'>Bolsas</option>
                                    </Input>
                                    <FormFeedback >Campo Obrigatório!</FormFeedback>
                                </Col>
                            </Row>

                            <p className="float-right text-sm">
                                <i>Os campos marcados com (*) são obrigatórios</i>
                            </p>
                            <br />
                            <div className="float-left">

                                <Button size="sm" color="primary" onClick={e => this.NewsFiles()}>
                                    <i className="fa fa-plus-square-o"></i> Novo Cadastro</Button>{' '}

                                <Button size="sm" color="success" onClick={e => this.create()}>
                                    <i className="fa fa-dot-circle-o"></i> Salvar</Button>

                            </div>

                        </CardBody>
                    </Card>
                </ContentWrapper>
            </div>
        );
    }

}

class ListFile extends Component {

    state = {
        formFiles: { results: [], currentPage: '', pageCount: '', pageSize: '', rowCount: '', firstRowOnPage: '', lastRowOnPage: '' },
        modelFile: {},
        formFilter: {}
    }
    setFile(e) {
        this.setState({ files: e.target.files[0] });
    }

    createImage = (files) => {
        return URL.createObjectURL(files)
    }

    toggleModal = (e, f) => {
        console.log('filesssss', f)
        this.setState({
            modal: !this.state.modal,
            previewedFile: f
        });
        e.preventDefault()
    }

    setValuesFilter = (e, field) => {
        const { formFilter } = this.state;
        formFilter[field] = e.target.value;
        this.setState({ formFilter });
    }
    consult = () => {
        axios.get(URL_DescriptionFiles).then(resp => {
            const { data } = resp
            if (data)
                this.setState({ formFiles: data })
        })
    }

    componentDidMount() {
        this.consult()
    }

    consultFiles = (e) => {

        axios.patch(URL_DescriptionFiles, this.state.formFilter).then(resp => {
            const { data } = resp
            if (data)
                this.setState({ formFiles: data })
        })
        e.preventDefault()
    }

    delete = (e, idDescriptionFiles) => {
        console.log('idDescriptionFiles', idDescriptionFiles)
        swal('Deseja Realmente Excluir o Arquivo?', {
            icon: 'warning',
            dangerMode: true,
            buttons: true
        }).then(resp => {
            if (resp) {
                axios.delete(`${URL_DescriptionFiles}/${idDescriptionFiles}`).then(resp => {
                    const { data } = resp
                    if (data) {
                        this.consult();
                    }
                })
            }
        })
    }
    onEdit = (e, f) => {
        PubSub.publish('edit-files', f)
    }

    query = (pageSizeValue, pageNumber) => {
        let pageSize = ''
        if (pageSizeValue)
            pageSize = pageSizeValue.target.value

        let data = this.state.formFilter

        data.pageSize = pageSize
        data.pageNumber = pageNumber

        axios.patch(URL_DescriptionFiles, data).then(response => {
            const { data } = response

            this.setState({
                formFiles: data
            })
        })
    }

    render() {

        const { formFiles } = this.state

        // const formatDate = this.state.modelFile.date == '' ?
        //     moment(new Date()).format('YYYY-MM-DDTHH:mm') :
        //     moment(this.state.modelFile.date).format('YYYY-MM-DDTHH:mm')
        // if (formatDate)
        //     this.state.modelFile.date = formatDate
        const { results, currentPage, pageSize, rowCount } = formFiles;
        return (
            <div>
                <Card>
                    <CardBody>

                        <form name="formFilter">
                            <div className="form-row">
                                <div className="col-md-2">
                                    <select name="selectOption"
                                        onChange={e => this.setValuesFilter(e, 'selectOption')}
                                        defaultValue="0"
                                        className="custom-select"
                                        multiple="">
                                        <option Value="0">Nome</option>
                                    </select>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group mb-4">
                                        <Input className="form-control mb-2"
                                            type="text"
                                            placeholder="Pesquisar por Nome Produto... "
                                            onChange={e => this.setValuesFilter(e, 'textOption')}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <button className="btn btn-primary" block onClick={e => this.consultFiles(e)}>Pesquisar</button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3">

                            <hr />
                            <Row>
                                <Col xs={8} md={12}>
                                    <Table responsive="sm">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>Arquivo</th>
                                                <th>Nome Produto</th>
                                                <th>Descrição Produto</th>
                                                <th>Valor Produto</th>
                                                <th >Opções</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                results.map(f => (
                                                    <tr key={f.id}>
                                                        <td>
                                                            {
                                                                f.files.map(a => (
                                                                    <img className="img-fluid"
                                                                        width="80"
                                                                        height="80"
                                                                        src={"data:image/png;base64," + a.files}
                                                                        alt="Responsive image" />
                                                                ))
                                                            }
                                                        </td>
                                                        <td>{f.nameProduct}</td>
                                                        <td>
                                                            {f.descriptionProduct}
                                                        </td>
                                                        <td>
                                                            {<NumberFormat
                                                                displayType={'text'}
                                                                value={f.valueProduct}
                                                                decimalSeparator=','
                                                                thousandSeparator='.'
                                                                prefix='R$'
                                                            />}
                                                        </td>
                                                        <td>
                                                            <Button title="Editar" size="sm"
                                                                onClick={e => this.onEdit(e, f)}
                                                            >
                                                                <i className="fa fa-pencil"></i>
                                                            </Button>{' '}
                                                            <Button title="Visualizar" size="sm"
                                                                onClick={e => this.toggleModal(e, f.files)}
                                                            >
                                                                <i className="fa fa-eye"></i>
                                                            </Button>{' '}
                                                            <Button color="danger" title="Excluir" size="sm"
                                                                onClick={e => this.delete(e, f.id)}
                                                            >
                                                                <i className="fa fa-trash-o"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
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
                                </Col>
                            </Row>

                            <Modal className="modal-dialog modal-lg"
                                centered isOpen={this.state.modal} toggle={this.toggleModal}>

                                {
                                    this.state.previewedFile != undefined ?
                                        <div>
                                            <ModalBody>
                                                {this.state.previewedFile.map(f => (
                                                    <img className="img-fluid mb-2"
                                                        src={"data:image/png;base64," + f.files}
                                                        alt="Item" />
                                                ))}
                                            </ModalBody>

                                        </div>
                                        :
                                        undefined
                                }
                            </Modal>
                        </div>

                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default class File extends Component {
    state = {
        activeTab: 'con',
    }
    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Col xs="12" md="12" className="mb-4">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === 'con' ? 'active' : ''}
                                onClick={() => { this.toggleTab('con'); }}
                            >
                                Lista Imagens
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === 'edit' ? 'active' : ''}
                                onClick={() => { this.toggleTab('edit'); }}
                            >
                                Cadastro de Imagens
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab} onSelect>
                        <TabPane tabId="con" role="tabpanel">
                            <ListFile />
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab} onSelect>
                        <TabPane tabId="edit" role="tabpanel">
                            <FormUpload toggleTab={this.toggleTab} />
                        </TabPane>
                    </TabContent>
                </Col>
            </div>
        )
    }


}