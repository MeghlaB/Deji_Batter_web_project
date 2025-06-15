import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // USD to SGD converter
  const convertToSGD = (usd) => (usd * 1.35).toFixed(2);

  // Fetch products
  useEffect(() => {
    axios
      .get("https://deji-server-developers-projects-08e2b070.vercel.app/products")
      .then((res) => {
        const data = res.data;
        setProducts(data);
        const uniqueModels = Array.from(
          new Set(data.map((item) => item.model))
        );
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner text-success text-2xl mb-4"></span>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Product | Deji Battery</title>
        <meta
          name="description"
          content="Browse our wide range of high-quality batteries at competitive prices."
        />
      </Helmet>
      
      <div className="flex flex-col mt-[-95px] lg:flex-row min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-full lg:w-64 p-4 bg-white shadow-sm lg:shadow-md">
          <div className="sticky top-0 lg:pt-4">
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left text-green-700">
              Deji Battery
            </h2>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
            <ul className="space-y-2">
              {models.map((model, idx) => (
                <li
                  key={idx}
                  onClick={() => setSelectedCategory(model)}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === model
                      ? "bg-green-100 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {model}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-700">No products found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <div className="p-4 h-48 flex items-center justify-center bg-gray-50">
                    <img
                      src={product.imageURLs?.[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-semibold">
                        SGD ${convertToSGD(product.price)}
                      </span>
                      <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}