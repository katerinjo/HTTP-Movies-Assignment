import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const update = movie => {
  console.log(movie)
  axios
    .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then(console.log)
    .catch(console.log)
};

const Basic = ({ touched, errors }) => {
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
        <Field type='text' name='stars' placeholder='stars' />
        {touched.stars && errors.stars && <p>{errors.stars}</p>}
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
      stars: props.stars || '',
      id: props.match.params.id,
      subFun: update
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
      .min(0, 'cannot have negative score')
      .max(100, 'max score is 100')
      .required('score required'),
    actors: Yup
      .string()
  }),

  handleSubmit(vals, { resetForm }) {
    const movie = {
      id: vals.id,
      title: vals.title,
      director: vals.director,
      metascore: vals.metascore,
      stars: vals.stars.split(',')
    };
    vals.subFun(movie);
    resetForm();
  }
})(Basic);