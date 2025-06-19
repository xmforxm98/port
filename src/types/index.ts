export interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category?: string;
  year?: string;
  featured?: boolean;
  detailUrl?: string;
  images?: string[]; // Array of additional images for carousel
}

export interface MessageType {
  id: string;
  text: string | React.ReactNode;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'component';
  component?: React.ReactNode;
}

export interface ChatOption {
    id: string;
    text: string;
    action: string;
} 