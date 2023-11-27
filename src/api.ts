import { Elysia, t } from "elysia";
import { db } from "./db";
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
      .get("/jobs", ({ db }) => db.query.jobs.findMany(), {
        detail: {
          description: "Get all jobs",
          summary: "Get all jobs",
        },
      })
      .get(
        "/job/:id",
        async ({ params, db, cache }) => {
          if (cache.has(params.id)) {
            console.log("cache hit");
            return cache.get(params.id);
          }
          console.log("cache miss");
          const query = await db.query.jobs.findMany({
            where: (jobs, { eq }) => eq(jobs.id, params.id),
            limit: 1,
          });
          const job = query[0];
          cache.set(params.id, job);
          return job;
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
