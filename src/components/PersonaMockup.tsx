import { Send, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import zaraImage from 'figma:asset/88f726e79209f872fda913d076035b2df8f0b8a9.webp';

export function PersonaMockup() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chatMessages = [
    {
      id: 1,
      type: 'user',
      text: 'If two sustainable skincare brands sell the same thing, what would make you choose one over the other?',
      time: '14:59'
    },
    {
      id: 2,
      type: 'persona',
      text: 'I\'d go for the one that feels genuinely committed to sustainability, not just saying it. For example, I\'d look for refillable packaging, proof of ethical sourcing, and whether they actually show their impact data. A brand that communicates transparently earns my trust. Price matters less if I feel the brand genuinely cares.',
      time: '15:02'
    },
    {
      id: 3,
      type: 'user',
      text: 'Ad A vs Ad B - which would you click on, and why?',
      time: '15:03'
    },
    {
      id: 4,
      type: 'persona',
      text: 'Ad B stands out because it speaks directly to how I live. "Sustainable choices made simple" tells me I don\'t have to compromise - I can stick to my values without adding extra stress to my day. It feels supportive, almost like the brand is on my side, helping me make better choices without judgment. Ad A, by comparison, feels surface-level and impersonal. There\'s nothing in it that tells me the brand actually understands who I am or what I care about.',
      time: '15:05'
    }
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    const showNextMessage = () => {
      if (currentIndex < chatMessages.length) {
        const currentMessage = chatMessages[currentIndex];
        
        // Show typing indicator for persona messages
        if (currentMessage.type === 'persona') {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, currentMessage]);
            currentIndex++;
            setTimeout(showNextMessage, 1500); // Wait before next message
          }, 2000); // Typing duration
        } else {
          // User messages appear immediately
          setMessages(prev => [...prev, currentMessage]);
          currentIndex++;
          setTimeout(showNextMessage, 1000); // Shorter wait for user messages
        }
      } else {
        // Restart the conversation after all messages are shown
        setTimeout(() => {
          setMessages([]);
          currentIndex = 0;
          setTimeout(showNextMessage, 2000);
        }, 8000); // Increased pause to 8 seconds for reading time
      }
    };

    const timer = setTimeout(showNextMessage, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden" style={{boxShadow: "0 0 30px rgba(255, 130, 122, 0.3), 0 0 60px rgba(255, 130, 122, 0.15)"}}>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] h-[500px] sm:h-[550px] md:h-[650px] lg:h-[700px]">
        {/* Left Panel - Persona Profile */}
        <div className="bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto hidden lg:block">
          <div className="space-y-4">
            {/* Avatar and Basic Info */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto overflow-hidden">
                <img
                  src={zaraImage}
                  alt="Zara - AI Persona"
                  className="w-full h-full object-cover object-[center_10%] scale-125"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Zara Patel</h3>
                <p className="text-gray-600 text-sm">23 years old</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 text-gray-500">📍</div>
                <span className="text-gray-700">New York, NY</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 text-gray-500">💼</div>
                <span className="text-gray-700">Social Media & Community Associate</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 text-gray-500">🎓</div>
                <span className="text-gray-700">BA in Communications, UC Berkeley</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 text-gray-500">💰</div>
                <span className="text-gray-700">$55K annually</span>
              </div>
            </div>

            {/* Personality */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Personality</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 text-center">
                  Creator
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 flex items-center justify-center">
                  Tech-savvy
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 text-center">
                  Quality-focused
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 text-center">
                  Brand loyal
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Core Values</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">Sustainability</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">Work-life balance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">Authentic brands</span>
                </div>
              </div>
            </div>

            {/* AI Persona Badge */}
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Circle className="w-2 h-2 text-primary fill-current" />
                <span className="font-semibold text-primary text-sm">AI Persona</span>
              </div>
              <p className="text-xs text-gray-600">Real-time conversation simulation</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Chat Interface */}
        <div className="bg-white flex flex-col h-full">
          {/* Chat Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={zaraImage}
                    alt="Zara"
                    className="w-full h-full object-cover object-[center_15%] scale-125"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Zara Patel</p>
                  <div className="flex items-center space-x-1">
                    <Circle className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-primary fill-current" />
                    <span className="text-xs text-gray-600">Active now</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center space-x-2">
                <Circle className="w-2 h-2 text-primary fill-current animate-pulse" />
                <span className="text-sm text-gray-600">Live conversation</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 space-y-3 sm:space-y-4 overflow-y-auto">
            {messages.map((message) => {
              return (
                <div key={message.id} className={`animate-in slide-in-from-bottom-2 fade-in duration-300 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`rounded-3xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 max-w-[85%] sm:max-w-md ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-gray-100 rounded-bl-md'
                  }`}>
                    <p className={`text-xs sm:text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-800'} leading-relaxed text-left`}>
                      {message.text}
                    </p>
                    <p className={`text-xs sm:text-sm mt-1.5 sm:mt-2 ${message.type === 'user' ? 'opacity-80' : 'text-gray-500'} text-left`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="animate-in slide-in-from-bottom-2 fade-in duration-200">
                <div className="bg-gray-100 rounded-3xl rounded-bl-md px-3 sm:px-4 md:px-6 py-3 sm:py-4 max-w-[85%] sm:max-w-md">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">Zara is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Input 
                placeholder="Ask Zara anything..." 
                className="flex-1 border-gray-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full p-2.5 sm:p-3 min-h-[40px] min-w-[40px] touch-manipulation">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}