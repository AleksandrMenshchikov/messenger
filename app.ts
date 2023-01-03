// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
app.use(express.static(`${__dirname}/dist`));
app.use('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
