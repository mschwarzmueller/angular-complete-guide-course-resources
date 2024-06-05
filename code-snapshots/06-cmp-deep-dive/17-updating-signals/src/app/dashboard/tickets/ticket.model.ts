export interface Ticket {
  id: string;
  title: string;
  request: string;
  status: 'open' | 'closed';
}
