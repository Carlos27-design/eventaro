export interface Event {
  id: string;
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  images: string[];
  ubication: string;
  typeEventId: string;
  organizationId: string;
}
