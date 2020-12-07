import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import { Form, Checkbox } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';
import '../Styles/Components/CheckboxComp.css';

import { getData, generateNewExcercise, generateTestData } from "../firebase";



export default class Content extends Component {
  constructor() {
      super();
      this.state = {
        moduleData: {},
        selectedOption: '',
        selectedOption2: '',
        initialOption2: '',
        dropDownOptions1: {},
        dropDownOptions2: {},
        answer: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        question: '',
      };
    }

    componentDidMount() {
      this.setDropDownOptions1();
    }

    handleChange1 = async (selectedOption) => {
       await this.setState({selectedOption});
       await this.setDropDownOptions2();
       this.setState({selectedOption2: this.state.initialOption2});
     };

     handleChange2 = async (selectedOption2) => {
       await this.setState({selectedOption2})
     }

     handleQuestionChange = async (e) => {
       await this.setState({question: e.target.value});
       await console.log(this.state.question);
     };

     handleChangeCheckbox = async(e, { value }) => {
       await this.setState({ value });
       await this.setState({answer: value});
       await console.log(this.state.answer);
     };

     handleChangeOption1 = async (e) => {
       await this.setState({option1: e.target.value});
       await console.log(this.state.option1);
     };

     handleChangeOption2 = async (e) => {
       await this.setState({option2: e.target.value});
       await console.log(this.state.option2);
     };

     handleChangeOption3 = async (e) => {
       await this.setState({option3: e.target.value});
       await console.log(this.state.option3);
     };

     handleChangeOption4 = async (e) => {
       await this.setState({option4: e.target.value});
       await console.log(this.state.option4);
     };
     setTest = async () => {
       generateTestData();
     }

     setData =  async (number) => {
       const dropdown1 = this.state.selectedOption.value;
       const dropdown2 = this.state.selectedOption2.value;
       const temp = parseInt(Object.keys(this.state.moduleData[dropdown1][dropdown2]).length)+1;

       console.log("dataLength: ", temp);
       await generateNewExcercise(
         dropdown1,
         dropdown2,
         temp,
         this.state.answer,
         this.state.option1,
         this.state.option2,
         this.state.option3,
         this.state.option4,
         this.state.question
       );

      await this.setState({
      selectedOption: '',
      selectedOption2: '',
      initialOption2: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      question: '',
      });
      await window.scrollTo(0, 0);

      await this.setDropDownOptions1();
      };



   setDropDownOptions1(){
     getData().then(data=>{
      // console.log("data", data);
       this.setState({moduleData : data});
       const dropDownOptions1 = [];
       console.log("data:",data);
       Object.keys(data).forEach((item) => {
          const fill = {value: item, label: item}
          dropDownOptions1.push(fill);

       });
       this.setState({dropDownOptions1: dropDownOptions1})
       console.log("dropDownOptions1:",dropDownOptions1);
     })
   }

   setDropDownOptions2(){

     const dropDownOptions2 = [];
     const temp = this.state.selectedOption.value;
     console.log("Java1:", temp);
     console.log("data:", this.state.moduleData[temp]);
     Object.keys(this.state.moduleData[temp]).forEach((item) => {
        const fill = {value: item, label: item}
        dropDownOptions2.push(fill);

     })
     this.setState({dropDownOptions2: dropDownOptions2})
     console.log("dropDownOptions2:",dropDownOptions2);
   }



 render(){

      return (
        <Container fluid className="app">
         <Row className="new-task">
           <Col lg="12"><h1 style={{display: "flex", justifyContent:"center",fontSize:"30pt", fontWeight:"bold", flex:1, marginTop:"20px", color:'black'}}>Neue Aufgabe hinzufügen</h1></Col>
         </Row>
         <Row className="content">
           <Col xl={{span: 10, offset: 1}} lg={{span: 10, offset: 1}} md={{span: 10, offset: 1}} style={{marginTop:"30px"}}>
              <div className="Container">
                <p className="Heading">Module</p>
                    <Select
                       placeholder="Select Module ..."
                       name="form-field-name"
                       value={this.state.selectedOption}
                       onChange={this.handleChange1}
                       options={this.state.dropDownOptions1}
                     />
                </div>
                <div className="Container">
                  <p className="Heading" style={{marginTop:"10px"}}>Thema</p>
                  <Select
                    placeholder="Select Topic ..."
                    name="form-field-name"
                    value={this.state.selectedOption2}
                    onChange={this.handleChange2}
                    options={this.state.dropDownOptions2}
                  />
                </div>
                <Form className="Container" style={{marginTop:"30px"}}>
                <p style={{marginBottom:"2px"}}>Aufgabenstellung</p>
                <TextField style={{width: "100%"}}
                      id="outlined-multiline-static"
                      label=""
                      multiline
                      rows={8}
                      variant="outlined"
                      onChange={this.handleQuestionChange}
                      value={this.state.question}
                    />
                </Form>
                <div className="Container" >
                <Form style={{marginTop:"20px"}}>
                  <Form.Field>
                    Antwortmöglichkeiten eintragen & richtige Antwort ankreuzen:

                  </Form.Field>
                  <Form.Field className="Ff" style={{marginTop:"10px"}}>
                    <Checkbox
                      radio
                      label="A"
                      name='checkboxRadioGroup'
                      value='option1'
                      checked={this.state.value === 'option1'}
                      onChange={this.handleChangeCheckbox}
                    />
                    <TextField style={{width: "100%"}}
                          id="outlined-multiline-static"
                          label="Antwortmöglichkeit A"
                          value={this.state.option1}
                          onChange={this.handleChangeOption1}
                          variant="outlined"
                        />
                  </Form.Field>
                  <Form.Field className="Ff"style={{marginTop:"20px"}}>
                    <Checkbox
                      radio
                      label="B"
                      name='checkboxRadioGroup'
                      value='option2'
                      checked={this.state.value === 'option2'}
                      onChange={this.handleChangeCheckbox}
                    />
                    <TextField style={{width: "100%"}}
                          id="outlined-multiline-static"
                          label="Antwortmöglichkeit B"
                          value={this.state.option2}
                          onChange={this.handleChangeOption2}
                          variant="outlined"
                        />
                  </Form.Field>
                  <Form.Field className="Ff"style={{marginTop:"20px"}}>
                    <Checkbox
                      radio
                      label="C"
                      name='checkboxRadioGroup'
                      value='option3'
                      checked={this.state.value === 'option3'}
                      onChange={this.handleChangeCheckbox}
                    />
                    <TextField style={{width: "100%"}}
                          id="outlined-multiline-static"
                          label="Antwortmöglichkeit C"
                          value={this.state.option3}
                          onChange={this.handleChangeOption3}
                          variant="outlined"
                        />
                  </Form.Field>
                  <Form.Field className="Ff" style={{marginTop:"20px"}}>
                    <Checkbox
                      radio
                      label="D"
                      name='checkboxRadioGroup'
                      value='option4'
                      checked={this.state.value === 'option4'}
                      onChange={this.handleChangeCheckbox}
                    />
                    <TextField style={{width: "100%"}}
                          id="outlined-multiline-static"
                          label="Antwortmöglichkeit D"
                          value={this.state.option4}
                          onChange={this.handleChangeOption4}
                          variant="outlined"
                        />
                  </Form.Field>
                </Form>
                </div>
                <div>

                <button onClick={this.setData} style={{marginTop:"40px", background:"#D02C29"}} className = "w-full py-3 bg-red-600 mt-4 text-white">Send</button>
                </div>
              {  /*<div> VORSICHT LÄDT JSON AUS FIREBASE.JS IN DB
                <button onClick={this.setTest} style={{marginTop:"40px", background:"#D02C29"}} className = "w-full py-3 bg-red-600 mt-4 text-white">AA</button>
                </div>*/}

            </Col>
          </Row>
        </Container>

    );
  }
}
