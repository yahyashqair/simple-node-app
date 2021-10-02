import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { EmailStatus } from './EmailStatus';

@Entity('emails')
export class Email {
  @ObjectIdColumn() id: ObjectID;
  @Column() email: string;
  @Column() status: EmailStatus;
}
