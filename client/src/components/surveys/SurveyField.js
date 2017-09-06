import React, { Component } from 'react';

class SurveyField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {input, label} = this.props;
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  }
}

export default SurveyField;
