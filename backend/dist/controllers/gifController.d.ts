import { Request, Response } from "express";
export declare const getGifs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createGif: (req: Request, res: Response) => Promise<void>;
export declare const deleteGif: (req: Request, res: Response) => Promise<void>;
