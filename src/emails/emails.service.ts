import { Injectable } from "@nestjs/common";
import { SendEmailDto } from "./SendEmailDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Email } from "./email.entity";
import { MongoRepository } from "typeorm";
import { EmailStatus } from "./EmailStatus";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email) private emailsRepository: MongoRepository<Email>,
    private readonly mailerService: MailerService,
  ) {}

  async findAll(): Promise<Email[]> {
    return this.emailsRepository.find();
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    this.validateEmail(sendEmailDto);
    const newEmail = new Email();
    newEmail.email = sendEmailDto.email;
    newEmail.status = EmailStatus.NEW;
    const email = await this.emailsRepository.save(newEmail);
    this.mailerService
      .sendMail({
        to: newEmail.email, // list of receivers
        from: 'noreply@yahya.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: `<b>welcome</b>     <img src="${process.env.SITE_URL}/emails/notify/${email.id}.png" alt="World" />`, // HTML body content
      })
      .then(() => {
        email.status = EmailStatus.DELIVERED;
        this.emailsRepository.save(email);
      })
      .catch(() => {
        email.status = EmailStatus.FAILED;
        this.emailsRepository.save(email);
      });
  }

  private validateEmail(sendEmailDto: SendEmailDto) {
    // TODO
  }

  async notify(id: string) {
    const emailRecord = await this.emailsRepository.findOne(id);
    emailRecord.status = EmailStatus.OPENED;
    await this.emailsRepository.save(emailRecord);
  }
}
