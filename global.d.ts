import { Connection } from "mongoose"

declare module '*.css'
declare module '*.scss'
declare module '*.sass'


declare global{
    var mongoose: {
        conn: Connection | null
        promise: Promise<Connection> | null
    }
}

export {}