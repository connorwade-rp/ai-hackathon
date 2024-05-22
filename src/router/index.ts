import { Hono } from "hono";

const server = new Hono();

server.get("/", (c) => {
  return c.text("Hello World");
});

Bun.serve(server);
// export default server;
