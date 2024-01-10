import React, { useState, useEffect } from "react";
import { supabase } from "./Supabase"; 

const AdminModel = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [bodystyles, setBodyStyles] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchBodyStyles();
  }, []);

  async function fetchModels() {
    const { data } = await supabase.from("models").select("*");
    setModels(data);
  }

  const handleCreate = async () => {
    const newBrandID = prompt("Enter the brand ID:");
    const newName = prompt("Enter the model name:"); 
      

    const newModel = {
      brandid: newBrandID,  
      modelname: newName, 
    };

    const { data, error } = await supabase.from("models").upsert([newModel]);

    if (error) {
      console.error("Error creating model:", error);
    } else {
      console.log("Model created successfully:", data);
      fetchModels();
    }
  };

  const handleEdit = async (modelid) => {
    const modelToUpdate = models.find((models) => models.modelid === modelid);
  
    // Ensure the model is found before attempting to edit
    if (!modelToUpdate) {
      console.error(`Model with ID ${modelid} not found.`);
      return;
    }
  
    const updatedBrand = prompt("Enter the updated brand ID:", modelToUpdate.brandid);
    const updatedName = prompt("Enter the updated name:", modelToUpdate.modelname);
  
    const updatedModel = {
      modelid: modelid,
      brandid: updatedBrand,
      modelname: updatedName,
    };
  
    const { data, error } = await supabase.from("models").upsert([updatedModel]);
  
    if (error) {
      console.error("Error updating model:", error);
    } else {
      console.log("Model updated successfully:", data);
      fetchModels();
    }
  };
  

  const handleDelete = async (modelid) => {
    // Implement logic to delete an existing dealer
    const confirmation = window.confirm("Are you sure you want to delete this model?");
    if (confirmation) {
      const { data, error } = await supabase.from("models").delete().eq("modelid", modelid);

      if (error) {
        console.error("Error deleting model:", error);
      } else {
        console.log("Model deleted successfully:", data);
        fetchModels(); // Refresh the dealer list after deleting
      }
    }
  };

  async function fetchBrands() {
    const { data } = await supabase.from("brands").select("*");
    setBrands(data);
  }

  async function fetchBodyStyles() {
    const { data } = await supabase.from("body_styles").select("*");
    setBodyStyles(data);
  }
  
 
  
  return (
    <>  
    <div className="rowcontainer mx-auto p-8 mt-[30px]">
      <h1 className="text-3xl font-bold mb-6">Car Models</h1> 
      <div className="flex-row"> 
      <table className="border border-collapse border-gray-800">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="py-2 px-4">Model ID</th> 
            <th className="py-2 px-4">Brand ID</th>
            <th className="py-2 px-4">Model Name</th> 
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {models.map((models) => (
            <tr key={models.modelid} className="hover:bg-gray-100">
              <td className="py-2 px-4">{models.modelid}</td>
              <td className="py-2 px-4">{models.brandid}</td>
              <td className="py-2 px-4">{models.modelname}</td>  
              <td className="py-2 px-4"> 
                    <button
                      className="bg-blue-500 text-white py-1 px-2 mr-2"
                      onClick={() => handleEdit(models.modelid)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2"
                      onClick={() => handleDelete(models.modelid)}
                    >
                      Delete
                    </button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
          className="bg-green-500 text-white py-1 px-2 md:ml-[400px] ml-[300px] mt-3 mb-10"
          onClick={handleCreate}
        >
          Create Model
        </button>

      <h1 className="text-3xl font-bold mb-6">Car Brand</h1> 
      <table className="border border-collapse border-gray-800">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="py-2 px-4">Brand ID</th>
            <th className="py-2 px-4">Name</th>  
          </tr>
        </thead>

        <tbody>
          {brands.map((brands) => (
            <tr key={brands.brand_id} className="hover:bg-gray-100">
              <td className="py-2 px-4">{brands.brandid}</td>
              <td className="py-2 px-4">{brands.brandname}</td> 
            </tr>
          ))}
        </tbody>
      </table> 
      
      <h1 className="text-3xl font-bold mb-6 mt-5">Body Style</h1> 
      <table className="border border-collapse border-gray-800">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="py-2 px-4">Brand ID</th>
            <th className="py-2 px-4">Name</th> 
          </tr>
        </thead>

        <tbody>
          {bodystyles.map((bodystyle) => (
            <tr key={bodystyle.bodystyleid} className="hover:bg-gray-100">
              <td className="py-2 px-4">{bodystyle.bodystyleid}</td>
              <td className="py-2 px-4">{bodystyle.bodystylename}</td> 
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
    </div>
    </>
  );
};

export default AdminModel;
