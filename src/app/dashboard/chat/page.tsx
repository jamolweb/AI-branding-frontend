'use client';

import { API_URL } from '@/env';
import { api } from '@/services/api';
import { authService } from '@/services/auth.service';
import axios from 'axios';
import { MessageCircle, Plus, Send } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  sessionId: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  tokensUsed: number | null;
  createdAt: string;
}

interface ChatSession {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHistoryView = searchParams.get('view') === 'history';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      fetchChatHistory(currentSessionId);
    }
  }, [currentSessionId]);

  const fetchSessions = async () => {
    try {
      const response = await api.get(`${API_URL}/chat/sessions`);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchChatHistory = async (sessionId: string) => {
    try {
      const response = await api.get(`${API_URL}/chat/history/${sessionId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    const newMessage: Message = {
      id: Date.now().toString(),
      sessionId: currentSessionId || '',
      role: 'USER',
      content: inputMessage,
      tokensUsed: null,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setStreamingContent('');

    try {
      const response = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sessionId: currentSessionId,
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (value) {
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');

            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.trim() && line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.content) {
                    fullContent += data.content;
                    setStreamingContent(fullContent);
                  }
                } catch (e) {
                  console.warn('Error parsing streaming data:', e);
                }
              }
            }
          }

          if (done) {
            const remaining = decoder.decode();
            if (remaining) buffer += remaining;

            if (buffer.trim() && buffer.startsWith('data: ')) {
              try {
                const data = JSON.parse(buffer.slice(6));
                if (data.content) {
                  fullContent += data.content;
                  setStreamingContent(fullContent);
                }
              } catch (e) {
                console.warn('Error parsing final streaming data:', e);
              }
            }
            break;
          }
        }

        const assistantMessage: Message = {
          id: Date.now().toString(),
          sessionId: currentSessionId || '',
          role: 'ASSISTANT',
          content: fullContent || 'Sorry, I couldn\'t process your request.',
          tokensUsed: null,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setStreamingContent('');
      } finally {
        reader.releaseLock();
      }

      if (!currentSessionId) {
        try {
          const sessionResponse = await api.get(`${API_URL}/chat/sessions`);
          if (sessionResponse.data && sessionResponse.data[0]) {
            setCurrentSessionId(sessionResponse.data[0].id);
          }
        } catch (sessionError) {
          console.error('Error fetching session:', sessionError);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        sessionId: currentSessionId || '',
        role: 'ASSISTANT',
        content: 'Sorry, there was an error processing your request.',
        tokensUsed: null,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLastMessage = (session: ChatSession) => {
    return session.messages.length > 0
      ? session.messages[session.messages.length - 1].content
      : 'No messages yet';
  };

  const handleSessionClick = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    router.push('/dashboard/chat');
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    if (isHistoryView) {
      router.push('/dashboard/chat');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat header */}
      <div className="flex-none border-b border-gray-800 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-[rgb(239,252,118)]" />
            <h2 className="text-xl font-semibold text-gray-100">
              {isHistoryView
                ? 'Chat History'
                : currentSessionId
                  ? 'Chat Session'
                  : 'New Chat'}
            </h2>
          </div>
          {!isHistoryView && (
            <button
              onClick={handleNewChat}
              className="px-4 py-2 bg-[rgb(239,252,118)] text-gray-900 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              New Chat
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {isHistoryView ? (
            <div className="space-y-3">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleSessionClick(session.id)}
                  className="w-full p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgb(239,252,118)] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-[rgb(239,252,118)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-200 font-medium truncate">
                        {getLastMessage(session)}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {formatDate(session.createdAt)}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="px-3 py-1 bg-[rgb(239,252,118)] text-gray-900 rounded-full text-sm font-medium">
                        Open Chat
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {sessions.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No chat history yet</p>
                  <p className="text-sm mt-2">
                    Start a new chat to begin the conversation
                  </p>
                  <button
                    onClick={handleNewChat}
                    className="mt-6 px-4 py-2 bg-[rgb(239,252,118)] text-gray-900 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    New Chat
                  </button>
                </div>
              )}
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto">
                  <MessageCircle className="w-10 h-10 text-[rgb(239,252,118)]" />
                </div>
                <h3 className="text-2xl font-medium text-gray-200">
                  Start a conversation
                </h3>
                <p className="text-gray-400 max-w-sm">
                  Ask our AI assistant anything about branding, marketing, or
                  business strategy.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'USER' ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 shadow-lg ${message.role === 'USER'
                      ? 'bg-[rgb(239,252,118)] text-gray-900'
                      : 'bg-gray-800 text-gray-100'
                      }`}
                  >
                    <div className="prose prose-lg prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: (props) => (
                            <h1
                              className="text-2xl font-bold mb-1"
                              {...props}
                            />
                          ),
                          h2: (props) => (
                            <h2
                              className="text-xl font-semibold mb-3"
                              {...props}
                            />
                          ),
                          h3: (props) => (
                            <h3
                              className="text-lg font-medium mb-2"
                              {...props}
                            />
                          ),
                          p: (props) => (
                            <p className="mb-1 leading-relaxed" {...props} />
                          ),
                          ul: (props) => (
                            <ul
                              className="list-disc pl-6 mb-1 space-y-2"
                              {...props}
                            />
                          ),
                          ol: (props) => (
                            <ol
                              className="list-decimal pl-6 mb-1 space-y-2"
                              {...props}
                            />
                          ),
                          li: (props) => <li className="mb-1" {...props} />,
                          strong: (props) => (
                            <strong
                              className="font-bold text-[rgb(239,252,118)]"
                              {...props}
                            />
                          ),
                          em: (props) => (
                            <em className="italic text-gray-300" {...props} />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <div className="text-xs opacity-60">
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              {(isLoading || streamingContent) && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-5 bg-gray-800 text-gray-100 shadow-lg">
                    <div className="prose prose-lg prose-invert max-w-none">
                      {streamingContent ? (
                        <ReactMarkdown>{streamingContent}</ReactMarkdown>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!isHistoryView && (
        <div className="flex-none border-t border-gray-800 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                }}
                onKeyPress={(e) =>
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !isLoading &&
                  handleSendMessage()
                }
                placeholder="Type your message..."
                className="flex-1 p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[rgb(239,252,118)] focus:ring-1 focus:ring-[rgb(239,252,118)] transition-all duration-200 min-h-[50px] max-h-[200px] overflow-y-auto"
                style={{ resize: 'none', height: '50px' }}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="p-2.5 bg-[rgb(239,252,118)] rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group relative flex-shrink-0 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] focus:ring-opacity-50"
                aria-label="Send message"
              >
                <Send className={`w-4 h-4 ${isLoading ? 'animate-pulse' : ''}`} />
                <span className="absolute -top-1 -right-1 -left-1 -bottom-1 rounded-full bg-[rgb(239,252,118)] opacity-0 group-hover:opacity-25 scale-0 group-hover:scale-100 transition-all duration-300"></span>
              </button>

              {/* Animated typing indicator */}
              {isLoading && (
                <div className="absolute -top-7 left-4 text-xs text-gray-400 flex items-center gap-1 animate-fadeIn bg-gray-800 px-3 py-1.5 rounded-full shadow-md">
                  <span className="italic">AI is typing</span>
                  <span className="flex ml-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mx-0.5" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </div>
              )}
            </div>

            {/* Character hint */}
            <div className="mt-2 text-xs text-gray-500 text-right pr-2">
              <span>Press <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300 text-xs">Shift + Enter</kbd> for new line</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
