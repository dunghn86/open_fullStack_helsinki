import app from "./app.js";
import { PORT } from "./src/Utils/config.js";
import { connectDB } from "./src/Utils/config.js";

app.listen(PORT, (req, res) =>
  console.log(`Server is running on port ${PORT}`),
);
