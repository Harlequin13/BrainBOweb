import React, { Component } from 'react'
import Select from 'react-select';


import '../Styles/Components/CheckboxComp.css';
import {db} from "../firebase";

export default class DropdownTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options:'',
      selectedOption:'',
      title:''
      };
  }

  componentDidMount() {
    console.log(this.props.selectedOption);
    console.log(this.props.title);
   db.collection(this.props.title)
     .doc(this.props.selectedOption)
     .collection('Topics')
     .get()
     .then(querySnapshot => {
       const data = querySnapshot.docs.map(doc => doc.data());
       console.log(data);
       this.setState({ options: data});

     });
 }

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
  };
  render() {
    console.log(this.props.selectedOption);
    const {options} = this.state;
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
