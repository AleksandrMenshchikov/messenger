const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
