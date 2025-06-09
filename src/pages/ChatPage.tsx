import React from "react";
import { GuidedChatbot } from "../../components/GuidedChatbot";
import { ProjectData } from "../../components/ProjectContext";

interface ChatPageProps {
  projectContext?: ProjectData;
  selectedOption?: string;
}

export const ChatPage: React.FC<ChatPageProps> = ({ 
  projectContext, 
  selectedOption = "new" 
}) => {
  return (
    <GuidedChatbot
      selectedOption={selectedOption}
      projectContext={projectContext}
    />
  );
}; 