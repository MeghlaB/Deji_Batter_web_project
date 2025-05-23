import React, { useState } from "react";
import axios from "axios";

const BlogGenerator = () => {
  const [topics] = useState([
    "Top 5 Signs Your Phone Battery is Dying",
    "Why Third-Party Batteries Outperform Originals",
  ]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/generate-article", {
        topic: selectedTopic,
      });
      setArticle(response.data.article);
    } catch (error) {
      console.log("Error generating article",error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🔋 AI Blog Generator</h1>
      <select
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
        className="border w-full p-2 mb-4"
      >
        <option value="">Select a Topic</option>
        {topics.map((topic, idx) => (
          <option key={idx} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      <button
        onClick={handleGenerate}
        disabled={loading || !selectedTopic}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Article"}
      </button>

      {article && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {article}
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
