import React, { Component } from 'react';

class SurveyField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {input, label, meta: {touched, error}} = this.props;
    return (
      <div>
        <label>{label}</label>
        <input {...input} style={{ marginBottom: '5px' }} />
        <div className="red-text" style={{ marginBottom: '20px' }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

export default SurveyField;
