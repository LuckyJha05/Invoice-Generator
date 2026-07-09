import React, {useState} from "react";
import "./animate.css";
import { Printer, Plus } from 'lucide-react';
import { Tooltip, Drawer, Form, Input, Button } from 'antd';

const App = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const formSchema = [
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
  ];
  const onFinish = (values) => {
    console.log(values);
    setOpen(false);
  };
return (
<div className='bg-gray-200 min-h-screen'>
  <div>

  </div>
<div className='fixed -translate-y-1/2 top-1/2 left-0 bg-white rounded-r-lg p-4 flex flex-col gap-4 shadow-lg'>
  <Tooltip title= "Create a new invoice">
    <button onClick={()=>setOpen(true)} className='bg-blue-500 text-white p-2 rounded hover:scale-105 transition duration-300 active:scale-80'>
       <Plus />
    </button>
  </Tooltip>
  <Tooltip title="Print your invoice">
  <button className='bg-blue-500 text-white p-2 rounded hover:scale-105 transition duration-300 active:scale-80'>
    <Printer />
  </button>
  </Tooltip>
</div>
<Drawer open={open} onClose={handleClose} title="Create a new invoice" size={720}>
  <div>
    <Form layout="vertical" onFinish={onFinish}>
      {
        formSchema.map((item, index) =>(
          <Form.Item
            key={index}
            label={<h1 className='font-medium text-base'>{item.label}</h1>}
            name={item.name}
            rules={[{ required: item.required}]}
            >
            <Input 
            size="large"
            placeholder={item.placeholder}
            />
          </Form.Item>
        ))
      }
      <Button size='large' htmlType="submit" type="primary">Generate</Button>
      </Form>
  </div>
</Drawer>
</div>
)
}
export default App;