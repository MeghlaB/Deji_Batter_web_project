import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/Authprovider";


const BulkOrderForm = () => {
 const {user} = useContext(AuthContext)

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/carts", {
          params: { email: user?.email },
        });
        setCartItems(res.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchCart();
    }
  }, [user?.email]);

  const handleQuantityChange = (id, newQty) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: parseInt(newQty) || 0 } : item
    );
    setCartItems(updated);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleAddToCart = () => {
    console.log("Cart Confirmed:", cartItems);
    alert("Cart confirmed!");
    // You can also POST updated cart if needed
  };

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Bulk Order Form - From Server:</h2>

      <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2">
        <div>Product</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Subtotal</div>
      </div>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-4 gap-4 items-center py-3 border-b"
        >
          <div className="flex items-center gap-2">
            <img
              src={item.image}
              alt={item.title}
              className="w-10 h-10 object-cover"
            />
            <span>{item.title}</span>
          </div>

          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item._id, e.target.value)}
            className="border px-2 py-1 w-20"
          />

          <div className="text-green-600 font-medium">£{item.price}</div>

          <div className="font-bold">
            £{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6 text-xl font-bold">
        <div>Total Price:</div>
        <div className="text-green-600">£{calculateTotal().toFixed(2)}</div>
      </div>

      <button
       
        className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default BulkOrderForm;
