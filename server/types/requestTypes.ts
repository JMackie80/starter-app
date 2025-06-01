import { z } from 'zod'

export type RequestSchema = {
    params?: z.ZodObject<any>,
    query?: z.ZodObject<any>,
    body?: z.ZodObject<any>
}