import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Form, Input, Button, Row, Col, FormGroup, Label } from 'reactstrap';
import firebase from '../firebase';

class Formu extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            lastname1: "",
            lastname2: "",
            document: "",
            documentscan: "",
            id: "",
            photo: '',
            gender: "",
            birth: "",
            email: "",
            phone: "",
            celphone: "",
            via: "",
            number1: "",
            number2: "",
            number3: "",
            house: "",
            neighborhood: "",
            city: "",
            cities: [],
            department: "",
            departments: [],
            health: "",
            interest: [],
            facebook: "",
            instagram: "",
            twitter: "",
            disability: [],
            other: "",
            education: "",
            job: "",
            languages: {},
            newnamecontact1:"",
            newphonecontact1:"",
            newnamecontact2: "",
            newphonecontact2: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDocumentRadio= this.handleDocumentRadio.bind(this);
        this.handleDepartments= this.handleDepartments.bind(this);
        this.getDepartmentCities = this.getDepartmentCities.bind(this);
        this.onTakePhoto = this.onTakePhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInterest = this.handleInterest.bind(this);
        this.handleDocument = this.handleDocument.bind(this);
    }
    componentDidMount(){
        fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json').then((response) => {
            return response.json()
        })
        .then((resource) => {
            const list = [];
            resource.forEach((element)=>{
                if(!(list.includes(element.departamento))){
                    list.push(element.departamento)
                }
            })
            this.setState({
                departments: list
            })

        })
    }
    handleDocument(e){
        this.setState({
            documentscan: e.target.files[0],
        })
    }
    getDepartmentCities(value){
        fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento='+value).then((response)=> {
            return response.json()
        })
        .then((resource)=> {
            const list = [];
            resource.forEach((element)=>{
                list.push(element.municipio)
            })
            this.setState({
                cities: list
            })
        })

    }
    onTakePhoto (dataUri) {
        this.setState({
            photo: dataUri
        })
        console.log(dataUri);
    }  
    handleDocumentRadio(e){
        this.setState({
            document: e.target.value,
        })

    }
    handleInterest(e){
        let array = this.state.interest
        let selectedVale = e.target.value;
        if(e.target.checked === true){
            if (this.state.interest.length < 5){
                let array = this.state.interest.push(e.target.value)
                this.setState({
                    interest: array
                })                      
            }
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handleDepartments(e){
        this.setState({
            [e.target.name]: e.target.value,
            city: ""
        })
        this.getDepartmentCities(e.target.value)
    }
    handleSubmit(e){
        e.preventDefault();
        console.log("Enviar")
        firebase.database().ref('usuarios/'+this.state.name+' '+this.state.lastname1+' '+this.state.lastname2).set({
            nombre: this.state.name + ' '+this.state.lastname1 +' '+ this.state.lastname2,
            tipo_de_documento: this.state.document,
            identificacion: this.state.id,
            sexo: this.state.gender,
            fecha_de_nacimiento: this.state.birth,
            correo: this.state.email,
            telefono: this.state.phone,
            celular: this.state.celphone,
            direccion: this.state.via+' '+this.state.number1+' # '+this.state.number2+' - '+this.state.number3+', '+this.state.house,
            sisben: this.state.health,
            barrio: this.state.neighborhood,
            ciudad: this.state.city,
            departamento: this.state.department,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            twitter: this.state.twitter,
            educacion: this.state.education,
            profesion: this.state.job,
            nombrecontacto1: this.state.newnamecontact1,
            numerocontacto1: this.state.newphonecontact1,
            nombrecontacto2: this.state.newnamecontact2,
            numerocontacto2: this.state.newphonecontact2,
        })

        firebase.storage().ref().child('fotos/'+this.state.id).putString(this.state.photo, 'data_url')
        firebase.storage().ref().child('documentos/'+this.state.id).put(this.state.documentscan)
    }
    render(){
        return(
            <div>
                <Form>
                    <Row>
                        <Col>
                            <Camera
                                onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                            />
                        </Col>
                        <Col>
                            Nombre: <Input type="text" name="name" onChange={this.handleChange} value={this.state.name} /><br />
                            Primer apellido: <Input type="text" name="lastname1" onChange={this.handleChange} value={this.state.lastname1} /><br />
                            Segundo apellido: <Input type="text" name="lastname2" onChange={this.handleChange} value={this.state.lastname2} /><br />
                        </Col>
                    </Row>
                    <FormGroup check inline>
                        <Label check>T.I</Label>
                        <Input type="radio" value="Tarjeta de identidad" checked={this.state.document === "Tarjeta de identidad"} onChange={this.handleDocumentRadio} />
                    </FormGroup>
                    <FormGroup check inline>
                        <Label check>C.C</Label>
                        <Input type="radio" value="Cedula de ciudadania" checked={this.state.document === "Cedula de ciudadania"} onChange={this.handleDocumentRadio} />
                    </FormGroup>
                    <FormGroup check inline>
                        <Label check>C.E</Label>
                        <Input type="radio" value="Cedula de extranjeria" checked={this.state.document === "Cedula de extranjeria"} onChange={this.handleDocumentRadio} />
                    </FormGroup>
                    <FormGroup check inline>
                        <Label check>NIT</Label>
                        <Input type="radio" value="NIT" checked={this.state.document === "NIT"} onChange={this.handleDocumentRadio} />
                    </FormGroup>
                    <Input type="text" name="id" onChange={this.handleChange} value={this.state.id} /><br />
                    Documento escaneado: <input type="file" name="documentscan" onChange={this.handleDocument}/><br />
                    Sexo:
                    <Input type="select" name="gender" value={this.state.gender} onChange={this.handleChange} required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Masculino">Masculino</option> 
                        <option value="Femenino">Femenino</option>
                    </Input><br />
                    ¿Tiene Sisben?:
                    <Input type="select" name="health" value={this.state.health} onChange={this.handleChange} required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Sí">Sí</option> 
                        <option value="No">No</option>
                    </Input><br />
                    Fecha de nacimiento: <Input type="date" name="birth" onChange={this.handleChange} value={this.state.birth} /><br />
                    Dirección: <br />
                    <FormGroup inline>
                        <Input type="select" name="via" value={this.state.via} onChange={this.handleChange} required>
                            <option value="" disabled selected>Selecione...</option>
                            <option value="calle">Calle</option>
                            <option value="carrera">Carrera</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="number1" onChange={this.handleChange} value={this.state.number1} /> 
                    </FormGroup>
                    # <Input type="text" name="number2" onChange={this.handleChange} value={this.state.number2} /> 
                    - <Input type="text" name="number3" onChange={this.handleChange} value={this.state.number3} />
                    , <Input type="text" name="house" onChange={this.handleChange} value={this.state.house} /><br />
                    Departamento:
                    <Input type="select" name="department" value={this.state.department} onChange={this.handleDepartments} required>
                        <option value="" disabled selected>Departamento ...</option>
                        {
                            this.state.departments.map((item,i)=> <option value={item} key={i}>{item}</option> )
                        }   
                    </Input><br />              
                    Municipio:
                    <Input type="select" name="city" value={this.state.city} onChange={this.handleChange} required>
                        <option value="" disabled selected>Municipio ...</option>  
                        {
                            this.state.cities.map((item, i) => <option value={item} key={i+32}>{item}</option>)
                        }
                    </Input><br />
                    Barrio: <Input type="text" name="neighborhood" onChange={this.handleChange} value={this.state.neighborhood} /><br />
                    Teléfono: <Input type="number" name="phone" onChange={this.handleChange} value={this.state.phone} /><br />
                    Celular: <Input type="number" name="celphone" onChange={this.handleChange} value={this.state.celphone} /><br />
                    Correo electrónico: <Input type="text" name="email" onChange={this.handleChange} value={this.state.email} /><br />
                    Facebook: <Input type="text" name="facebook" onChange={this.handleChange} value={this.state.facebook} /><br />
                    Instagram: <Input type="text" name="instagram" onChange={this.handleChange} value={this.state.instagram} /><br />
                    Twitter: <Input type="text" name="twitter" onChange={this.handleChange} value={this.state.twitter} /><br />
                    Discapacidad: 
                    <Input type="radio" name="disability" value="Deficiencia visual" />Deficiencia visual
                    <Input type="radio" name="disability" value="Deficiencia auditiva" />Deficiencia auditiva
                    <Input type="radio" name="disability" value="Discapacidad motriz" />Discapacidad motriz
                    <Input type="radio" name="disability" value="Otro" />Otro<Input type="text" name="Otro" onChange={this.handleChange} value={this.state.other} /><br />
                    Educación:
                    <Input type="select" name="education" value={this.state.education} onChange={this.handleChange} required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Primaria">Primaria</option> 
                        <option value="Bachillerato">Bachillerato</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Tecnólogo">Tecnólogo</option>
                        <option value="Pregrado">Pregrado</option>
                        <option value="Postgrado">Postgrado</option>
                    </Input><br /> 
                    Profesión: <Input type="text" name="job" onChange={this.handleChange} value={this.state.job} /><br />
                    Áreas de interés (Máximo 5):
                    <Input type="checkbox" name="interest1" value="Tecnología" />Tecnología
                    <Input type="checkbox" name="interest2" value="Electrónica" />Electrónica
                    <Input type="checkbox" name="interest3" value="Carpintería" />Carpintería
                    <Input type="checkbox" name="interest4" value="Contabilidad" />Contabilidad<br />
                    <Input type="checkbox" name="interest5" value="Finanzas" />Finanzas
                    <Input type="checkbox" name="interest6" value="Programación" />Programación
                    <Input type="checkbox" name="interest7" value="Construcción" />Construcción
                    <Input type="checkbox" name="interest8" value="Música" />Música<br />
                    Nombre persona interesada 1: <Input tyrpe="text" name="newnamecontact1" onChange={this.handleChange} value={this.state.newnamecontact1} /><br />
                    Teléfono persona interesada 1: <Input tyrpe="text" name="newphonecontact1" onChange={this.handleChange} value={this.state.newphonecontact1} /><br />
                    Nombre persona interesada 2: <Input tyrpe="text" name="newnamecontact2" onChange={this.handleChange} value={this.state.newnamecontact2} /><br />
                    Teléfono persona interesada 2: <Input tyrpe="text" name="newphonecontact2" onChange={this.handleChange} value={this.state.newphonecontact2} /><br />
                    <Button onClick={this.handleSubmit}>Enviar</Button>
                </Form>
            </div>
        );
    }


}

export default Formu;