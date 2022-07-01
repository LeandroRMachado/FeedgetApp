import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "97fa8a1cc6884e",
    pass: "9ff286075e126b"
  }
});

// GET = Buscar informações 
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

app.post('/feedbacks', async (req, res) => {
  const { comment, type, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Leandro Machado <leandroskullofwar@outlook.com>',
      subject: 'New Feedback',
      html: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    });

  return res.status(201).json({data: feedback});
})

app.listen(3333, () => {
  console.log('HTTP is running on PORT 3333!')
});