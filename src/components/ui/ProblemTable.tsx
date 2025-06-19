import React from 'react';

export interface ProblemRow {
  environment: {
    title: string;
    details: string;
    titleColor?: string;
  };
  problem: string;
}

interface ProblemTableProps {
  rows: ProblemRow[];
}

const ProblemTable: React.FC<ProblemTableProps> = ({ rows }) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden my-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-muted/50">
        <div className="p-4 font-semibold text-lg text-foreground border-b md:border-b-0 md:border-r border-border">
          UX Environment
        </div>
        <div className="p-4 font-semibold text-lg text-foreground border-b border-border">
          Problem
        </div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 hover:bg-muted/20 transition-colors">
            <div className="p-4 space-y-1">
              <p className={`font-semibold ${row.environment.titleColor || 'text-primary'}`}>{row.environment.title}</p>
              <p className="text-sm text-muted-foreground">{row.environment.details}</p>
            </div>
            <div className="p-4">
              <p className="text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: row.problem }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemTable; 