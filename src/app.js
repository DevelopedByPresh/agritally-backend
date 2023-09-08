const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { logger } = require('./utils/logger.utils');
const handleError = require('./middleware/errorHandler.middleware');
// const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const poultryRouter = require('./routes/poultry.route');

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/poultry', poultryRouter);

app.use(handleError);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
