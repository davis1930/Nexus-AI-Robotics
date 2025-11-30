import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  url?: string; // Optional because coming_soon tools might not have a link yet
  icon: LucideIcon;
  category: string;
  status: 'active' | 'coming_soon';
  action?: string; // Identifier for internal actions (e.g., 'toggle_chatbot')
}

export type ViewState = 'home' | 'about' | 'contact';