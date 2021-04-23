import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`\nServer is running on port ${port}`);
});
