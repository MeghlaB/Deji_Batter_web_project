import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        const data = res.data;
        setProducts(data);
        const uniqueModels = Array.from(new Set(data.map((item) => item.model)));
        setModels(["All", ...uniqueModels]);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false); 
      });
  }, []);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.model === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-success text-2xl"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-64 p-4 bg-gray-100 border-b lg:border-b-0 lg:border-r">
        <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Deji Battery</h2>
        <input
          type="text"
          placeholder="Search keywords"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 text-sm">
          {models.map((model, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedCategory(model)}
              className={`cursor-pointer p-1 rounded hover:text-green-600 ${
                selectedCategory === model
                  ? "text-green-600 font-bold bg-blue-50"
                  : ""
              }`}
            >
              {model}
            </li>
          ))}
        </ul>
      </div>

      {/* Products */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="border border-green-200 p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col justify-between h-[350px] cursor-pointer"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <img
              src={product.imageURLs?.[0]}
              alt={product.title}
              className="w-full h-[220px] object-contain mb-3"
            />
            <h3 className="text-center font-medium text-sm">{product.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
