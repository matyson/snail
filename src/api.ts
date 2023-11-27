import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { cache } from "./cache";

const jobSchema = t.Object(
  {
    id: t.Numeric({ error: "id must be a number" }),
  },
  {
    error: "Invalid job",
  }
);

const api = new Elysia()
  .decorate("cache", cache)
  .decorate("db", db)
  .group("/api", (app) =>
    app
      .get("/", () => "Using api")
      .get("/jobs", () => "Jobs")
      .get(
        "/job/:id",
        ({ params, db, cache }) => {
          if (cache.has(params.id)) {
            console.log("cache hit");
            return cache.get(params.id);
          }
          console.log("cache miss");
          cache.set(params.id, {
            id: params.id,
            db: db,
            status: "running",
          });
          return {
            id: params.id,
            db: db,
            status: "running",
          };
        },
        {
          detail: {
            description: "Get a job by id",
            summary: "Get a job, sucker!",
          },
          params: jobSchema,
        }
      )
      .get("/cache", ({ cache }) => Object.fromEntries(cache.entries()))
  );

export { api };
