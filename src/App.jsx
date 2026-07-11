import React, { useState } from "react";
import "./animate.css";
import { Printer, Plus, Minus } from "lucide-react";
import moment from "moment";
import {
  Tooltip,
  Drawer,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Space,
  InputNumber,
  Divider,
} from "antd";

const App = () => {
  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [form] = Form.useForm();

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const formSchema = [
    {
      label: "Invoice Number",
      name: "invoiceNumber",
      placeholder: "Enter invoice number",
      required: true,
    },
    {
      label: "Invoice Date",
      name: "invoiceDate",
      placeholder: "Enter invoice date",
      required: true,
    },
    {
      label: "Company Name",
      name: "companyName",
      placeholder: "Enter company name",
      required: true,
    },
    {
      label: "Company Website",
      name: "companyWebsite",
      placeholder: "Enter company website",
      required: true,
    },
    {
      label: "Company Email",
      name: "companyEmail",
      placeholder: "Enter company email",
      required: true,
    },
    {
      label: "Company Address",
      name: "companyAddress",
      placeholder: "Enter company address",
      required: true,
    },
    {
      label: "Company State",
      name: "companyState",
      type: "text",
      placeholder: "Enter company state",
      required: true,
    },
    {
      label: "Company Country",
      name: "companyCountry",
      type: "text",
      placeholder: "Enter company country",
      required: true,
    },
    {
      label: "Company Pincode",
      name: "companyPincode",
      type: "text",
      placeholder: "Enter company pincode",
      required: true,
    },
    {
      label: "Company GST Number",
      name: "companyGSTNumber",
      type: "text",
      placeholder: "Enter company GST number",
      required: true,
    },
    {
      label: "Customer Name",
      name: "customerName",
      placeholder: "Enter customer name",
      required: true,
    },
    {
      label: "Customer Email",
      name: "customerEmail",
      placeholder: "Enter customer email",
      required: true,
    },
    {
      label: "Customer Address",
      name: "customerAddress",
      placeholder: "Enter customer address",
      required: true,
    },
    {
      label: "Customer State",
      name: "customerState",
      type: "text",
      placeholder: "Enter customer state",
      required: true,
    },
    {
      label: "Customer Country",
      name: "customerCountry",
      type: "text",
      placeholder: "Enter customer country",
      required: true,
    },
    {
      label: "Customer Pincode",
      name: "customerPincode",
      type: "text",
      placeholder: "Enter customer pincode",
      required: true,
    },
    {
      label: "Choose payment method",
      name: "paymentMethod",
      type: "text",
      placeholder: "Enter payment method",
      required: true,
      options: [
        { label: "Bank", value: "bank" },
        {
          label: "UPI",
          value: "upi",
        },
        {
          label: "Cash",
          value: "cash",
        },
      ],
    },
    {
      label: "Transaction ID",
      name: "transactionId",
      type: "text",
      placeholder: "Enter transaction ID",
      required: true,
    },
    {
      label: "Due Date",
      name: "dueDate",
      type: "text",
      placeholder: "Enter due date",
      required: true,
    },
    {
      label: "Gst rate",
      name: "gstRate",
      required: true,
    },
  ];
  const onFinish = (values) => {
    values.invoiceDate = moment(values.invoiceDate).format("DD MMM YYYY");
    values.dueDate = moment(values.dueDate).format("DD MMM YYYY");
    values.products = (values.products || []).map((product) => ({
      ...product,
      amount: (product.qty || 0) * (product.rate || 0),
    }));
    values.subTotal = values.products.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    values.tax = (values.subTotal * (values.gstRate || 18)) / 100;
    values.total = values.subTotal + values.tax;
    setInvoice(values);
    handleClose();
    setOpen(false);
  };
  return (
    <div className="bg-gray-200 min-h-screen print:min-h-0 py-6 print:bg-white print:py-0">
      <div className="mx-auto bg-white w-[210mm] min-h-[297mm] p-[15mm] shadow-lg print:shadow-none print:m-0">
        <div className="flex justify-between items-start border-b pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-sm text-gray-500 mt-1">Invoice #INV-{invoice?.invoiceNumber || "0001"}</p>
            <p className="text-sm text-gray-500">Date: {invoice?.invoiceDate || "01 Jan 2026"}</p>
          </div>

          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-800">
              {invoice?.companyName || "ABC Solutions Pvt Ltd"}
            </h2>
            <p className="text-sm text-gray-500">{invoice?.companyWebsite || "www.example.com"}</p>
            <p className="text-sm text-gray-500">{invoice?.companyAddress || "123 Business Street"}</p>
            <p className="text-sm text-gray-500">{invoice?.companyState || "Uttar Pradesh"}, {invoice?.companyCountry || "India"} – {invoice?.companyPincode || "110001"}</p>
            <p className="text-sm text-gray-500">GSTIN: {invoice?.companyGSTNumber || "00ABCDE0000Z0Z0"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              BILL TO
            </h3>
            <p className="text-sm font-medium text-gray-800">
              {invoice?.customerName || "John Doe"}
            </p>
            <p className="text-sm text-gray-500">
              {invoice?.customerAddress || "456 Client Road"}
            </p>
            <p className="text-sm text-gray-500">
              {invoice?.customerState || "Maharashtra"}, {invoice?.customerCountry || "India"} – {invoice?.customerPincode || "400001"}
            </p>
            <p className="text-sm text-gray-500">
              Email: {invoice?.customerEmail || "client@example.com"}
            </p>
          </div>

          <div className="text-right">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              PAYMENT DETAILS
            </h3>
            <p className="text-sm text-gray-500">
              Payment Method: {invoice?.paymentMethod || "Bank Transfer"}
            </p>
            <p className="text-sm text-gray-500">Transaction ID: {invoice?.transactionId || "PAY123456"}</p>
            <p className="text-sm text-gray-500">Due Date: {invoice?.dueDate || "10 Jan 2026"}</p>
          </div>
        </div>

        <div className="mt-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="p-3 border">Description</th>
                <th className="p-3 border text-right">Qty</th>
                <th className="p-3 border text-right">Rate</th>
                <th className="p-3 border text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {invoice?.products?.map((product, index) => (
                <tr key={index}>
                  <td className="p-3 border">{product.item || "Software Development Service"}</td>
                  <td className="p-3 border text-right">{product.qty || 1}</td>
                  <td className="p-3 border text-right">₹{product.rate?.toFixed(2) || "10,000.00"}</td>
                  <td className="p-3 border text-right">₹{product.amount?.toFixed(2) || "10,000.00"}</td>
                </tr>
              ))}
              <tr>
                <td className="p-3 border">GST ({invoice?.gstRate || 18}%)</td>
                <td className="p-3 border text-right">—</td>
                <td className="p-3 border text-right">—</td>
                <td className="p-3 border text-right">₹{invoice?.tax?.toFixed(2) || "1,800.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <div className="w-1/3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">SubTotal</span>
              <span className="text-gray-800">₹{invoice?.subTotal?.toFixed(2) || "10,000.00"}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-800">₹{invoice?.tax?.toFixed(2) || "1,800.00"}</span>
            </div>
            <div className="flex justify-between text-base font-semibold border-t pt-2">
              <span>Total</span>
              <span>₹{invoice?.total?.toFixed(2) || "11,800.00"}</span>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-sm text-gray-500">
          <p>Thank you for your business.</p>
          <p className="mt-1">
            This is a sample invoice generated for demonstration purposes only.
          </p>
        </div>
      </div>
      <div className='print:hidden fixed -translate-y-1/2 top-1/2 left-0 bg-white rounded-r-lg p-4 flex flex-col gap-4 shadow-lg'>
        <Tooltip title="Create a new invoice" className='!print:hidden'>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:scale-105 transition duration-300 active:scale-80"
          >
            <Plus />
          </button>
        </Tooltip>
          <button onClick={() => window.print()} className="bg-blue-500 text-white p-2 rounded hover:scale-105 transition duration-300 active:scale-80">
            <Printer />
          </button>
      </div>
      <Drawer
        open={open}
        onClose={handleClose}
        title="Create a new invoice"
        width={720}
      >
        <div>
          <Form
          form={form}
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-2 gap-x-6"
          >
            {formSchema.map((item) => {
              if (item.name === "gstRate") {
                return (
                  <Form.Item
                    key={item.name}
                    label={
                      <h1 className="font-medium text-base">{item.label}</h1>
                    }
                    name={item.name}
                    rules={[
                      {
                        required: item.required,
                        message: `Please enter ${item.label}`,
                      },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      className="w-full"
                      placeholder="Enter GST Rate"
                    />
                  </Form.Item>
                );
              }
              if (item.name === "invoiceDate" || item.name === "dueDate") {
                return (
                  <Form.Item
                    key={item.name}
                    label={
                      <h1 className="font-medium text-base">{item.label}</h1>
                    }
                    name={item.name}
                    rules={[
                      {
                        required: item.required,
                        message: `Please select ${item.label}`,
                      },
                    ]}
                  >
                    <DatePicker size="large" className="w-full" />
                  </Form.Item>
                );
              }

              if (item.name === "paymentMethod") {
                return (
                  <Form.Item
                    key={item.name}
                    label={
                      <h1 className="font-medium text-base">{item.label}</h1>
                    }
                    name={item.name}
                    rules={[
                      {
                        required: item.required,
                        message: `Please select ${item.label}`,
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      className="w-full"
                      placeholder="Select payment method"
                      options={item.options}
                    />
                  </Form.Item>
                );
              }

              return (
                <Form.Item
                  key={item.name}
                  label={
                    <h1 className="font-medium text-base">{item.label}</h1>
                  }
                  name={item.name}
                  rules={[
                    {
                      required: item.required,
                      message: `Please select ${item.label}`,
                    },
                  ]}
                >
                  <Input size="large" placeholder={item.placeholder} />
                </Form.Item>
              );
            })}
            <Divider className="col-span-2">Product Details</Divider>
            <div className="col-span-2">
              <Form.List name="products">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                        className="w-full"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "item"]}
                          rules={[
                            {
                              required: true,
                              message: "Item is missing",
                            },
                          ]}
                        >
                          <Input placeholder="Item" size="large" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "qty"]}
                          rules={[
                            {
                              required: true,
                              message: "Quantity is missing",
                            },
                          ]}
                        >
                          <InputNumber
                            min={1}
                            className="w-full"
                            placeholder="Quantity"
                            size="large"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "rate"]}
                          rules={[
                            {
                              required: true,
                              message: "Rate is missing",
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="Rate"
                            size="large"
                            className="w-full"
                          />
                        </Form.Item>

                        <Button
                          htmlType="button"
                          danger
                          icon={<Minus size={16} />}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        htmlType="button"
                        type="dashed"
                        onClick={() => add()}
                        block
                      >
                        Add Field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
            <Form.Item className="col-span-2">
              <Button size="large" htmlType="submit" type="primary">
                Generate
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};
export default App;
