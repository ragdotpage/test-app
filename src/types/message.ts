export interface Group {
  id: string;
  name: string;
  finished?: boolean;
}

export interface PromptContext {
  id: string;
  group?: Group;
}

// A simplified Message type for the test app
export interface Message {
  id?: string;
  type?: 'group' | 'user' | 'assistant' | 'tool';
  content: string;
  promptContext?: PromptContext;
  children?: Message[];
  group?: Group; // Only for GroupMessage
  // allow other properties from payload
  [key: string]: any;
}

export interface GroupMessage extends Message {
  type: "group";
  group: Group;
  children: Message[];
}
