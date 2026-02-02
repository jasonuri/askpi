import { useState, useEffect } from 'react';
import optionAImage from 'figma:asset/ef16e9c5a9bcd6bd5253075f0a483958be79f3de.webp';
import optionBImage from 'figma:asset/c40581f9b8c7e5e828be9449db64f4c9ece84071.webp';

interface Persona {
  id: number;
  color: string;
  name: string;
  votedFor: 'A' | 'B' | null;
}

export function FocusGroupMockup() {
  const [votesA, setVotesA] = useState(0);
  const [votesB, setVotesB] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  
  // Define personas with colors and labels
  const [personas, setPersonas] = useState<Persona[]>([
    { id: 1, color: 'bg-primary', name: 'P1', votedFor: null },
    { id: 2, color: 'bg-accent', name: 'P2', votedFor: null },
    { id: 3, color: 'bg-coral', name: 'P3', votedFor: null },
    { id: 4, color: 'bg-peach', name: 'P4', votedFor: null },
    { id: 5, color: 'bg-primary', name: 'P5', votedFor: null },
    { id: 6, color: 'bg-accent', name: 'P6', votedFor: null },
    { id: 7, color: 'bg-coral', name: 'P7', votedFor: null },
    { id: 8, color: 'bg-peach', name: 'P8', votedFor: null },
    { id: 9, color: 'bg-primary', name: 'P9', votedFor: null },
    { id: 10, color: 'bg-accent', name: 'P10', votedFor: null },
    { id: 11, color: 'bg-coral', name: 'P11', votedFor: null },
    { id: 12, color: 'bg-peach', name: 'P12', votedFor: null },
    { id: 13, color: 'bg-primary', name: 'P13', votedFor: null },
    { id: 14, color: 'bg-accent', name: 'P14', votedFor: null },
    { id: 15, color: 'bg-coral', name: 'P15', votedFor: null },
  ]);

  useEffect(() => {
    // Simulate voting over time with slower, smoother delays
    const votingSequence = [
      { personaId: 1, option: 'A', delay: 800 },
      { personaId: 2, option: 'B', delay: 1800 },
      { personaId: 3, option: 'A', delay: 2800 },
      { personaId: 4, option: 'A', delay: 3800 },
      { personaId: 5, option: 'B', delay: 4800 },
      { personaId: 6, option: 'A', delay: 5800 },
      { personaId: 7, option: 'B', delay: 6800 },
      { personaId: 8, option: 'A', delay: 7800 },
      { personaId: 9, option: 'B', delay: 8800 },
      { personaId: 10, option: 'A', delay: 9800 },
      { personaId: 11, option: 'B', delay: 10800 },
      { personaId: 12, option: 'A', delay: 11800 },
      { personaId: 13, option: 'B', delay: 12800 },
      { personaId: 14, option: 'A', delay: 13800 },
      { personaId: 15, option: 'B', delay: 14800 },
    ];

    votingSequence.forEach(({ personaId, option, delay }) => {
      setTimeout(() => {
        // Update persona's vote
        setPersonas(prev => prev.map(p => 
          p.id === personaId ? { ...p, votedFor: option as 'A' | 'B' } : p
        ));
        
        // Update vote counts
        if (option === 'A') {
          setVotesA(prev => prev + 1);
        } else {
          setVotesB(prev => prev + 1);
        }
        setTotalVotes(prev => prev + 1);
      }, delay);
    });

    // Mark as completed after all votes
    setTimeout(() => {
      setIsCompleted(true);
    }, 16000);

    // Reset animation after completion and restart
    setTimeout(() => {
      setPersonas(prev => prev.map(p => ({ ...p, votedFor: null })));
      setVotesA(0);
      setVotesB(0);
      setTotalVotes(0);
      setIsCompleted(false);
      // Trigger restart by changing key
      setAnimationKey(prev => prev + 1);
    }, 19000);
  }, [animationKey]);

  const percentageA = totalVotes > 0 ? Math.round((votesA / totalVotes) * 100) : 0;
  const percentageB = totalVotes > 0 ? Math.round((votesB / totalVotes) * 100) : 0;
  
  const personasVotedA = personas.filter(p => p.votedFor === 'A');
  const personasVotedB = personas.filter(p => p.votedFor === 'B');
  const personasNotVoted = personas.filter(p => p.votedFor === null);

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{boxShadow: "0 0 30px rgba(255, 130, 122, 0.3), 0 0 60px rgba(255, 130, 122, 0.15)"}}>
      {/* Tabs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="flex">
          <div className="flex items-center px-4 py-3 text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Discussion
          </div>
          <div className="flex items-center px-4 py-3 bg-white border-b-2 border-gray-300 text-gray-900 font-medium rounded-t-lg">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Polling
          </div>
          <div className="flex items-center px-4 py-3 text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Insights
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 min-h-[700px]">
        {/* Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              isCompleted ? 'bg-primary' : 'bg-accent'
            }`}></div>
            <span className="font-medium text-gray-900">
              Multiple Choice - {isCompleted ? 'Completed' : 'In Progress'}
            </span>
          </div>
          <span className="text-gray-600 bg-peach/20 px-3 py-1 rounded-full font-medium">
            {totalVotes} votes {isCompleted ? '(100%)' : ''}
          </span>
        </div>

        {/* Question */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Which ad image catches your attention the most?
          </h3>
          <p className="text-gray-600">Choose the option that best represents your preference</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Option A */}
          <div className="border border-gray-300 bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">A. Option A</h4>
              <span className="text-gray-600 bg-primary/20 px-2 py-1 rounded-full text-sm font-medium">{votesA} votes {votesA > 0 ? `(${percentageA}%)` : ''}</span>
            </div>
            
            <div className="mb-2">
              <div className="rounded-lg inline-block border border-gray-300 overflow-hidden">
                <img 
                  src={optionAImage} 
                  alt="Woman applying skincare in bathroom"
                  className="w-48 h-32 object-cover"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
              {personasVotedA.map((persona, index) => (
                <div 
                  key={persona.id}
                  className={`w-8 h-8 rounded-full ${persona.color} animate-in slide-in-from-top-2 fade-in duration-500 flex items-center justify-center text-white text-xs`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  title={`Persona ${persona.id}`}
                >
                  {persona.name}
                </div>
              ))}
            </div>

            <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500 ease-out"
                style={{ width: `${percentageA}%` }}
              >
                <span className={`text-white text-sm font-medium transition-opacity duration-300 ${
                  percentageA > 15 ? 'opacity-100' : 'opacity-0'
                }`}>
                  {percentageA > 0 ? `${percentageA}%` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Option B */}
          <div className="border border-gray-300 bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">B. Option B</h4>
              <span className="text-gray-600 bg-accent/20 px-2 py-1 rounded-full text-sm font-medium">{votesB} votes {votesB > 0 ? `(${percentageB}%)` : ''}</span>
            </div>
            
            <div className="mb-2">
              <div className="rounded-lg inline-block border border-gray-300 overflow-hidden">
                <img 
                  src={optionBImage} 
                  alt="Woman looking in mirror laughing"
                  className="w-48 h-32 object-cover"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
              {personasVotedB.map((persona, index) => (
                <div 
                  key={persona.id}
                  className={`w-8 h-8 rounded-full ${persona.color} animate-in slide-in-from-top-2 fade-in duration-500 flex items-center justify-center text-white text-xs`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  title={`Persona ${persona.id}`}
                >
                  {persona.name}
                </div>
              ))}
            </div>

            <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
              <div 
                className="bg-gradient-to-r from-accent to-coral h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500 ease-out"
                style={{ width: `${percentageB}%` }}
              >
                <span className={`text-white text-sm font-medium transition-opacity duration-300 ${
                  percentageB > 15 ? 'opacity-100' : 'opacity-0'
                }`}>
                  {percentageB > 0 ? `${percentageB}%` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}