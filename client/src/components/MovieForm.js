import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const Basic = ({ touched, errors, tos }) => {
  return (
    <Form>
      <div>
        <Field type='text' name='title' placeholder='title' />
        {touched.title && errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <Field type='text' name='director' placeholder='director' />
        {touched.director && errors.director && <p>{errors.director}</p>}
      </div>
      <div>
        <Field type='text' name='metascore' placeholder='metascore' />
        {touched.metascore && errors.metascore && <p>{errors.metascore}</p>}
      </div>
      <div>
        <Field type='text' name='actors' placeholder='actors' />
        {touched.actors && errors.actors && <p>{errors.actors}</p>}
      </div>
      <button type='submit'>submit</button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues(props) {
    return {
      title: props.title || '',
      director: props.director || '',
      metascore: props.metascore || '',
      actors: props.actors || '',
      subFun: props.subFun
    };
  },

  validationSchema: Yup.object().shape({
    title: Yup
      .string()
      .required("title can't be empty"),
    director: Yup
      .string()
      .required("title can't be empty"),
    metascore: Yup
      .number()
      .min(0, "cannot have negative score")
      .max(100, "max score is 100")
      .required("score required"),
    actors: Yup
      .string()
  }),

  handleSubmit(vals, { resetForm }) {
    vals.subFun(vals);
    resetForm();
  }
})(Basic);