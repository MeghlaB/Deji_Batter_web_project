import { Button, TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const api_key = import.meta.env.VITE_GEMINI_API_KEY;
const Blog = () => {
  const [question, setQuestion] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api_key}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      const aiText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No answer found.";

      const newBlog = {
        id: Date.now(),
        title: question,
        content: aiText,
      };

      setBlogs([newBlog, ...blogs]);
      setQuestion("");
    } catch (err) {
      console.log("error message", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h1 
      className="text-2xl font-bold text-orange-500"
      style={{ textAlign: "center", marginBottom: "30px" }}>
        {" "}
        AI Blog Generator
      </h1>

      {/* Input Section */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextareaAutosize
          minRows={2}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write your blog topic or question..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
        <Button
          variant="contained"
          onClick={generateAnswer}
          disabled={loading}
          sx={{
            backgroundColor: "orange",
            "&:hover": {
              backgroundColor: "darkorange",
            },
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {/* Blog Output */}
      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#fafafa",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2I6zDdQlJYqWYbBol7EUltwyFcb5yK6HJgQ&s"
              alt="ai avatar"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            <div>
              <h2 style={{ margin: 0 }}>{blog.title}</h2>
              <small style={{ color: "#888" }}>AI Generated Blog</small>
            </div>
          </div>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {blog.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
