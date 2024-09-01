'use client'
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import './globals.css';
import { marked } from "marked";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  if (!isSignedIn){
    router.push('/sign-in');
  }

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm the Rate My Professor support assistant. How can I help you today?"
    }
  ])
  const [message, setMessage] = useState('')
  const messageInputRef = useRef(null)

  const sendMessage = async () => {
    setMessages((messages)=> [
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: ''}
    ])
    setMessage('')

    const response = fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role: "user", content: message}])
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      let fullText = ''
  
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          const htmlResponse = marked(fullText, { sanitize: true });

          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + htmlResponse },
            ]
          })
          return result
        }

        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        fullText += text;
  
        return reader.read().then(processText);
      })
    })
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        sendMessage()
      }
    };

    const inputElement = messageInputRef.current;
    inputElement?.addEventListener('keydown', handleKeyDown)

    return () => {
      inputElement?.removeEventListener('keydown', handleKeyDown)
    }
  }, [message])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
       <Navbar />  {/* Include Navbar */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: '250px',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderRight: '1px solid #ddd',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Model: OpenAI text-embedding-3-small</Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            height: 'calc(100vh - 64px)', 
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid black',
              backgroundColor: 'white',
              overflowY: 'auto', 
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              flexGrow={1}
              sx={{ p: 2 }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: message.role === 'assistant' ? 'flex-start' : 'flex-end',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: message.role === 'assistant' ? 'primary.main' : 'secondary.main',
                      color: 'white',
                      borderRadius: 2,
                      maxWidth: '90%',
                      overflowWrap: 'break-word',
                      padding: '5px', 
                      overflow: 'hidden', 
                    }}
                  >
                    {message.content ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: message.content }} // Inject HTML content
                        className="bubble-content"
                      />
                    ) : (
                      <Typography variant="body1">Loading...</Typography> // Fallback while loading
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 2, pb: 2 }}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              inputRef={messageInputRef}
            />
            <Button variant="contained" onClick={sendMessage}>Send</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
