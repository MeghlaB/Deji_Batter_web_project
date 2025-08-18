import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGEHOSTING;
const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFiles = [
        data.image1[0],
        data.image2[0],
        data.image3[0],
        data.image4[0],
        data.image5[0],
      ];

      const imageUploadPromises = imageFiles.map((file) => {
        const formData = new FormData();
        formData.append("image", file);
        return axios.post(imageHostingURL, formData);
      });

      const responses = await Promise.all(imageUploadPromises);
      const imageURLs = responses.map((res) => res.data.data.display_url);

      const productData = {
        title: data.title,
        brand: data.brand,
        model: data.model,
        batteryType: data.batteryType,
        batteryGrade: data.batteryGrade,
        capacity: data.capacity,
        voltage: data.voltage,
        limitedVoltage: data.limitedVoltage,
        cycleTime: data.cycleTime,
        chargingTime: data.chargingTime,
        standbyTime: data.standbyTime,
       
        material: data.material,
        warranty: data.warranty,
        safety: data.safety,
        workingTemp: data.workingTemp,
        moq: data.moq,
        certification:data.certification,
        paymentTerms: data.paymentTerms,
        port: data.port,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        description: data.description,
        imageURLs: imageURLs,
      };

      const res = await axios.post("https://deji-baterryserver-1.onrender.com/add-products", productData);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Product Added Successfully",
          icon: "success",
          confirmButtonColor: "#11B808",
        });
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-8">
        Add  Battery Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Title" {...register("title", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Brand" {...register("brand", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Model" {...register("model", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Battery Type" {...register("batteryType", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Battery Cell Grade" {...register("batteryGrade", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Capacity (mAh)" {...register("capacity", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Standard Voltage (V)" {...register("voltage", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Limited Voltage (V)" {...register("limitedVoltage", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Cycle Time" {...register("cycleTime", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Charging Time" {...register("chargingTime", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Standby Time" {...register("standbyTime", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Certification" {...register("certification", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Material" {...register("material", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Warranty" {...register("warranty", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Safety Features" {...register("safety", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Working Temp (°C)" {...register("workingTemp", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Minimum Order Quantity" {...register("moq", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Payment Terms" {...register("paymentTerms", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Port" {...register("port", { required: true })} className="input input-bordered w-full" />
          <input type="text" placeholder="Price" {...register("price", { required: true })} className="input input-bordered w-full" />
        
          <input type="number" placeholder="Stock" {...register("stock", { required: true })} className="input input-bordered w-full" />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="file" {...register("image1", { required: true })} accept="image/*" className="file-input file-input-bordered w-full" />
          <input type="file" {...register("image2", { required: true })} accept="image/*" className="file-input file-input-bordered w-full" />
          <input type="file" {...register("image3", { required: true })} accept="image/*" className="file-input file-input-bordered w-full" />
          <input type="file" {...register("image4", { required: true })} accept="image/*" className="file-input file-input-bordered w-full" />
          <input type="file" {...register("image5", { required: true })} accept="image/*" className="file-input file-input-bordered w-full" />
        </div>
        <textarea placeholder="Short Description" {...register("description", { required: true })} rows="3" className="textarea textarea-bordered w-full" />


        <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-lg transition">
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
