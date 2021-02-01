import { logger } from 'services';
import { NextFunction, Request, Response, Router } from 'express';

export class EtagRoute {
    public static path = '/etag';
    private static instance: EtagRoute;
    private router = Router();

    private constructor() {
        logger.info('[EtagRoute] Creating ping route.');

        this.router.get('/', this.get);
    }

    static get router() {
        if (!EtagRoute.instance) EtagRoute.instance = new EtagRoute();
        return EtagRoute.instance.router;
    }

    private get = async (req: Request, res: Response, next: NextFunction) => {
        const random = Math.random();
        console.log(random)
        if (random < 0.5) {
            res.setHeader('ETag', random * 10000);
            res.json('Sample ETag example ' + (random * 1000).toString());
            next();
        } else {
            res.sendStatus(304);
        }
    };
}