import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'


const getDataFromLS = () => {
  const data = localStorage.getItem("tableData");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const App = () => {
  const [inputs, setInputs] = useState({ name: "", email: "" });
  const [tableData, setTableData] = useState(getDataFromLS());
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClick) {
      const tempTableData = [...tableData];
      tempTableData[editIndex] = inputs;
      setTableData(tempTableData);
      setEditClick(false);
      setEditIndex(null);
    } else {
      setTableData([...tableData, inputs]);
    }
    setInputs({ name: "", email: "" });
  };

  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#e2e7e3]">
      <div className="bg-[#f1ebebf2] max-w-fit m-auto p-20">
      <h1 className=" text-center p-2 text-black font-bold">Crud App</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input name="name" value={inputs.name} onChange={handleChange} className="p-2 rounded  " required placeholder="Enter your name"  />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input className=" p-2   rounded"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Enter your Email Id"
              // ("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })
            />
          </div>
          <button type="submit" className="w-full bg-[blue] text-white mt-3 py-1 rounded">
            {editClick ? "Update" : "Add"}
          </button>
        </form>
      </div>
      <div>
        <table className="w-full text-center">
          <thead className=" bg-gray-900 text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-black font-bold border">
            {tableData.map((item, i) => {
              return (
                <tr key={i} className="border">
                  <td className="border">{item.name}</td>
                  <td className="border">{item.email}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(i)}
                      // className="mr-3 text-yellow-300"
                    >
                      <EditOutlined style={{color:"blue"}} />
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-700 pr-2 ml-2"
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
