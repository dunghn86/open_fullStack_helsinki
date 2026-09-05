import app from './app.js'
import { PORT } from './src/Utils/config.js'




// mongoose.connection.close();
app.listen(PORT, (req, res) =>
    console.log(`Server is running on port ${PORT}`));


