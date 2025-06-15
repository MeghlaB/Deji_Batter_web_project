import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/Authprovider";

export default function App() {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [models, setModels] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const convertToSGD = (usd) => {
    try {
      return (usd * 1.35).toFixed(2);
    } catch (error) {
      console.error("Currency conversion error:", error);
      return usd.toFixed(2);
    }
  };

  const handleAddToCart = async (product) => {
    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = existing.find((item) => item._id === product._id);

    if (exists) {
      exists.quantity += 1;
    } else {
      existing.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existing));

    try {
      const cartData = {
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.imageURLs?.[0] || "",
        quantity: 1,
        email: user?.email || "guest@example.com",
      };

      await axios.post(
        "http://localhost:5000/cart",
        cartData
      );
    } catch (error) {
      console.error("Error posting to cart DB:", error);
    }

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${product?.title} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
      position: "top-center",
      toast: true,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/products"
        );
        const data = res.data || [];

        setProducts(data);

        const uniqueModels = [
          "All",
          ...new Set(
            data.map((item) => item.model || "Unknown")
          ),
        ];

        setModels(uniqueModels);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "All" ||
      product.model === selectedCategory ||
      (!product.model && selectedCategory === "Unknown");
    return searchMatch && categoryMatch;
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
        <title>Products | DEJI Battery Singapore</title>
        <meta
          name="description"
          content="Buy genuine DEJI batteries in Singapore with 2-year warranty. Same-day delivery available."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "DEJI Battery Products",
            description: "Official DEJI battery products available in Singapore",
            url: window.location.href,
          })}
        </script>
      </Helmet>

      <div className="flex flex-col lg:flex-row min-h-screen mt-[-96px] bg-gray-50">
        {/* Sidebar */}
        <div className="w-full lg:w-64 p-4 bg-white shadow-sm lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="lg:pt-4">
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left text-green-700">
              DEJI Battery SG
            </h2>

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-green-500"
              />
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
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

            <nav aria-label="Product categories">
              <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
              <ul className="space-y-2">
                {models.map((model, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setSelectedCategory(model)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === model
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {model}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedCategory === "All"
                ? "All Products"
                : `${selectedCategory} Batteries`}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "item" : "items"})
              </span>
            </h1>

            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              🚚 Same-day SG delivery
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="mt-4 text-lg font-medium text-gray-700">
                No products found
              </h2>
              <p className="mt-1 text-gray-500 max-w-md">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-sm text-green-600 hover:text-green-800 font-medium"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <article
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <div className="p-4 h-48 flex items-center justify-center bg-gray-50">
                    <img
                      src={product.imageURLs?.[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="font-medium text-gray-800 line-clamp-2 mb-2">
                      {product.title}
                    </h2>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-green-600 font-semibold">
                        S${convertToSGD(product.price)} SGD
                      </span>
                    </div>

                    <button
                      className="w-full mt-3 btn btn-sm btn-outline btn-success bg-green-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
