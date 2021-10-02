import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { EmailStatus } from './EmailStatus';

@Entity('emails')
export class Email {
  @ObjectIdColumn() id: ObjectID;

  @Column({ unique: true }) email: string;
  @Column() status: EmailStatus;
}
