import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import firebase from '../firebase';

class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            lastname1: "",
            lastname2: "",
            document: "",
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
            address: {},
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
        this.onTakePhoto = this.onTakePhoto.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        // Do stuff with the dataUri photo...
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
        console.log(this.state)
    }
    handleDepartments(e){
        this.setState({
            [e.target.name]: e.target.value,
            city: ""
        })
        this.getDepartmentCities(e.target.value)

    }
    handleSubmit(e){
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
        })

        firebase.storage().ref().child('fotos/'+this.state.id).putString(this.state.photo, 'data_url')
    }
    render(){
        return(
            <div>
                <Camera
                    onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                />
                <form>
                    Nombre: <input type="text" name="name" onChange={this.handleChange} value={this.state.name} /><br />
                    Primer apellido: <input type="text" name="lastname1" onChange={this.handleChange} value={this.state.lastname1} /><br />
                    Segundo apellido: <input type="text" name="lastname2" onChange={this.handleChange} value={this.state.lastname2} /><br />
                    Documento:
                    <input type="radio" value="Tarjeta de identidad" checked={this.state.document === "Tarjeta de identidad"} onChange={this.handleDocumentRadio} />T.I
                    <input type="radio" value="Cedula de ciudadania" checked={this.state.document === "Cedula de ciudadania"} onChange={this.handleDocumentRadio} /> C.C
                    <input type="radio" value="Cedula de extranjeria" checked={this.state.document === "Cedula de extranjeria"} onChange={this.handleDocumentRadio} /> C.E 
                    <input type="radio" value="NIT" checked={this.state.document === "NIT"} onChange={this.handleDocumentRadio} /> NIT 
                    <input type="text" name="id" onChange={this.handleChange} value={this.state.id} /><br />
                    Sexo:
                    <select name="gender" value={this.state.gender} onChange={this.handleChange} required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Masculino">Masculino</option> 
                        <option value="Femenino">Femenino</option>
                    </select><br />
                    ¿Tiene Sisben?:
                    <select name="health" value={this.state.health} onChange={this.handleChange} required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Sí">Sí</option> 
                        <option value="No">No</option>
                    </select><br />
                    Fecha de nacimiento: <input type="date" name="birth" onChange={this.handleChange} value={this.state.birth} /><br />
                    Dirección: <br />
                    <select name="via" value={this.state.via} onChange={this.handleChange} required>
                        <option value="" disabled selected>Selecione...</option>
                        <option value="calle">Calle</option>
                        <option value="carrera">Carrera</option>
                    </select>
                    <input type="text" name="number1" onChange={this.handleChange} value={this.state.number1} /> 
                    # <input type="text" name="number2" onChange={this.handleChange} value={this.state.number2} /> 
                    - <input type="text" name="number3" onChange={this.handleChange} value={this.state.number3} />
                    , <input type="text" name="house" onChange={this.handleChange} value={this.state.house} /><br />
                    Departamento:
                    <select name="department" value={this.state.department} onChange={this.handleDepartments} required>
                        <option value="" disabled selected>Departamento ...</option>
                        {
                            this.state.departments.map((item,i)=> <option value={item} key={i}>{item}</option> )
                        }   
                    </select><br />              
                    Municipio:
                    <select name="city" value={this.state.city} onChange={this.handleChange} required>
                        <option value="" disabled selected>Municipio ...</option>  
                        {
                            this.state.cities.map((item, i) => <option value={item} key={i+32}>{item}</option>)
                        }
                    </select><br />
                    Barrio: <input type="text" name="neighborhood" onChange={this.handleChange} value={this.state.neighborhood} /><br />
                    Teléfono: <input type="text" name="phone" onChange={this.handleChange} value={this.state.phone} /><br />
                    Celular: <input type="text" name="celphone" onChange={this.handleChange} value={this.state.celphone} /><br />
                    Correo electrónico: <input type="text" name="email" onChange={this.handleChange} value={this.state.email} /><br />
                    Facebook: <input type="text" name="facebook" onChange={this.handleChange} value={this.state.facebook} /><br />
                    Instagram: <input type="text" name="instagram" onChange={this.handleChange} value={this.state.instagram} /><br />
                    Twitter: <input type="text" name="twitter" onChange={this.handleChange} value={this.state.twitter} /><br />
                    Discapacidad: 
                    <input type="radio" name="disability" value="Deficiencia visual" />Deficiencia visual
                    <input type="radio" name="disability" value="Deficiencia auditiva" />Deficiencia auditiva
                    <input type="radio" name="disability" value="Discapacidad motriz" />Discapacidad motriz
                    <input type="radio" name="disability" value="Otro" />Otro<input type="text" name="Otro" onChange={this.handleChange} value={this.state.other} /><br />
                    Educación:
                    <select name="education" value={this.state.education} onChange={this.handleChange} required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Primaria">Primaria</option> 
                        <option value="Bachillerato">Bachillerato</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Tecnólogo">Tecnólogo</option>
                        <option value="Pregrado">Pregrado</option>
                        <option value="Postgrado">Postgrado</option>
                    </select><br /> 
                    Profesión: <input type="text" name="job" onChange={this.handleChange} value={this.state.job} /><br />
                    Áreas de interés (Máximo 5):
                    <input type="checkbox" name="interest1" value="Tecnología" />Tecnología
                    <input type="checkbox" name="interest2" value="Electrónica" />Electrónica
                    <input type="checkbox" name="interest3" value="Carpintería" />Carpintería
                    <input type="checkbox" name="interest4" value="Contabilidad" />Contabilidad<br />
                    <input type="checkbox" name="interest5" value="Finanzas" />Finanzas
                    <input type="checkbox" name="interest6" value="Programación" />Programación
                    <input type="checkbox" name="interest7" value="Construcción" />Construcción
                    <input type="checkbox" name="interest8" value="Música" />Música<br />
                    Nombre persona interesada 1: <input tyrpe="text" name="newnamecontact1" onChange={this.handleChange} value={this.state.newnamecontact1} /><br />
                    Teléfono persona interesada 1: <input tyrpe="text" name="newphonecontact1" onChange={this.handleChange} value={this.state.newphonecontact1} /><br />
                    Nombre persona interesada 2: <input tyrpe="text" name="newnamecontact2" onChange={this.handleChange} value={this.state.newnamecontact2} /><br />
                    Teléfono persona interesada 2: <input tyrpe="text" name="newphonecontact2" onChange={this.handleChange} value={this.state.newphonecontact2} /><br />
                </form>
                <button onClick={this.handleSubmit}>Enviar</button>
            </div>
        );
    }


}

export default Form;