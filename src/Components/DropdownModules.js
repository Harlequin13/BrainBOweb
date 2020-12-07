import React, { Component } from 'react'
import Select from 'react-select';


import '../Styles/Components/CheckboxComp.css';
import {db} from "../firebase";

export default class DropdownModules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options:'',
      selectedOption:'',
      title:''
      };
  }

  componentDidMount() {
   db.collection(this.props.title)
     .get()
     .then(querySnapshot => {
       const data = querySnapshot.docs.map(doc => doc.data());
       console.log(data);
       this.setState({ options: data });
     });
 }

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
  };

  render() {
    const {options} = this.state;
    const moduleSelected = this.state.selectedOption;
    return (
      <Select
        name="form-field-name"
        value={this.state.selectedOption||""}
        onChange={this.handleChange.bind(this)}
        options={options}
      />
    )
  }
}
