/* eslint-disable @typescript-eslint/no-floating-promises */
import { useActiveApplicationId } from '@/hooks/useActiveApplicationId';
import type { ProviderCardInfo } from '@/utils/provider';
import providerToIcon from '@/utils/providerToIcon';
import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import type { Provider } from '@supaglue/types';
import { useRouter } from 'next/router';

export default function ProviderCard({
  provider,
  providerInfo,
}: {
  provider?: Provider;
  providerInfo: ProviderCardInfo;
}) {
  const router = useRouter();
  const applicationId = useActiveApplicationId();

  const { name, description, displayCategory, category, providerName } = providerInfo;
  const icon = providerToIcon(providerName, 35);

  return (
    <Card
      classes={{
        root: 'min-h-48 justify-between flex flex-col overflow-y-hidden',
      }}
    >
      <Box>
        <CardHeader
          avatar={icon}
          subheader={
            <Stack direction="row" className="justify-between">
              <Stack direction="column">
                <Typography>{name}</Typography>
                <Typography fontSize={12}>{(displayCategory ?? category).toUpperCase()}</Typography>
              </Stack>
              <Typography color={provider ? '#22c55e' : undefined}>
                {provider ? 'Connected' : 'Not Connected'}
              </Typography>
            </Stack>
          }
        />
        <CardContent
          classes={{
            root: 'text-sm h-[5rem] text-ellipsis overflow-hidden',
          }}
        >
          {description}
        </CardContent>
      </Box>
      <Box>
        <Divider />
        <Grid container justifyContent="flex-end">
          <Button
            variant="text"
            onClick={() => {
              router.push(`/applications/${applicationId}/connectors/providers/${category}/${providerName}`);
            }}
          >
            Configure
          </Button>
        </Grid>
      </Box>
    </Card>
  );
}
