import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required').min(10, 'Message must be at least 10 characters'),
  rating: Yup.number().required('Required').min(1).max(5),
});

function Feedback() {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    // Here you would typically make an API call to submit feedback
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Feedback</h2>
      <Formik
        initialValues={{ name: '', email: '', message: '', rating: '' }}
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
              <label className="block mb-1">Message</label>
              <Field
                name="message"
                as="textarea"
                className="w-full p-2 border rounded h-32"
              />
              <ErrorMessage name="message" component="div" className="text-red-500" />
            </div>

            <div>
              <label className="block mb-1">Rating (1-5)</label>
              <Field name="rating" type="number" min="1" max="5" className="w-full p-2 border rounded" />
              <ErrorMessage name="rating" component="div" className="text-red-500" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Feedback;