import { getDependencyContainer } from '@/dependency_container';
import { BadRequestError } from '@supaglue/core/errors';
import { toPaginationInternalParams } from '@supaglue/core/lib';
import type {
  GetSyncRunsPathParams,
  GetSyncRunsQueryParams,
  GetSyncRunsRequest,
  GetSyncRunsResponse,
} from '@supaglue/schemas/v2/mgmt';
import type { SyncRunStatus, SyncRunTimestampFilter } from '@supaglue/types/sync_run';
import { snakecaseKeys } from '@supaglue/utils/snakecase';
import { Router, type Request, type Response } from 'express';

const { syncRunService } = getDependencyContainer();

export default function init(app: Router) {
  const syncRunRouter = Router();

  syncRunRouter.get(
    '/',
    async (
      req: Request<GetSyncRunsPathParams, GetSyncRunsResponse, GetSyncRunsRequest, GetSyncRunsQueryParams>,
      res: Response<GetSyncRunsResponse>
    ) => {
      function getObjectOrEntityFilter() {
        if (req.query?.object_type && req.query.object) {
          return {
            objectType: req.query.object_type,
            object: req.query.object,
          };
        }

        if (req.query?.entity_id) {
          return {
            entityId: req.query.entity_id,
          };
        }

        if (!req.query?.object_type && !req.query?.object && !req.query?.entity_id) {
          return {};
        }

        throw new BadRequestError('must filter on (object_type, object) or entity_id or neither');
      }

      const { next, previous, results, totalCount } = await syncRunService.list({
        applicationId: req.supaglueApplication.id,
        paginationParams: toPaginationInternalParams({ page_size: req.query?.page_size, cursor: req.query?.cursor }),
        ...getObjectOrEntityFilter(),
        externalCustomerId: req.query?.customer_id,
        providerName: req.query?.provider_name,
        status: req.query?.status?.toUpperCase() as SyncRunStatus | undefined,
        startTimestamp: parseTimeFilter(req.query?.start_timestamp),
        endTimestamp: parseTimeFilter(req.query?.end_timestamp),
      });

      const snakeCaseResults = results.map((result) =>
        snakecaseKeys({
          ...result,
          startTimestamp: result.startTimestamp.toISOString(),
          endTimestamp: result.endTimestamp?.toISOString() ?? null,
        })
      );
      return res.status(200).send({ next, previous, results: snakeCaseResults, total_count: totalCount });
    }
  );

  app.use('/sync-runs', syncRunRouter);
}

function parseTimeFilter(timeFilter?: string): SyncRunTimestampFilter | undefined {
  if (!timeFilter) {
    return;
  }
  if (timeFilter.startsWith('>')) {
    return {
      gt: new Date(timeFilter.slice(1)),
    };
  } else if (timeFilter.startsWith('<')) {
    return {
      lt: new Date(timeFilter.slice(1)),
    };
  }
  throw new BadRequestError(`invalid time filter: ${timeFilter}`);
}
