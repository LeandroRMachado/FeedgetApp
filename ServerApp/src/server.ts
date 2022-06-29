import express from 'express';

export const app = express();

app.listen(3333, () => {
  console.log('HTTP is running on PORT 3333!')
})