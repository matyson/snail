import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { api } from "./api";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Snail API Documentation",
          version: "0.0.1",
        },
      },
    })
  )
  .use(api)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
