import express from 'express';

const app = express();
const { PORT = 3000 } = process.env;
app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
