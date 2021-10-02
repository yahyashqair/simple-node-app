import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { SendEmailDto } from './SendEmailDto';
import { Email } from './email.entity';
import { Response as Res } from 'express';
@Controller('emails')
export class EmailsController {
  constructor(private emailsService: EmailsService) {}

  @Get()
  async get(): Promise<Email[]> {
    return this.emailsService.findAll();
  }

  @Post()
  async create(@Body() sendEmailDto: SendEmailDto) {
    await this.emailsService.sendEmail(sendEmailDto);
  }

  @Get('notify/:id')
  async notify(@Param('id') id: string, @Response() res: Res) {
    console.log('Opeeend' + id);
    const buf = new Buffer([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
      0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00,
      0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b,
    ]);
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(buf, 'binary');
  }
}
