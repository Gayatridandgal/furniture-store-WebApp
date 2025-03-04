import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Required'),
});

function Registration() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    // Here you would typically make an API call to register the user
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Registration</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <Field name="name" type="text" className="w-full p-2 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <Field name="email" type="email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <Field name="password" type="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            <div>
              <label className="block mb-1">Phone</label>
              <Field name="phone" type="tel" className="w-full p-2 border rounded" />
              <ErrorMessage name="phone" component="div" className="text-red-500" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;