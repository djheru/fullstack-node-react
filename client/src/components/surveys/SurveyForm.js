import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
  {label: 'Survey Title', name: 'title'},
  {label: 'Subject Line', name: 'subject'},
  {label: 'Email Body', name: 'body'},
  {label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {

  renderFields() {
    let key = 0;
    return (
      <div>
        {
          FIELDS.map(({label, name}) => (
            <Field
              key={key++}
              label={label}
              type="text"
              name={name}
              component={SurveyField}/>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit((values) => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
          <button className="teal btn-flat right white-text" type="submit">
            <i className="material-icons right">done</i>
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
