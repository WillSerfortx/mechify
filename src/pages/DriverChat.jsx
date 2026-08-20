import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

// Reuse same driver photo list for consistent lookups
const driverPhotos = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop',
];

const autoReplies = [
  "Hello! Thank you for reaching out. How can I help you today?",
  "Sure, I'd be happy to assist you with your booking!",
  "I'm available for rides across Dhaka, Chattogram, and Sylhet.",
  "My rate is very competitive. Would you like to know the details?",
  "I have 5 years of experience driving luxury vehicles.",
  "I can pick you up anytime. Just let me know the location!",
  "Yes, I'm familiar with that area. No problem at all!",
  "I'll make sure you have a safe and comfortable journey.",
  "Great choice! I'll be there on time, guaranteed.",
  "Feel free to ask me anything else. I'm here to help!",
];

export default function DriverChat() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const driverName = searchParams.get('name') || 'Driver';
  const driverId = parseInt(searchParams.get('id') || '1') - 1;
  const driverRating = searchParams.get('rating') || '4.5';
  const driverPhoto = driverPhotos[driverId % driverPhotos.length];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'driver',
      text: `Assalamu Alaikum! I'm ${driverName}. How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    inputRef.current?.focus();

    // Simulate driver typing and reply
    setIsTyping(true);
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: messages.length + 2,
        sender: 'driver',
        text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col font-outfit">
      {/* Chat Header */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-[#1a0000] to-black/95 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl text-white hover:bg-white/20 transition-colors border border-white/20 flex-shrink-0"
          >
            &lt;
          </button>

          {/* Driver Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={driverPhoto}
                alt={driverName}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#E50914]"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-bold text-lg truncate">{driverName}</h2>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-gray-400 text-xs font-semibold">{driverRating}</span>
                <span className="text-green-400 text-xs ml-2">● Online</span>
              </div>
            </div>
          </div>

          {/* Book Driver Button */}
          <button
            onClick={() => navigate('/car-booking')}
            className="bg-[#E50914] hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] flex-shrink-0"
          >
            Book Driver
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Date Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="bg-white/10 text-gray-400 text-xs font-semibold px-4 py-1.5 rounded-full">
              Today
            </div>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
            >
              {/* Driver avatar */}
              {msg.sender === 'driver' && (
                <img
                  src={driverPhoto}
                  alt={driverName}
                  className="w-8 h-8 rounded-full object-cover mr-3 mt-1 flex-shrink-0 border border-white/20"
                />
              )}

              <div className={`max-w-[75%] md:max-w-[60%]`}>
                <div
                  className={`px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E50914] text-white rounded-br-md'
                      : 'bg-white/10 text-white border border-white/10 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
                <p className={`text-xs text-gray-600 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fadeInUp">
              <img
                src={driverPhoto}
                alt={driverName}
                className="w-8 h-8 rounded-full object-cover mr-3 mt-1 flex-shrink-0 border border-white/20"
              />
              <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-md px-5 py-3">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input Bar */}
      <div className="sticky bottom-0 bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          {/* Attachment Button */}
          <button className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 px-5 pr-12 text-white placeholder-gray-500 text-base outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/30 transition-all resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              input.trim()
                ? 'bg-[#E50914] text-white hover:bg-red-700 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] hover:scale-105'
                : 'bg-white/10 text-gray-600 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
