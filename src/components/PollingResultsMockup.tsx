export function PollingResultsMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{boxShadow: "0 0 30px rgba(255, 130, 122, 0.3), 0 0 60px rgba(255, 130, 122, 0.15)"}}>
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Results</h3>
          <span className="text-sm text-gray-600 bg-peach/30 px-3 py-1 rounded-full font-medium">25 responses</span>
        </div>
      </div>
      
      {/* Results Content */}
      <div className="p-6 space-y-6">
        {/* Overall Rating */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">7.8/10</div>
          <p className="text-gray-600 font-medium">Overall Campaign Rating</p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border border-gray-300">
            <div className="text-2xl font-bold text-primary">72%</div>
            <div className="text-sm text-gray-600 font-medium">Would Purchase</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg border border-gray-300">
            <div className="text-2xl font-bold text-accent">85%</div>
            <div className="text-sm text-gray-600 font-medium">Message Clarity</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-coral/20 to-coral/10 rounded-lg border border-gray-300">
            <div className="text-2xl font-bold text-coral">68%</div>
            <div className="text-sm text-gray-600 font-medium">Brand Affinity</div>
          </div>
        </div>
        
        {/* Detailed Breakdown */}
        <div className="space-y-4 bg-gradient-to-r from-peach/10 to-primary/5 p-4 rounded-lg border border-gray-300">
          <h4 className="font-semibold text-gray-800">Purchase Intent Breakdown</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">Definitely will buy</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/3 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-primary">32%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">Probably will buy</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-2/5 h-2 bg-gradient-to-r from-accent to-coral rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-accent">40%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">Might buy</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/6 h-2 bg-peach rounded-full"></div>
                </div>
                <span className="text-sm font-bold" style={{color: '#ffd2bd'}}>16%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-medium">Won't buy</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/8 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-gray-500">12%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Insights */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-800 mb-3">Key Insights</h4>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <span className="text-sm text-gray-700">Sustainability messaging resonates strongly with target audience</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <span className="text-sm text-gray-700">Plastic-free packaging resonates 3x stronger than ingredient claims</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-coral rounded-full mt-2"></div>
              <span className="text-sm text-gray-700">Visual design resonates strongly with 18-24 age group</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}