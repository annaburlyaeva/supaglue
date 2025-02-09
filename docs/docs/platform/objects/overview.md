import ThemedImage from '@theme/ThemedImage';
import BrowserWindow from '@site/src/components/BrowserWindow';

# Standard & Custom Objects

<ThemedImage
alt="standard and custom objects"
width="20%"
sources={{
      light: '/img/object-diagram.png',
      dark: '/img/object-diagram.png',
    }}
/>

## Introduction

**Standard Objects** and **Custom Objects** (known as **Objects**) have a 1-1 relationship between your application object and your Provider object. For example, a `Contact` in Salesforce is a `salesforce_Contact` in your application, and a Hubspot `company` is a `hubspot_company` in your application.

## Standard object

Supaglue Standard Objects are pre-defined objects in third-party providers, e.g. `Contacts`, `Accounts`, and `Leads` are pre-defined objects in Salesforce and are Standard Objects in Supaglue.

You can use Standard Objects as part of [Managed Syncs](../../integration-patterns/managed-syncs) and [Actions API](../../integration-patterns/actions-api).

### Syncing

Sync Standard Objects to your Destination using Managed Syncs.

#### Configuration

Use the **Syncs --> Sync Configs** page in the Management Portal to specify the Standard Objects you wish to sync to your Destination.

<BrowserWindow url="https://app.supaglue.io/applications/62605dc1-148e-4c53-a850-82e10f71ed23/syncs/sync_configs/new">

![image](/img/standard-object-sync-config.png)

</BrowserWindow>

The screenshot above shows a Sync Config that specifies `OpportunityLineItem`, `Contract`, and `Quote` Standard Objects. Supaglue will sync these Standard Objects.

Since Standard Objects vary by Provider, you need to select the Standard Objects separately for each Provider. The casing of the Standard Objects is also provider-specific, e.g. Standard Objects for Salesforce are "PascalCase".

#### Destination data schema

Supaglue will land the data in your Destination with the following schema:

```
postgres=> \d "salesforce_Contract"
                             Table "public.salesforce_Contract"
          Column          |              Type              | Collation | Nullable | Default
--------------------------+--------------------------------+-----------+----------+---------
 _supaglue_application_id | text                           |           | not null |
 _supaglue_provider_name  | text                           |           | not null |
 _supaglue_customer_id    | text                           |           | not null |
 _supaglue_emitted_at     | timestamp(3) without time zone |           | not null |
 _supaglue_is_deleted     | boolean                        |           | not null |
 _supaglue_raw_data       | jsonb                          |           | not null |
 id                       | text                           |           | not null |
Indexes:
    "salesforce_Contract_pkey" PRIMARY KEY, btree (_supaglue_application_id, _supaglue_provider_name, _supaglue_customer_id, id)
```

### Writing

:::info
The Actions API for Standard Objects is under construction.
:::

## Custom object

Custom Objects are objects that are not pre-defined by third-party Providers. You or your customers may create them.

For example, `ContactDailyMetric` and `ContactMonthlyMetric` are the only contact metric Standard Objects in Salesforce, but your customer may have defined a third Custom Object, `ContactBiannualMetric`.

### Syncing

Sync Custom Objects to your Destination using Managed Syncs.

#### Configuration

Use the **Syncs --> Sync Configs** page in the Management Portal to specify the Custom Objects you wish to sync to your Destination.

<BrowserWindow url="https://app.supaglue.io/applications/62605dc1-148e-4c53-a850-82e10f71ed23/syncs/sync_configs/new">

![image](/img/custom-object-sync-config.png)

</BrowserWindow>

The screenshot above shows a Sync Config that specifies `ContactBiannualMetric` and `BattleCard` Custom Objects. Supaglue will sync these Custom Objects.

The casing of Custom Objects is provider-specific.

#### Destination data schema

Supaglue will land the data in your Destination with the following schema:

```
postgres=> \d "salesforce_BattleCard"
                             Table "public.salesforce_BattleCard"
          Column          |              Type              | Collation | Nullable | Default
--------------------------+--------------------------------+-----------+----------+---------
 _supaglue_application_id | text                           |           | not null |
 _supaglue_provider_name  | text                           |           | not null |
 _supaglue_customer_id    | text                           |           | not null |
 _supaglue_emitted_at     | timestamp(3) without time zone |           | not null |
 _supaglue_is_deleted     | boolean                        |           | not null |
 _supaglue_raw_data       | jsonb                          |           | not null |
 id                       | text                           |           | not null |
Indexes:
    "salesforce_BattleCard_pkey" PRIMARY KEY, btree (_supaglue_application_id, _supaglue_provider_name, _supaglue_customer_id, id)
```

### Writing

:::info
The Actions API for Custom Objects is under construction.
:::
