'use client';
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { Container, Box, Button, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const { user } = useUser(); // Clerk user
  const router = useRouter();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey I am a social advice bot! Do you need any advice on any social problem you may have?",
    }
  ]);

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog
  const [chatName, setChatName] = useState(''); // State to store chat name

  useEffect(() => {
    if (user) {
      const fetchMessages = async () => {
        const docRef = doc(db, "chats", user.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMessages(docSnap.data().messages);
        } else {
          console.log("No chat history found");
        }
      };
      fetchMessages();
    } else {
      setMessages([
        {
          role: 'assistant',
          content: "Hey I am a social advice bot! Do you need any advice on any social problem you may have?",
        }
      ]);
    }
  }, [user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    const newMessages = [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ];

    setMessage('');
    setMessages(newMessages);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessages),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finalMessages = [...newMessages];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        finalMessages = finalMessages.map((msg, index) => {
          if (index === finalMessages.length - 1) {
            return { ...msg, content: msg.content + text };
          }
          return msg;
        });

        setMessages(finalMessages);
      }

      if (user) {
        const docRef = doc(db, "chats", user.id);
        await setDoc(docRef, { messages: finalMessages });
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSaveChat = () => {
    if (user) {
      setOpenDialog(true); // Open the dialog to ask for chat name
    } else {
      alert("User not authenticated. Unable to save chat history.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    if (!chatName.trim()) {
      alert("Please enter a chat name.");
      return;
    }
    try {
      const docRef = doc(db, "chats", user.id);
      await setDoc(docRef, { name: chatName, messages: messages });
      alert("Chat history saved successfully!");
      setOpenDialog(false); // Close the dialog
    } catch (error) {
      console.error("Error saving chat history:", error);
      alert("Failed to save chat history.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', bgcolor: "#222222", display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        p={2}
        mt={8}
        sx={{ overflowY: "hidden" }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 2,
            pb: 12,
            wordWrap: "break-word",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              mb={1}
              p={2} // Increased padding for message bubbles
              borderRadius={2}
              sx={{
                display: 'flex',
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  bgcolor: msg.role === "user" ? "#e57373" : "#8B0000", // Light red for user, dark red for assistant
                  p: 2, // Increased padding inside bubbles
                  borderRadius: 2,
                  color: "white",
                  maxWidth: "80%",
                  overflowWrap: "break-word", // Handle long words
                  textOverflow: "ellipsis", // Add ellipsis for overflow
                  whiteSpace: "pre-wrap", // Preserve white spaces and line breaks
                }}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
          <Box ref={messagesEndRef} />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: '#222222',
          p: 2,
          borderTop: '1px solid #333',
          zIndex: 10,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              bgcolor: "#333",
              color: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#444",
                },
                "&:hover fieldset": {
                  borderColor: "#61dafb",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#61dafb",
                },
                "& input, & textarea": {
                  color: "white",
                },
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              bgcolor: "#8B0000", // Primary button color
              "&:hover": {
                bgcolor: "#6f0000",
              },
            }}
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </Button>
        </Stack>
      </Box>

 
    </Container>
  );
}
