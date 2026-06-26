import app from './src/app.js'
import connectDB from './src/config/db.js'
import asyncHandler from './src/utility/asyncHandler.js';
const Start = asyncHandler(() => {
    connectDB();
    app.listen(5000, () => console.log('server is running on 5000 port'));
})
Start();
