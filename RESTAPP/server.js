const http = require("http");
const app = require("./src/app");

const PORT = process.env.PORT || 3000; // ✅ Fixed PORT logic

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
