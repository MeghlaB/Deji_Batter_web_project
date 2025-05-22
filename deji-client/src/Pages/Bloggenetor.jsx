import React, { useState } from "react";
import axios from "axios";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setBlog("");

    try {
      const response = await axios.post("http://localhost:5000/generate", {
        topic,
      });
      setBlog(response.data.blog);
    } catch (err) {
      setError("Blog generate করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          🔍 ব্লগ টপিক লিখুন
        </label>
        <input
          type="text"
          className="w-full border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-3 text-gray-800"
          placeholder="যেমনঃ প্রযুক্তির ভবিষ্যৎ, স্বাস্থ্য টিপস..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "🚀 Generate Blog"}
        </button>
      </div>

      {error && (
        <div className="text-red-500 font-semibold mb-4">{error}</div>
      )}

      {blog && (
        <div className="bg-gray-100 p-5 rounded-lg shadow-md border border-indigo-200 mt-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            ✨ Generated Blog
          </h2>
          <p className="text-gray-800 whitespace-pre-line leading-relaxed">
            {blog}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
