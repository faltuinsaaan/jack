export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  details: string;
  image: string;
  year: string;
  role: string;
  tags: string[];
  challenge?: string;
  approach?: string;
  creativeTech?: string[];
  devTech?: string[];
  deploymentTech?: string[];
  metricsFocus?: string;
  metricsDeliverables?: string[];
  metricsStatus?: string;
  lesson?: string;
  lessonDetail?: string;
  colors?: string[];
  fonts?: string[];
  link?: string;
}


export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AccordionSection {
  id: string;
  title: string;
  content: string;
  items?: string[];
}
