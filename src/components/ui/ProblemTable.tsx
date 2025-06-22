import React from 'react';

interface ProblemData {
  environment: string;
  problem: string;
  color: string;
}

const ProblemTable: React.FC = () => {
  const problemData: ProblemData[] = [
    {
      environment: "Unstable Server Environment",
      problem: "Unable to respond actively, there is a high possibility of server problems. Low efficiency at a high cost.",
      color: "text-orange-400"
    },
    {
      environment: "Ticket purchasing environment",
      problem: "Difficult to optimize scheduled user experience and low security. Frequent access and use of macros and direct links (direct links) through the web environment. At least 30 steps of complicated procedures overwhelmingly superior to real buyers of macro programs with less global accessibility",
      color: "text-green-400"
    },
    {
      environment: "One-way information provision environment",
      problem: "Lack of real-time for seats already selected and paid for at the time of payment",
      color: "text-blue-400"
    }
  ];

  return (
    <div className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2 bg-white/5">
        <div className="p-4 border-r border-white/10">
          <h3 className="text-lg font-semibold text-white">UX Environment</h3>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">Problem</h3>
        </div>
      </div>
      
      {problemData.map((item, index) => (
        <div key={index} className="grid grid-cols-2 border-t border-white/10">
          <div className="p-4 border-r border-white/10">
            <div className="space-y-2">
              <h4 className={`font-medium ${item.color}`}>
                {item.environment}
              </h4>
              {item.environment === "Unstable Server Environment" && (
                <p className="text-sm text-white/70">On-premise + IaaS</p>
              )}
              {item.environment === "Ticket purchasing environment" && (
                <div className="text-sm text-white/70 space-y-1">
                  <p>PC Web + Mobile Web</p>
                  <p>Verification, Waiting, Agreement, Selection, Payment</p>
                  <p>Secondary Ticket cannot be traded</p>
                </div>
              )}
              {item.environment === "One-way information provision environment" && (
                <div className="text-sm text-white/70 space-y-1">
                  <p>Information provided by session,</p>
                  <p>detailed page images, etc.</p>
                </div>
              )}
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-white/90 leading-relaxed">
              {item.problem}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemTable; 