import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

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

function validate(values) {
  const errors = {};
  errors.emails = validateEmails(values.emails || '');
  FIELDS.forEach(({name}) => {
    if (!values[name]) {
      errors[name] = `You must provide a value for ${name}`;
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
