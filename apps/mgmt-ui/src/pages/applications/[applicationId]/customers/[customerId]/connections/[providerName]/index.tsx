import { updateCustomerEntityMapping } from '@/client';
import Spinner from '@/components/Spinner';
import { TabPanel } from '@/components/TabPanel';
import { useNotification } from '@/context/notification';
import { useActiveApplicationId } from '@/hooks/useActiveApplicationId';
import { useActiveCustomerId } from '@/hooks/useActiveCustomerId';
import { useCustomObjects } from '@/hooks/useCustomObjects';
import { toListEntityMappingsResponse, useEntityMappings } from '@/hooks/useEntityMappings';
import { useProperties } from '@/hooks/useProperties';
import { useStandardObjects } from '@/hooks/useStandardObjects';
import Header from '@/layout/Header';
import type { SupaglueProps } from '@/pages/applications/[applicationId]';
import { getServerSideProps } from '@/pages/applications/[applicationId]';
import providerToIcon from '@/utils/providerToIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import type {
  ConnectionEntityMapping,
  EntityFieldMapping,
  MergedEntityFieldMapping,
  MergedEntityMapping,
} from '@supaglue/types/entity_mapping';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export { getServerSideProps };

type FriendlyStandardOrCustomObject =
  | {
      type: 'standard';
      name: string;
    }
  | {
      type: 'custom';
      id: string;
      name: string;
    };

type FriendlyStandardOrCustomObjectWithAttribution =
  | {
      type: 'standard';
      name: string;
      from: 'developer' | 'customer';
    }
  | {
      type: 'custom';
      id: string;
      name: string;
      from: 'developer' | 'customer';
    };

export default function Home(props: SupaglueProps) {
  const applicationId = useActiveApplicationId();
  const customerId = useActiveCustomerId();
  const { providerName } = useRouter().query;
  const { entityMappings = [], isLoading, mutate } = useEntityMappings(customerId, providerName as string);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const { addNotification } = useNotification();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const saveEntityMapping = async (mergedEntityMapping: MergedEntityMapping) => {
    const { entityId, object, fieldMappings } = mergedEntityMapping;
    const entityMapping: ConnectionEntityMapping = {
      entityId: entityId,
      object: object?.from === 'customer' ? object : undefined,
      fieldMappings: fieldMappings.filter(
        (fieldMapping) => fieldMapping.from === 'customer' && fieldMapping.mappedField
      ) as EntityFieldMapping[],
    };
    const response = await updateCustomerEntityMapping(
      applicationId,
      customerId,
      providerName as string,
      entityMapping
    );
    if (!response.ok) {
      addNotification({ message: response.errorMessage, severity: 'error' });
      return;
    }
    addNotification({ message: 'Successfully updated entity mapping', severity: 'success' });
    const idx = entityMappings.findIndex((entityMapping) => entityMapping.entityId === entityId);
    if (idx !== -1) {
      await mutate(
        toListEntityMappingsResponse([
          ...entityMappings.slice(0, idx),
          mergedEntityMapping,
          ...entityMappings.slice(idx + 1),
        ]),
        false
      );
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header title="Connection" onDrawerToggle={handleDrawerToggle} {...props} />
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
              <Link color="inherit" href={`/applications/${applicationId}/customers/${customerId}/connections`}>
                Connections
              </Link>
              <Typography color="text.primary">Connection</Typography>
            </Breadcrumbs>
            <Card>
              <Typography variant="h6" component="h2" sx={{ p: 2 }}>
                Entity Mappings
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab}>
                  {entityMappings.map((mapping, idx) => (
                    <Tab key={idx} label={mapping.entityName} onClick={() => setTab(idx)} />
                  ))}
                </Tabs>
              </Box>
              <Box component="main" sx={{ flex: 1, py: 6, px: 4 }}>
                {entityMappings.map((mapping, idx) => (
                  <TabPanel value={tab} index={idx} key={idx} className="w-full">
                    <EntityMapping
                      initialMapping={mapping}
                      customerId={customerId}
                      entity={mapping.entityName}
                      providerName={providerName as string}
                      saveEntityMapping={saveEntityMapping}
                    />
                  </TabPanel>
                ))}
              </Box>
            </Card>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

type EntityMappingsProps = {
  customerId: string;
  entity: string;
  providerName: string;
  initialMapping: MergedEntityMapping;
  saveEntityMapping: (mapping: MergedEntityMapping) => void;
};

function EntityMapping({ customerId, entity, providerName, initialMapping, saveEntityMapping }: EntityMappingsProps) {
  const [mergedEntityMapping, setMergedEntityMapping] = useState<MergedEntityMapping>(initialMapping);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { data: customObjectOptions = [] } = useCustomObjects(customerId, providerName);

  const setObject = (selected: FriendlyStandardOrCustomObject | undefined) => {
    setMergedEntityMapping({
      ...mergedEntityMapping,
      object: selected
        ? selected.type === 'standard'
          ? {
              type: 'standard',
              name: selected.name,
              from: 'customer',
            }
          : {
              type: 'custom',
              name: selected.id,
              from: 'customer',
            }
        : undefined,
    });
    setIsDirty(true);
  };

  const setFieldMapping = (
    idx: number,
    entityField: string,
    mappedField: string | undefined,
    isAdditional: boolean
  ) => {
    const newFieldMappings = [...mergedEntityMapping.fieldMappings];
    newFieldMappings[idx] = {
      entityField,
      mappedField,
      from: 'customer',
      isAdditional,
    };
    setMergedEntityMapping({ ...mergedEntityMapping, fieldMappings: newFieldMappings });
    setIsDirty(true);
  };

  const addFieldMapping = () => {
    setMergedEntityMapping({
      ...mergedEntityMapping,
      fieldMappings: [
        ...mergedEntityMapping.fieldMappings,
        { entityField: '', mappedField: undefined, from: 'customer', isAdditional: true },
      ],
    });
    setIsDirty(true);
  };

  const deleteFieldMapping = (idx: number) => {
    const newFieldMappings = [...mergedEntityMapping.fieldMappings];
    newFieldMappings.splice(idx, 1);
    setMergedEntityMapping({ ...mergedEntityMapping, fieldMappings: newFieldMappings });
    setIsDirty(true);
  };

  const isValid =
    !!mergedEntityMapping.object &&
    mergedEntityMapping.fieldMappings.every((fieldMapping) => !!fieldMapping.mappedField && !!fieldMapping.entityField);

  const entityMappingFriendlyObjectWithAttribution: FriendlyStandardOrCustomObjectWithAttribution | undefined =
    mergedEntityMapping.object
      ? mergedEntityMapping.object.type === 'standard'
        ? {
            type: 'standard',
            name: mergedEntityMapping.object.name,
            from: mergedEntityMapping.object.from,
          }
        : {
            type: 'custom',
            id: mergedEntityMapping.object.name,
            name: customObjectOptions.find(({ id }) => id === mergedEntityMapping.object?.name)?.name ?? '',
            from: mergedEntityMapping.object.from,
          }
      : undefined;

  return (
    <>
      <Box
        sx={{
          'max-width': 600,
        }}
      >
        <Grid container spacing={2}>
          <EntityObjectMapping
            entity={entity}
            customerId={customerId}
            providerName={providerName}
            object={entityMappingFriendlyObjectWithAttribution}
            setObject={setObject}
          />
          <EntityFieldMappings
            key={mergedEntityMapping.fieldMappings.length}
            customerId={customerId}
            entity={entity}
            allowAdditionalFieldMappings={mergedEntityMapping.allowAdditionalFieldMappings}
            providerName={providerName}
            object={entityMappingFriendlyObjectWithAttribution}
            fieldMappings={mergedEntityMapping.fieldMappings}
            setFieldMapping={setFieldMapping}
            addFieldMapping={addFieldMapping}
            deleteFieldMapping={deleteFieldMapping}
          />
        </Grid>
        <Stack direction="row" className="gap-2 pt-4 items-center justify-end">
          <Button
            variant="contained"
            color="primary"
            disabled={!isValid || !isDirty}
            onClick={() => {
              saveEntityMapping(mergedEntityMapping);
              setIsDirty(false);
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
}

type EntityObjectMappingProps = {
  entity: string;
  customerId: string;
  providerName: string;
  object?: FriendlyStandardOrCustomObjectWithAttribution;
  setObject: (selected: FriendlyStandardOrCustomObject | undefined) => void;
};
function EntityObjectMapping({ entity, customerId, providerName, object, setObject }: EntityObjectMappingProps) {
  const { data: standardObjectOptions = [], error: standardObjectOptionsError } = useStandardObjects(
    customerId,
    providerName
  );
  const { data: customObjectOptions = [], error: customObjectOptionsError } = useCustomObjects(
    customerId,
    providerName
  );
  const [objectOptions, setObjectOptions] = useState<FriendlyStandardOrCustomObject[]>([]);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (standardObjectOptionsError || customObjectOptionsError) {
      setObjectOptions([]);
      addNotification({
        message: `Error loading objects types: ${(standardObjectOptionsError || customObjectOptionsError).message}`,
        severity: 'error',
      });
      return;
    }
    setObjectOptions([
      ...standardObjectOptions.map(({ name }) => ({
        type: 'standard' as const,
        name,
      })),
      ...customObjectOptions.map((object) => ({
        type: 'custom' as const,
        id: object.id,
        name: object.name,
      })),
    ]);
  }, [standardObjectOptions, customObjectOptions, customObjectOptionsError, standardObjectOptionsError]);

  return (
    <>
      <Grid item xs={4}>
        <Stack direction="row" className="gap-2 items-center justify-between">
          <Stack direction="row" className="gap-2 items-center">
            {providerToIcon('supaglue', 40)}
            <Typography>{entity}</Typography>
          </Stack>
          <SyncAltIcon />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack direction="row" className="gap-4 items-start">
          {providerToIcon(providerName, 40)}
          <Autocomplete
            disabled={object?.from === 'developer'}
            size="small"
            id="entity-object"
            options={objectOptions}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.name}
            value={object}
            autoSelect
            renderTags={(value, getTagProps) =>
              value.map((option, index: number) => (
                <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Objects" helperText={`Available objects in ${providerName}.`} />
            )}
            onChange={(event: any, value) => {
              setObject(value ?? undefined);
            }}
          />
        </Stack>
      </Grid>
    </>
  );
}

type EntityFieldMappingsProps = {
  customerId: string;
  entity: string;
  object?: FriendlyStandardOrCustomObjectWithAttribution;
  allowAdditionalFieldMappings: boolean;
  providerName: string;
  fieldMappings: MergedEntityFieldMapping[];
  setFieldMapping: (idx: number, entityField: string, mappedField: string | undefined, isAdditional: boolean) => void;
  addFieldMapping: () => void;
  deleteFieldMapping: (idx: number) => void;
};

function EntityFieldMappings({
  customerId,
  providerName,
  object,
  fieldMappings,
  allowAdditionalFieldMappings,
  setFieldMapping,
  addFieldMapping,
  deleteFieldMapping,
}: EntityFieldMappingsProps) {
  const { properties = [], isLoading } = useProperties(
    customerId,
    providerName,
    object?.type ?? 'standard',
    object?.name ?? ''
  );
  return (
    <>
      {fieldMappings.map(({ entityField, mappedField, from, isAdditional }, idx) => (
        <>
          <Grid item xs={4}>
            {isAdditional ? (
              <TextField
                required={true}
                value={entityField}
                size="small"
                label="Field Name (must be unique)"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldMapping(idx, event.target.value, mappedField, true);
                }}
              />
            ) : (
              <Typography>{entityField}</Typography>
            )}
          </Grid>
          <Grid item xs={7}>
            <Autocomplete
              disabled={!object || isLoading || from === 'developer'}
              loading={isLoading}
              key={properties.length}
              size="small"
              id="entity-object-field"
              options={properties ?? []}
              value={properties.find(({ id }) => id === mappedField)}
              autoSelect
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{
                    borderRadius: '8px',
                    margin: '5px',
                  }}
                  {...props}
                >
                  <Stack direction="column">
                    <Typography>{option.label}</Typography>
                    <Typography variant="caption">{option.id}</Typography>
                  </Stack>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`${providerName} field`}
                  helperText={object ? `Available fields for ${object?.name} in ${providerName}.` : undefined}
                />
              )}
              onChange={(event: any, value) => {
                setFieldMapping(idx, entityField, value?.id, isAdditional);
              }}
            />
          </Grid>
          <Grid item xs={1}>
            {isAdditional && (
              <IconButton onClick={() => deleteFieldMapping(idx)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        </>
      ))}
      {allowAdditionalFieldMappings && <Button onClick={addFieldMapping}>+ Add field mapping</Button>}
    </>
  );
}
