import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      setResponse("❌ Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating chat button */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 2000,
          backgroundColor: "#1976d2",
          color: "#fff",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Typography variant="h6">🔋 Deji AI Chat</Typography>

          <Stack spacing={2} mt={2}>
            <TextField
              label="Ask me anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
            />

            <Button variant="contained" onClick={handleChat} disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : "Send"}
            </Button>

            {response && (
              <Box
                sx={{
                  background: "#f5f5f5",
                  padding: 2,
                  borderRadius: 2,
                  whiteSpace: "pre-line",
                }}
              >
                <Typography>{response}</Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Chatbot;
