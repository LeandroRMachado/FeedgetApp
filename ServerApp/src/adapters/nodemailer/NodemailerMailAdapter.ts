import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "97fa8a1cc6884e",
    pass: "9ff286075e126b"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Leandro Machado <leandroskullofwar@outlook.com>',
      subject,
      html: body,
    });
  };
}