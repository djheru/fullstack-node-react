import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
  const fields = formFields.map(({name, label}, i) => {
    return (
      <div key={i}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        { fields }
      </div>
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}>
        Back
      </button>
      <button
        className="green btn right white-text"
        onClick={() => submitSurvey(formValues, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  const {form: { surveyForm: { values: formValues }}} = state;
 return { formValues };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
