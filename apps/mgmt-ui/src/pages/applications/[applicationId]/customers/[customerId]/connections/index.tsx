import { deleteConnection } from '@/client';
import { DeleteConnection } from '@/components/connections/DeleteConnection';
import Spinner from '@/components/Spinner';
import { useNotification } from '@/context/notification';
import { useActiveApplicationId } from '@/hooks/useActiveApplicationId';
import { useActiveCustomerId } from '@/hooks/useActiveCustomerId';
import { useConnections } from '@/hooks/useConnections';
import Header from '@/layout/Header';
import type { SupaglueProps } from '@/pages/applications/[applicationId]';
import { getServerSideProps } from '@/pages/applications/[applicationId]';
import providerToIcon from '@/utils/providerToIcon';
import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import { useState } from 'react';

export { getServerSideProps };

export default function Home(props: SupaglueProps) {
  const activeCustomerId = useActiveCustomerId();
  const { connections = [], isLoading, mutate } = useConnections(activeCustomerId);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { addNotification } = useNotification();

  const applicationId = useActiveApplicationId();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 300,
      renderCell: (params) => {
        return (
          <Link
            href={`/applications/${applicationId}/customers/${encodeURIComponent(activeCustomerId)}/connections/${
              params.row.providerName
            }`}
          >
            {params.row.id}
          </Link>
        );
      },
    },
    { field: 'category', headerName: 'Category', width: 100 },
    {
      field: 'providerName',
      headerName: 'Provider',
      width: 120,
      renderCell: (params) => providerToIcon(params.row.providerName),
    },
    { field: 'customerId', headerName: 'Customer ID', width: 180 },
    {
      field: 'instanceUrl',
      headerName: 'Instance',
      width: 180,
      renderCell: (params) => {
        return <span className="whitespace-normal">{params.row.instanceUrl}</span>;
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => {
        return (
          <DeleteConnection
            customerId={activeCustomerId}
            providerName={params.row.providerName}
            onDelete={async () => {
              const response = await deleteConnection(applicationId, activeCustomerId, params.row.id);
              if (!response.ok) {
                addNotification({ message: response.errorMessage, severity: 'error' });
                return;
              }
              addNotification({ message: 'Successfully removed connection', severity: 'success' });
              await mutate(
                connections.filter((c) => c.id !== params.row.id),
                false
              );
            }}
          />
        );
      },
    },
  ];

  const rows = connections;

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Connections" onDrawerToggle={handleDrawerToggle} {...props} />
      <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack className="gap-2">
            <Breadcrumbs>
              <Link color="inherit" href={`/applications/${applicationId}`}>
                Home
              </Link>
              <Link color="inherit" href={`/applications/${applicationId}/customers`}>
                Customers
              </Link>
              <Typography color="text.primary">Connections</Typography>
            </Breadcrumbs>
            <div style={{ height: '100%', width: '100%' }}>
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
          </Stack>
        )}
      </Box>
    </Box>
  );
}
