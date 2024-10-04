import express from "express";
import { UserWithoutPassword } from "../user";

declare module 'express' {
    export interface Request {
        user?: UserWithoutPassword
    }
}