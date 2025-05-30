// App.jsx
import { useState } from "react";

const categories = [
  "Super Capacity iPhone Battery",
  "Original Capacity iPhone Battery",
  "Decode Battery",
  "Show Battery Health",
  "Samsung Battery",
  "Huawei Battery",
  "Xiaomi Battery",
  "Phone Charger",
];

const products = [
  {
    image:
      "https://i.ibb.co/0Cw6Z5h/type-c-lightning.jpg",
    title: "Type C to Lightning Fast Charging USB Data Cable",
  },
  {
    image:
      "https://i.ibb.co/mTktVT1/usb-lightning.jpg",
    title: "USB to Lightning Fast Charging USB Data Cable",
  },
  {
    image:
      "https://i.ibb.co/NV1FLy1/20w-charger.jpg",
    title: "Fast iPhone Wall Charger Phone Charger 20W",
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-gray-100 border-r">
        <h2 className="text-2xl font-bold mb-4">Deji Battery</h2>
        <input
          type="text"
          placeholder="Search keywords"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <ul className="space-y-2">
          {categories.map((item, idx) => (
            <li
              key={idx}
              className="cursor-pointer hover:text-blue-600 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Products */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-3"
            />
            <h3 className="text-center font-medium text-sm">
              {product.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
