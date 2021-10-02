import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailsController } from './emails/emails.controller';
import { ReportsController } from './reports/reports.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './emails/email.entity';
import { EmailsService } from './emails/emails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Email]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    MailerModule.forRoot({
      transport:
        'smtps://ceo.slacktest@gmail.com:lnfnbhmfbvupybrs@smtp.gmail.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController, EmailsController, ReportsController],
  providers: [AppService, EmailsService],
})
export class AppModule {}
