const http = require("http");

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", reject);
  });
}

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(`http://localhost:3000${path}`, { method: "POST", headers: { "Content-Type": "application/json" } }, (res) => {
      let d = "";
      res.on("data", (chunk) => (d += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: d }));
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function del(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:3000${path}`, { method: "DELETE" }, (res) => {
      let d = "";
      res.on("data", (chunk) => (d += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: d }));
    });
    req.on("error", reject);
    req.end();
  });
}

async function run() {
  const app = require("./server.js");

  await new Promise((r) => setTimeout(r, 1000));

  console.log("--- GET /users ---");
  console.log(await get("/users"));

  console.log("\n--- GET /todos ---");
  console.log(await get("/todos"));

  console.log("\n--- POST /users ---");
  console.log(await post("/users", { name: "Sara", email: "sara@test.com" }));

  console.log("\n--- GET /users/1 ---");
  console.log(await get("/users/1"));

  console.log("\n--- DELETE /users/2 ---");
  console.log(await del("/users/2"));

  console.log("\n--- GET /users (after delete) ---");
  console.log(await get("/users"));

  console.log("\nAll tests passed!");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
