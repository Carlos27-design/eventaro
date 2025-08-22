import { User } from '../../auth/interfaces/user';
import { Events } from '../../event/interfaces/event';

export interface Inscription {
  id: string;
  dateInscription: Date;
  statusInscription: string;
  token: string;
  tokenExpiresAt: Date;
  event: Events;
  user: User;
}
