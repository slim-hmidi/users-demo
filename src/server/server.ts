import { app } from "./app";

const port = process.env.port || 3000;

app.listen(3000, () => {
  console.log(`Server runs on 127.0.0.1:${port}`);
});
