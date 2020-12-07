import React, { Component } from 'react'
import { Form, Checkbox } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';

import '../Styles/Components/CheckboxComp.css';


export default class CheckboxComp extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <Form style={{marginTop:"20px"}}>
        <Form.Field>
          Richtige Antwort(en) ankreuzen:

        </Form.Field>
        <Form.Field className="Ff" style={{marginTop:"10px"}}>
          <Checkbox
            radio
            label="A"
            name='checkboxRadioGroup'
            value='this'
            checked={this.state.value === 'this'}
            onChange={this.handleChange}
          />
          <TextField style={{width: "100%"}}
                id="outlined-multiline-static"
                label="Antwortmöglichkeit A"
                defaultValue=""
                variant="outlined"
              />
        </Form.Field>
        <Form.Field className="Ff"style={{marginTop:"20px"}}>
          <Checkbox
            radio
            label="B"
            name='checkboxRadioGroup'
            value='that'
            checked={this.state.value === 'that'}
            onChange={this.handleChange}
          />
          <TextField style={{width: "100%"}}
                id="outlined-multiline-static"
                label="Antwortmöglichkeit B"
                defaultValue=""
                variant="outlined"
              />
        </Form.Field>
        <Form.Field className="Ff"style={{marginTop:"20px"}}>
          <Checkbox
            radio
            label="C"
            name='checkboxRadioGroup'
            value='123'
            checked={this.state.value === '123'}
            onChange={this.handleChange}
          />
          <TextField style={{width: "100%"}}
                id="outlined-multiline-static"
                label="Antwortmöglichkeit C"
                defaultValue=""
                variant="outlined"
              />
        </Form.Field>
        <Form.Field className="Ff" style={{marginTop:"20px"}}>
          <Checkbox
            radio
            label="D"
            name='checkboxRadioGroup'
            value='456'
            checked={this.state.value === '456'}
            onChange={this.handleChange}
          />
          <TextField style={{width: "100%"}}
                id="outlined-multiline-static"
                label="Antwortmöglichkeit D"

                defaultValue=""
                variant="outlined"
              />

        </Form.Field>
      </Form>
    )
  }
}
