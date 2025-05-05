export interface Message {
  type: 'user' | 'assistant'
  content: string
  images?: string[]
  jobId?: string
}
