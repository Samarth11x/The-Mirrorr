const net = require("net");
const sock = new net.Socket();
sock.setTimeout(1500);
sock.on("connect", () => {
  console.log("PORT_5432_OPEN");
  sock.destroy();
  process.exit(0);
});
sock.on("error", (e) => {
  console.log("PORT_5432_CLOSED:", e.message);
  process.exit(0);
});
sock.on("timeout", () => {
  console.log("PORT_5432_TIMEOUT");
  sock.destroy();
  process.exit(0);
});
sock.connect(5432, "127.0.0.1");
