'use client';

import { API_URL } from '@/env';
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
    const accessToken = authService.getAccessToken();

    try {
      const response = await axios.get(`${API_URL}/chat/sessions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchChatHistory = async (sessionId: string) => {
    const accessToken = authService.getAccessToken();
    try {
      const response = await axios.get(`${API_URL}/chat/history/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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

    const accessToken = authService.getAccessToken();

    try {
      const response = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          sessionId: currentSessionId,
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            setStreamingContent((prev) => prev + data.content);
          }
        }
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        sessionId: currentSessionId || '',
        role: 'ASSISTANT',
        content: streamingContent,
        tokensUsed: null,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent('');

      if (!currentSessionId) {
        const sessionResponse = await axios.get(`${API_URL}/chat/sessions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const newSession = sessionResponse.data[0];
        setCurrentSessionId(newSession.id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
                  className={`flex ${
                    message.role === 'USER' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-5 shadow-lg ${
                      message.role === 'USER'
                        ? 'bg-[rgb(239,252,118)] text-gray-900'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <div className="prose prose-lg prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: (props) => (
                            <h1
                              className="text-2xl font-bold mb-4"
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
                            <p className="mb-4 leading-relaxed" {...props} />
                          ),
                          ul: (props) => (
                            <ul
                              className="list-disc pl-6 mb-4 space-y-2"
                              {...props}
                            />
                          ),
                          ol: (props) => (
                            <ol
                              className="list-decimal pl-6 mb-4 space-y-2"
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
                    <div className="text-xs mt-3 opacity-60">
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              {streamingContent && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-5 bg-gray-800 text-gray-100 shadow-lg animate-pulse">
                    <div className="prose prose-lg prose-invert max-w-none">
                      <ReactMarkdown>{streamingContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input area - Only show when not in history view */}
      {!isHistoryView && (
        <div className="flex-none border-t border-gray-800 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) =>
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !isLoading &&
                  handleSendMessage()
                }
                placeholder="Type your message..."
                className="flex-1 p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[rgb(239,252,118)] focus:ring-1 focus:ring-[rgb(239,252,118)] transition-all duration-200 resize-none"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="p-4 bg-[rgb(239,252,118)] rounded-xl hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group relative"
              >
                <Send
                  className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`}
                />
                <div className="absolute inset-0 bg-[rgb(239,252,118)] rounded-xl opacity-25 group-hover:scale-110 transition-transform duration-200"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
