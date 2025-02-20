import { getDependencyContainer } from '@/dependency_container';
import { openapiMiddleware } from '@/middleware/openapi';
import type {
  SendPassthroughRequestPathParams,
  SendPassthroughRequestRequest,
  SendPassthroughRequestResponse,
} from '@supaglue/schemas/v2/actions';
import type { Request, Response } from 'express';
import { Router } from 'express';
import associations from './associations';
import entities from './entities';
import objects from './objects';

const { passthroughService } = getDependencyContainer();

export default function init(app: Router): void {
  const v2Router = Router();
  v2Router.use(openapiMiddleware('actions', 'v2'));

  v2Router.post(
    '/passthrough',
    async (
      req: Request<SendPassthroughRequestPathParams, SendPassthroughRequestResponse, SendPassthroughRequestRequest>,
      res: Response<SendPassthroughRequestResponse>
    ) => {
      const response = await passthroughService.send(req.customerConnection.id, req.body);
      return res.status(200).send(response);
    }
  );

  entities(v2Router);
  objects(v2Router);
  associations(v2Router);

  app.use('/v2', v2Router);
}
