import { Button } from "./ui/button";

export function ResearchPlanMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{boxShadow: "0 0 30px rgba(255, 130, 122, 0.3), 0 0 60px rgba(255, 130, 122, 0.15)"}}>
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Create Research Plan</h3>
      </div>
      
      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Research Plan Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Research Plan Name</label>
          <div className="h-10 bg-gray-50 rounded-lg border border-gray-300 px-4 flex items-center">
            <span className="text-gray-800">Sustainable Skincare Drop Campaign</span>
          </div>
        </div>
        
        {/* Target Audience */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Target Audience</label>
          <div className="min-h-24 bg-gray-50 rounded-2xl border border-gray-300 p-4">
            <span className="text-gray-800 text-sm">
              Gen Z (16–24), interested in eco-conscious, prefer cruelty-free & vegan skincare brands living in New York
            </span>
          </div>
        </div>
        
        {/* Number of Personas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Personas</label>
            <div className="h-10 bg-gray-50 rounded-lg border border-gray-300 px-4 flex items-center w-fit">
              <span className="text-gray-800">25</span>
            </div>
          </div>
          

        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-black rounded-full h-auto">
            Generate Personas
          </Button>
        </div>
      </div>
    </div>
  );
}