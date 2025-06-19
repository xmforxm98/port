import React from 'react';
import { LucideProps } from 'lucide-react';

export interface ProcessStep {
  name: string;
  icon: React.ComponentType<LucideProps>;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps }) => {
  return (
    <div className="flex items-center justify-center my-12">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-0">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex items-center bg-card border border-border rounded-full px-6 py-3 shadow-sm text-center w-48 justify-center">
              <step.icon className="h-5 w-5 mr-3 text-primary shrink-0" />
              <span className="font-medium text-foreground text-sm truncate">{step.name}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-full md:w-8 h-px bg-border mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow; 