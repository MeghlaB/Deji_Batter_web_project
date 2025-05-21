import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";

// Dummy blogs (you can replace with data from API or Firebase)
const blogs = [
  {
    id: "1",
    title: "How AI is Transforming Battery Technology",
    description: "Discover how artificial intelligence is optimizing battery performance and energy efficiency in 2025.",
    date: "2025-05-21",
    author: "AI Writer",
  },
  {
    id: "2",
    title: "The Future of Fast Charging in Smartphones",
    description: "Explore the latest advancements in fast charging and what it means for mobile users.",
    date: "2025-05-20",
    author: "AI Writer",
  },
];

const BlogList = () => {
  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" mb={4} fontWeight="bold">
        📰 Latest Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} key={blog.id}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {blog.description.slice(0, 120)}...
                </Typography>
                <Typography variant="caption" color="gray">
                  {blog.date} • {blog.author}
                </Typography>
                <Box mt={2}>
                  <Link to={`/blogs/${blog.id}`}>
                    <Button variant="outlined" size="small">
                      Read More
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
