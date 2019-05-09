import React, { Component } from 'react';


class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: "",
            lastname1: "",
            lastname2: "",
            document: "",
            id: "",
            gender: "",
            birth: "",
            email: "",
            phone: "",
            celphone: "",
            address: {},
            neighborhood: "",
            city: "",
            department: "",
            departments: [],
            health: "",
            interest: [],
            facebook: "",
            instagram: "",
            twitter: "",
            disability: [],
            education: "",
            job: "",
            languages: {},
            namecontact: "",
            phonecontact: "",
            newnamecontact1:"",
            newphonecontact1:"",
            newnamecontact2: "",
            newphonecontact2: "",
        }
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
            console.log(this.state.departments);
        })
    }
    render(){
        return(
            <div>
                <form>
                    Nombre: <input type="text" name="name" /><br />
                    Primer apellido: <input type="text" name="lastname1" /><br />
                    Segundo apellido: <input type="text" name="lastname2" /><br />
                    Documento:
                    <input type="radio" name="document" value="Tarjeta de identidad" />T.I
                    <input type="radio" name="document" value="Cedula de ciudadania" /> C.C
                    <input type="radio" name="document" value="Cedula de extranjeria" /> C.E 
                    <input type="radio" name="document" value="NIT" /> NIT 
                    <input type="text" name="id" /><br />
                    Sexo:
                    <select name="gender" required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Masculino">Masculino</option> 
                        <option value="Femenino">Femenino</option>
                    </select><br />
                    ¿Tiene Sisben?:
                    <select name="health" required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Sí">Sí</option> 
                        <option value="No">No</option>
                    </select><br />
                    Fecha de nacimiento: <input type="date" name="birth" /><br />
                    Dirección: <br />
                    <select required>
                        <option value="calle">Calle</option>
                        <option value="carrera">Carrera</option>
                    </select>
                    <input type="text" /> # <input type="text" /> - <input type="text" />, <input type="text" /><br />
                    Departamento:
                    <select name="department" onChange={this.getCities} value={this.state.department} required>
                        <option value="" disabled selected>Departamento ...</option>
                        {
                            this.state.departments.map((item,i)=> <option value={item} key={i}>{item}</option> )
                        }   
                    </select><br />              
                    Municipio:
                    <select required>
                        <option value="city">Municipio ...</option>  
                    </select><br />
                    Barrio: <input type="text" name="neighborhood" /><br />
                    Teléfono: <input type="text" name="phone" /><br />
                    Celular: <input type="text" name="celphone" /><br />
                    Correo electrónico: <input type="text" name="email" /><br />
                    Facebook: <input type="text" name="facebook" /><br />
                    Instagram: <input type="text" name="instagram" /><br />
                    Twitter: <input type="text" name="twitter" /><br />
                    Discapacidad: 
                    <input type="radio" name="disability" value="Ceguera" />Ceguera
                    <input type="radio" name="disability" value="Sordera" />Sordera
                    <input type="radio" name="disability" value="Deficiencia visual" />Deficiencia visual
                    <input type="radio" name="disability" value="Deficiencia auditiva" />Deficiencia auditiva
                    <input type="radio" name="disability" value="Discapacidad motriz" />Discapacidad motriz
                    <input type="radio" name="disability" value="Otro" />Otro<input type="text" name="Otro" /><br />
                    Educación:
                    <select name="education" required>
                        <option value="" disabled selected>Seleccione...</option>
                        <option value="Primaria">Primaria</option> 
                        <option value="Bachillerato">Bachillerato</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Tecnólogo">Tecnólogo</option>
                        <option value="Pregrado">Pregrado</option>
                        <option value="Postgrado">Postgrado</option>
                    </select><br /> 
                    Profesión: <input type="text" name="job" /><br />
                    Áreas de interés:
                    <input type="checkbox" name="interest1" value="Tecnología" />Tecnología
                    <input type="checkbox" name="interest2" value="Electrónica" />Electrónica
                    <input type="checkbox" name="interest3" value="Carpintería" />Carpintería
                    <input type="checkbox" name="interest4" value="Contabilidad" />Contabilidad<br />
                    <input type="checkbox" name="interest5" value="Finanzas" />Finanzas
                    <input type="checkbox" name="interest6" value="Programación" />Programación
                    <input type="checkbox" name="interest7" value="Construcción" />Construcción
                    <input type="checkbox" name="interest8" value="Música" />Música<br />
                    Nombre persona interesada 1: <input tyrpe="text" name="newnamecontact1" /><br />
                    Teléfono persona interesada 1: <input tyrpe="text" name="newphonecontact1" /><br />
                    Nombre persona interesada 2: <input tyrpe="text" name="newnamecontact2" /><br />
                    Teléfono persona interesada 2: <input tyrpe="text" name="newphonecontact2" /><br />
                    <button type="button">Click Me!</button>
                </form>
            </div>
        );
    }


}

export default Form;