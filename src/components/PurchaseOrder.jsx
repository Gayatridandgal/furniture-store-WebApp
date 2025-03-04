import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  customerName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Required'),
  items: Yup.array().of(
    Yup.object({
      productId: Yup.string().required('Required'),
      quantity: Yup.number().min(1, 'Minimum 1').required('Required'),
    })
  ),
});

const products = [
  { id: '1', name: 'Sofa Set', price: 25000 },
  { id: '2', name: 'Dining Table', price: 15000 },
  { id: '3', name: 'Bed', price: 20000 },
  { id: '4', name: 'Wardrobe', price: 18000 },
];

function PurchaseOrder() {
  const [orderSummary, setOrderSummary] = useState(null);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const total = calculateTotal(values.items);
    setOrderSummary({ ...values, total });
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Purchase Order</h2>
      
      <Formik
        initialValues={{
          customerName: '',
          email: '',
          address: '',
          phone: '',
          items: [{ productId: '', quantity: 1 }],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Customer Name</label>
                <Field name="customerName" type="text" className="w-full p-2 border rounded" />
                <ErrorMessage name="customerName" component="div" className="text-red-500" />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <Field name="email" type="email" className="w-full p-2 border rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
            </div>

            <div>
              <label className="block mb-1">Address</label>
              <Field name="address" as="textarea" className="w-full p-2 border rounded" />
              <ErrorMessage name="address" component="div" className="text-red-500" />
            </div>

            <div>
              <label className="block mb-1">Phone</label>
              <Field name="phone" type="tel" className="w-full p-2 border rounded" />
              <ErrorMessage name="phone" component="div" className="text-red-500" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Order Items</h3>
              {values.items.map((_, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Product</label>
                    <Field
                      name={`items.${index}.productId`}
                      as="select"
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select a product</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ₹{product.price}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name={`items.${index}.productId`} component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label className="block mb-1">Quantity</label>
                    <Field
                      name={`items.${index}.quantity`}
                      type="number"
                      min="1"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage name={`items.${index}.quantity`} component="div" className="text-red-500" />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </Form>
        )}
      </Formik>

      {orderSummary && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <p><strong>Customer:</strong> {orderSummary.customerName}</p>
          <p><strong>Total Amount:</strong> ₹{orderSummary.total}</p>
        </div>
      )}
    </div>
  );
}

export default PurchaseOrder;