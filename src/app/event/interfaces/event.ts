import { Organization } from '../../organization/interfaces/organization';
import { TypeEvent } from '../../typeEvent/interfaces/type-event';
import { Ubication } from '../../ubication/interfaces/ubication';

export interface Events {
  id: string;
  name: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  images: string[];
  ubication: Ubication;
  typeEvent: TypeEvent;
  organization: Organization;
  statusEvent: string;
}
