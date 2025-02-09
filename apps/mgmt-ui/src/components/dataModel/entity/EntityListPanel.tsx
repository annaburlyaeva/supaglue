import { deleteEntity } from '@/client';
import MetricCard from '@/components/MetricCard';
import Spinner from '@/components/Spinner';
import { useNotification } from '@/context/notification';
import { useActiveApplicationId } from '@/hooks/useActiveApplicationId';
import { toGetEntitiesResponse, useEntities } from '@/hooks/useEntities';
import { useProviders } from '@/hooks/useProviders';
import { PeopleAltOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type { Provider } from '@supaglue/types';
import Link from 'next/link';
import { DeleteEntity } from './DeleteEntity';

export default function EntityListPanel() {
  const { entities = [], isLoading, mutate } = useEntities();
  const { providers = [], isLoading: isLoadingProviders } = useProviders();
  const applicationId = useActiveApplicationId();
  const { addNotification } = useNotification();

  if (isLoading || isLoadingProviders) {
    return <Spinner />;
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => {
        return (
          <Link
            href={`/applications/${applicationId}/data_model/entities/${params.row.id}`}
            className="flex flex-row gap-2 items-center w-full h-full whitespace-normal break-all"
            style={{
              textDecoration: 'none',
            }}
          >
            {params.row.name}
          </Link>
        );
      },
    },
    {
      field: 'fields',
      headerName: 'fields',
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return <span className="whitespace-normal break-all">{getFieldsListAsString(params.row.fields)}</span>;
      },
    },
    {
      field: 'objects',
      headerName: 'Objects',
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            {providers.flatMap((provider) => {
              const objects = getObjectNamesUsingEntity(provider, params.row.id);
              return objects.map((object) => {
                return (
                  <Link
                    href={`/applications/${applicationId}/data_model/providers/${provider.category}/${provider.name}`}
                    className="flex flex-row gap-2 items-center w-full h-full whitespace-normal"
                  >
                    {object}
                  </Link>
                );
              });
            })}
          </Stack>
        );
      },
    },
    {
      field: '_',
      headerName: 'Admin',
      width: 75,
      renderCell: (params) => {
        return (
          <DeleteEntity
            name={params.row.name}
            onDelete={async () => {
              const response = await deleteEntity(applicationId, params.row.id);
              if (!response.ok) {
                addNotification({ message: response.errorMessage, severity: 'error' });
                return;
              }
              addNotification({ message: 'Successfully removed Entity', severity: 'success' });
              await mutate(toGetEntitiesResponse(entities.filter((s) => s.id !== params.row.id)), false);
            }}
          />
        );
      },
    },
  ];

  const rows = entities.map((entity) => ({
    id: entity.id,
    name: entity.name,
    fields: entity.config.fields.map(({ name }) => name),
  }));

  return (
    <div className="flex flex-col gap-4">
      <MetricCard
        icon={<PeopleAltOutlined />}
        className="w-[calc(100vw-26rem)]"
        value={
          <Stack direction="row" className="align-center justify-between">
            <div>
              {entities.length} {entities.length === 1 ? 'Entity' : 'Entities'}
            </div>
            <div className="p-1">
              <Link
                href={`/applications/${applicationId}/data_model/entities/new`}
                className="flex flex-row gap-2 items-center w-full h-full"
                style={{
                  textDecoration: 'inherit',
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
              >
                <Button color="primary" variant="outlined" size="small">
                  Add
                </Button>
              </Link>
            </div>
          </Stack>
        }
      />
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        sx={{
          boxShadow: 1,
          backgroundColor: 'white',
        }}
        density="comfortable"
        hideFooter
        disableColumnMenu
        rowSelection={false}
      />
    </div>
  );
}

function getFieldsListAsString(fields: string[]): string {
  if (fields.length <= 5) {
    return fields.join(', ');
  }
  return `${fields.slice(0, 5).join(', ')}, ...`;
}

function getObjectNamesUsingEntity(provider: Provider, entityId: string): string[] {
  // TODO: implement this when we support mapping Entity to objects
  return [];
  // if (!provider.objects) {
  //   return [];
  // }
  // const out: string[] = [];
  // out.push(
  //   ...((provider.objects.common as unknown as { name: string; entityId?: string }[] | undefined)
  //     ?.filter((object) => object.entityId === entityId)
  //     .map((object) => object.name) ?? [])
  // );
  // out.push(
  //   ...(provider.objects.standard?.filter((object) => object.entityId === entityId).map((object) => object.name) ?? [])
  // );
  // out.push(
  //   ...(provider.objects.custom?.filter((object) => object.entityId === entityId).map((object) => object.name) ?? [])
  // );
  // return out;
}
