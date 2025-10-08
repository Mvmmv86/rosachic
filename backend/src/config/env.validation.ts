import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRATION: z.string(),
  JWT_REFRESH_EXPIRATION: z.string(),
  CORS_ORIGIN: z.string(),
  RATE_LIMIT_TTL: z.string().transform(Number),
  RATE_LIMIT_MAX: z.string().transform(Number),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config)
}