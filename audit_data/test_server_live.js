import http from "http";
import app from "./server/src/index.js";

const TEST_PORT = 5055;
const server = app.listen(TEST_PORT, async () => {
  console.log(`Server listening on port ${TEST_PORT} for probe test...`);

  function get(urlPath) {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${TEST_PORT}${urlPath}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode, data });
        });
      }).on("error", reject);
    });
  }

  try {
    const health = await get("/api/health");
    console.log("Health Check:", health.status, health.data);

    const services = await get("/api/services");
    console.log("Services API Status:", services.status);
    const parsedServices = JSON.parse(services.data);
    console.log("Services Count:", parsedServices.count);
    parsedServices.data.forEach((s) => console.log(`  - [${s.slug}] ${s.name} (price: ${s.price || "Contact us for pricing"})`));

    const root = await get("/");
    console.log("Root HTML Status:", root.status, "HTML length:", root.data.length);

    console.log("ALL LIVE PROBES PASSED!");
  } catch (err) {
    console.error("Probe error:", err);
  } finally {
    server.close(() => {
      console.log("Server stopped successfully.");
      process.exit(0);
    });
  }
});
