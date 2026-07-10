import React, { useState } from "react";
import "./animate.css";
import { Printer, Plus, Minus } from "lucide-react";
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

  const handleClose = () => {
    setOpen(false);
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
  ];
  const onFinish = (values) => {
    console.log(values);
    setOpen(false);
  };
  return (
    <div className="bg-gray-200 min-h-screen">
      <div></div>
      <div className="fixed -translate-y-1/2 top-1/2 left-0 bg-white rounded-r-lg p-4 flex flex-col gap-4 shadow-lg">
        <Tooltip title="Create a new invoice">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white p-2 rounded hover:scale-105 transition duration-300 active:scale-80"
          >
            <Plus />
          </button>
        </Tooltip>
        <Tooltip title="Print your invoice">
          <button className="bg-blue-500 text-white p-2 rounded hover:scale-105 transition duration-300 active:scale-80">
            <Printer />
          </button>
        </Tooltip>
      </div>
      <Drawer
        open={open}
        onClose={handleClose}
        title="Create a new invoice"
        size={720}
      >
        <div>
          <Form
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-2 gap-x-6"
          >
            {formSchema.map((item) => {
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
                        message: `Please enter ${item.label}`,
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
                        message: `Please enter ${item.label}`,
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
            <Divider className="col-span-2">
              Product Details
            </Divider>
            <Form.List name="items" className="col-span-2">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }} align="baseline" className="col-span-2">
                      <Form.Item
                        {...restField}
                        name={[name, "Item"]}
                        rules={[
                          { required: true, message: "Item is missing" },
                        ]}
                      >
                        <Input placeholder="Item" size="large" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "qty"]}
                        rules={[
                          { required: true, message: "Quantity is missing" },
                        ]}
                      >
                        <InputNumber placeholder="Quantity" size="large" className="w-full" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "rate"]}
                        rules={[
                          { required: true, message: "Rate is missing" },
                        ]}
                      >
                        <InputNumber placeholder="Rate" size="large" className="w-full" />
                      </Form.Item>
                      <Minus onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
