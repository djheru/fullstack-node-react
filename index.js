const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('./services/passport');

const app = express();
authRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT);
