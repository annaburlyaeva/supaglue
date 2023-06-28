/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


/** Type helpers */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
type OneOf<T extends any[]> = T extends [infer Only] ? Only : T extends [infer A, infer B, ...infer Rest] ? OneOf<[XOR<A, B>, ...Rest]> : never;

export interface paths {
  "/customers": {
    /**
     * List customers 
     * @description Get a list of customers
     */
    get: operations["getCustomers"];
    /** Upsert customer */
    put: operations["upsertCustomer"];
  };
  "/customers/{customer_id}": {
    /** Get customer */
    get: operations["getCustomer"];
    /** Delete customer */
    delete: operations["deleteCustomer"];
    parameters: {
      path: {
        customer_id: string;
      };
    };
  };
  "/destinations": {
    /**
     * List destinations 
     * @description Get a list of destinations
     */
    get: operations["getDestinations"];
    /** Create destination */
    post: operations["createDestination"];
  };
  "/destinations/{destination_id}": {
    /** Get destination */
    get: operations["getDestination"];
    /** Update destination */
    put: operations["updateDestination"];
    parameters: {
      path: {
        destination_id: string;
      };
    };
  };
  "/schemas": {
    /**
     * List schemas 
     * @description Get a list of schemas
     */
    get: operations["getSchemas"];
    /** Create schema */
    post: operations["createSchema"];
  };
  "/schemas/{schema_id}": {
    /** Get schema */
    get: operations["getSchema"];
    /** Update schema */
    put: operations["updateSchema"];
    /** Delete schema */
    delete: operations["deleteSchema"];
    parameters: {
      path: {
        schema_id: string;
      };
    };
  };
  "/providers": {
    /**
     * List providers 
     * @description Get a list of providers
     */
    get: operations["getProviders"];
    /** Create provider */
    post: operations["createProvider"];
  };
  "/providers/{provider_id}": {
    /** Get provider */
    get: operations["getProvider"];
    /** Update provider */
    put: operations["updateProvider"];
    /** Delete provider */
    delete: operations["deleteProvider"];
    parameters: {
      path: {
        provider_id: string;
      };
    };
  };
  "/sync_configs": {
    /**
     * List Sync Configs 
     * @description Get a list of Sync Configs
     */
    get: operations["getSyncConfigs"];
    /** Create Sync Config */
    post: operations["createSyncConfig"];
  };
  "/sync_configs/{sync_config_id}": {
    /** Get Sync Config */
    get: operations["getSyncConfig"];
    /** Update Sync Config */
    put: operations["updateSyncConfig"];
    /** Delete Sync Config */
    delete: operations["deleteSyncConfig"];
    parameters: {
      path: {
        sync_config_id: string;
      };
    };
  };
  "/customers/{customer_id}/connections": {
    /**
     * List connections 
     * @description Get a list of connections
     */
    get: operations["getConnections"];
    /** Create connection */
    post: operations["createConnection"];
    parameters: {
      path: {
        customer_id: string;
      };
    };
  };
  "/customers/{customer_id}/connections/{connection_id}": {
    /** Get connection */
    get: operations["getConnection"];
    /** Delete connection */
    delete: operations["deleteConnection"];
    /** Update connection */
    patch: operations["updateConnection"];
    parameters: {
      path: {
        customer_id: string;
        connection_id: string;
      };
    };
  };
  "/customers/{customer_id}/connections/{connection_id}/sync": {
    /** Get sync */
    get: operations["getSync"];
    /** Enable sync */
    post: operations["enableSync"];
    /** Disable sync */
    delete: operations["disableSync"];
    parameters: {
      path: {
        customer_id: string;
        connection_id: string;
      };
    };
  };
  "/webhook": {
    /**
     * Get webhook 
     * @description Get webhook details
     */
    get: operations["getWebhook"];
    /** Create webhook */
    post: operations["createWebhook"];
    /** Delete webhook */
    delete: operations["deleteWebhook"];
  };
  "/sync-history": {
    /**
     * Get Sync History 
     * @description Get a list of Sync History objects.
     */
    get: operations["getSyncHistory"];
  };
  "/sync-info": {
    /**
     * Get Sync Info 
     * @description Get a list of Sync Info
     */
    get: operations["getSyncInfos"];
  };
  "/force-sync": {
    /**
     * Force a full sync 
     * @description Force a full sync
     */
    post: operations["createForceSync"];
  };
}

export interface webhooks {
  "webhook": {
    /** Webhook */
    post: operations["webhook"];
  };
}

export interface components {
  schemas: {
    customer: {
      /** @example d8ceb3ff-8b7f-4fa7-b8de-849292f6ca69 */
      application_id: string;
      /** @example your-customers-unique-application-id */
      customer_id: string;
      /** @example MyCompany Inc */
      name: string;
      /** @example contact@mycompany.com */
      email: string;
      connections?: (components["schemas"]["connection"])[];
    };
    provider: {
      /** @example e888cedf-e9d0-42c5-9485-2d72984faef2 */
      id: string;
      /** @example 9572d08b-f19f-48cc-a992-1eb7031d3f6a */
      application_id: string;
      category: components["schemas"]["category"];
      /** @enum {string} */
      auth_type: "oauth2";
      name: components["schemas"]["provider_name"];
      config: components["schemas"]["create_provider_config"];
      objects?: components["schemas"]["objects"];
    };
    destination: {
      /** @example e888cedf-e9d0-42c5-9485-2d72984faef2 */
      id: string;
      /** @example 9572d08b-f19f-48cc-a992-1eb7031d3f6a */
      application_id: string;
      /** @example My Destination */
      name: string;
    } & OneOf<[{
      /** @enum {string} */
      type: "s3";
      config: components["schemas"]["s3_config"];
    }, {
      /** @enum {string} */
      type: "postgres";
      config: components["schemas"]["postgres_config"];
    }]>;
    s3_config: {
      /** @example us-west-2 */
      region: string;
      /** @example my-test-bucket */
      bucket: string;
      access_key_id: string;
      secret_access_key: string;
    };
    postgres_config: {
      /** @example https://mydb.com */
      host: string;
      /** @example 5432 */
      port: number;
      /** @example my_database */
      database: string;
      /** @example public */
      schema: string;
      /** @example myuser */
      user: string;
      /** @example password */
      password: string;
    };
    schema: {
      /** @example 649b1e49-2722-46a3-a7e7-10caae78a43f */
      id: string;
      /** @example d8ceb3ff-8b7f-4fa7-b8de-849292f6ca69 */
      application_id: string;
      /** @example my-schema */
      name: string;
      config: components["schemas"]["schema_config"];
    };
    schema_config: {
      fields: ({
          name: string;
          mapped_name?: string;
        })[];
      allow_additional_field_mappings: boolean;
    };
    objects: {
      common: ({
          /** @example common_object_name */
          name: string;
          /** @description If set, will sync these mapped fields into the raw_data column in addition to the common model. If not set, will fetch all fields as is. */
          schema_id?: string;
        })[];
      standard: ({
          /** @example standard_object_name */
          name: string;
          schema_id?: string;
        })[];
      custom: ({
          /** @example custom_object_name */
          name: string;
          schema_id?: string;
        })[];
    };
    connection: {
      /** @example e888cedf-e9d0-42c5-9485-2d72984faef2 */
      id: string;
      /**
       * @example available 
       * @enum {string}
       */
      status: "available" | "added" | "authorized" | "callable";
      /** @example d8ceb3ff-8b7f-4fa7-b8de-849292f6ca69 */
      application_id: string;
      /** @example my-customer-1 */
      customer_id: string;
      /** @example 677fcfca-cf89-4387-a189-71c885be67bc */
      provider_id: string;
      provider_name: components["schemas"]["provider_name"];
      category: components["schemas"]["category"];
      /**
       * @description Instance URL for the connected customer. 
       * @example https://app.hubspot.com/contacts/123456
       */
      instance_url: string;
      schema_mappings_config?: {
        common_objects?: ({
            object: string;
            field_mappings: ({
                schema_field: string;
                mapped_field: string;
              })[];
          })[];
        standard_objects?: ({
            object: string;
            field_mappings: ({
                schema_field: string;
                mapped_field: string;
              })[];
          })[];
      };
    };
    /** @enum {string} */
    category: "crm" | "engagement";
    sync_config: {
      /** @example 465fdcb7-26b4-4090-894c-67cab41022bb */
      id: string;
      /** @example 9572d08b-f19f-48cc-a992-1eb7031d3f6a */
      application_id: string;
      /** @example 6e7baa88-84dd-4dbc-902a-14522c2984eb */
      destination_id: string;
      /** @example 7f72ec07-e5c1-47fd-8cf5-e71dd13873af */
      provider_id: string;
      config: components["schemas"]["sync_config_data"];
    };
    /**
     * @example {
     *   "default_config": {
     *     "period_ms": 60000,
     *     "strategy": "full then incremental"
     *   }
     * }
     */
    sync_config_data: {
      default_config: {
        /** @example 60000 */
        period_ms: number;
        /** @enum {string} */
        strategy: "full then incremental" | "full only";
        start_sync_on_connection_creation: boolean;
      };
      common_objects?: ({
          /** @example contacts */
          object: string;
        })[];
      standard_objects?: ({
          /** @example contacts */
          object: string;
        })[];
      custom_objects?: ({
          /** @example contacts */
          object: string;
        })[];
    };
    /**
     * @example {
     *   "provider_app_id": "my_app_id",
     *   "use_managed_oauth": true,
     *   "oauth": {
     *     "oauth_scopes": [
     *       "crm.objects.contacts.read",
     *       "crm.objects.companies.read",
     *       "crm.objects.deals.read",
     *       "crm.objects.owners.read",
     *       "crm.objects.contacts.write",
     *       "crm.objects.companies.write",
     *       "crm.objects.deals.write"
     *     ],
     *     "credentials": {
     *       "oauth_client_id": "7393b5a4-5e20-4648-87af-b7b297793fd1",
     *       "oauth_client_secret": "941b846a-5a8c-48b8-b0e1-41b6d4bc4f1a"
     *     }
     *   }
     * }
     */
    create_provider_config: {
      /** @example my_app_id */
      provider_app_id: string;
      /**
       * @description True: use Supaglue's OAuth application credentials. False: Use the provided OAuth application credentials. 
       * @example false
       */
      use_managed_oauth?: boolean;
      oauth: {
        oauth_scopes: (string)[];
        credentials: {
          /** @example 7393b5a4-5e20-4648-87af-b7b297793fd1 */
          oauth_client_id: string;
          /** @example 941b846a-5a8c-48b8-b0e1-41b6d4bc4f1a */
          oauth_client_secret: string;
        };
      };
    };
    /**
     * @example {
     *   "provider_app_id": "my_app_id",
     *   "oauth": {
     *     "oauth_scopes": [
     *       "crm.objects.contacts.read",
     *       "crm.objects.companies.read",
     *       "crm.objects.deals.read",
     *       "crm.objects.owners.read",
     *       "crm.objects.contacts.write",
     *       "crm.objects.companies.write",
     *       "crm.objects.deals.write"
     *     ],
     *     "credentials": {
     *       "oauth_client_id": "7393b5a4-5e20-4648-87af-b7b297793fd1",
     *       "oauth_client_secret": "941b846a-5a8c-48b8-b0e1-41b6d4bc4f1a"
     *     }
     *   }
     * }
     */
    update_provider_config: {
      /** @example my_app_id */
      provider_app_id: string;
      oauth: {
        oauth_scopes: (string)[];
        credentials: {
          /** @example 7393b5a4-5e20-4648-87af-b7b297793fd1 */
          oauth_client_id: string;
          /** @example 941b846a-5a8c-48b8-b0e1-41b6d4bc4f1a */
          oauth_client_secret: string;
        };
      };
    };
    /** @enum {string} */
    provider_name: "hubspot" | "salesforce" | "pipedrive" | "zendesk_sell" | "ms_dynamics_365_sales" | "zoho_crm" | "capsule" | "outreach";
    /** @enum {string} */
    provider_name_crm: "hubspot" | "salesforce" | "pipedrive" | "zendesk_sell" | "ms_dynamics_365_sales" | "zoho_crm" | "capsule";
    /** @enum {string} */
    provider_name_engagement: "outreach";
    sync: {
      /** @example 7a34a7bb-193a-4cca-ac16-63ef739995e1 */
      id: string;
      /** @example 0a292508-d254-4929-98d3-dc23416efff8 */
      connection_id: string;
      /** @example ee2b63fa-edec-4875-b2f5-921d3b13ca83 */
      sync_config_id?: string;
      /** @example false */
      force_sync_flag: boolean;
      /** @example false */
      paused: boolean;
    };
    create_update_customer: {
      /** @example your-customers-unique-application-id */
      customer_id: string;
      /** @example MyCompany Inc */
      name: string;
      /** @example contact@mycompany.com */
      email: string;
    };
    create_provider: {
      /** @enum {string} */
      auth_type: "oauth2";
      config: components["schemas"]["create_provider_config"];
      objects?: components["schemas"]["objects"];
    } & OneOf<[{
      /** @enum {string} */
      category: "crm";
      name: components["schemas"]["provider_name_crm"];
    }, {
      /** @enum {string} */
      category: "engagement";
      name: components["schemas"]["provider_name_engagement"];
    }]>;
    update_provider: {
      /** @enum {string} */
      auth_type: "oauth2";
      config: components["schemas"]["update_provider_config"];
      objects?: components["schemas"]["objects"];
    } & OneOf<[{
      /** @enum {string} */
      category: "crm";
      name: components["schemas"]["provider_name_crm"];
    }, {
      /** @enum {string} */
      category: "engagement";
      name: components["schemas"]["provider_name_engagement"];
    }]>;
    create_update_schema: {
      /** @example my-schema */
      name: string;
      config: components["schemas"]["schema_config"];
    };
    create_update_destination: {
      /** @example My Destination */
      name: string;
    } & OneOf<[{
      /** @enum {string} */
      type: "s3";
      config: components["schemas"]["s3_config"];
    }, {
      /** @enum {string} */
      type: "postgres";
      config: components["schemas"]["postgres_config"];
    }]>;
    create_update_sync_config: {
      /** @example 6e7baa88-84dd-4dbc-902a-14522c2984eb */
      destination_id: string;
      /** @example 7f72ec07-e5c1-47fd-8cf5-e71dd13873af */
      provider_id: string;
      config: components["schemas"]["sync_config_data"];
    };
    webhook: {
      url: string;
      notify_on_sync_success: boolean;
      notify_on_sync_error: boolean;
      notify_on_connection_success: boolean;
      notify_on_connection_error: boolean;
      headers?: {
        [key: string]: unknown | undefined;
      };
    };
    sync_info: {
      /** @example Account */
      model_name: string;
      /** @example 2023-02-22T19:55:17.559Z */
      last_sync_start: string | null;
      /** @example 2023-02-22T20:55:17.559Z */
      next_sync_start: string | null;
      /** @enum {string|null} */
      status: "SYNCING" | "DONE" | null;
      /** @example 974125fa-ffb6-47fc-b12f-44c566fc5da1 */
      application_id: string;
      /** @example my-customer-1 */
      customer_id: string;
      /** @example hubspot */
      provider_name: string;
      /** @enum {string} */
      category: "crm" | "engagement";
      /** @example 3217ea51-11c8-43c9-9547-6f197e02e5e4 */
      connection_id: string;
    };
    sync_history: ({
      error_message: string | null;
      /** @example 2023-02-22T19:55:17.559Z */
      start_timestamp: string;
      /** @example 2023-02-22T20:55:17.559Z */
      end_timestamp: string | null;
      /** @example 974125fa-ffb6-47fc-b12f-44c566fc5da1 */
      application_id: string;
      /** @example my-customer-1 */
      customer_id: string;
      /** @example hubspot */
      provider_name: string;
      /** @enum {string} */
      category: "crm";
      /** @example 3217ea51-11c8-43c9-9547-6f197e02e5e4 */
      connection_id: string;
      /** @enum {string} */
      status: "SUCCESS" | "IN_PROGRESS" | "FAILURE";
      /** @example 100 */
      num_records_synced?: number | null;
    }) & OneOf<[{
      /** @example contact */
      model_name: string;
    }, {
      /** @example account */
      standard_object: string;
    }, {
      /** @example account */
      custom_object: string;
    }]>;
    force_sync: {
      /** @example true */
      success: boolean;
    };
    "webhook-payload": OneOf<[{
      /** @enum {unknown} */
      type: "SYNC_SUCCESS" | "SYNC_ERROR";
      payload: {
        /** @example e30cbb93-5b05-4186-b6de-1acc10013795 */
        connection_id: string;
        /** @example 7bfcc74d-c98b-49de-8e8f-3dc7a17273f6 */
        customer_id: string;
        /**
         * @example hubspot 
         * @enum {string}
         */
        provider_name?: "hubspot" | "salesforce";
        /** @example 2fdbd03d-11f2-4e66-a5e6-2b731c71a12d */
        history_id: string;
        /** @example 100 */
        num_records_synced: number;
        /** @enum {string} */
        object_type: "common" | "standard" | "custom";
        /** @example contact */
        object: string;
        error_message?: string;
      };
    }, {
      /** @enum {unknown} */
      type: "CONNECTION_SUCCESS" | "CONNECTION_ERROR";
      payload: {
        /** @example e30cbb93-5b05-4186-b6de-1acc10013795 */
        customer_id: string;
        /** @example 5a4dbac6-3a56-4ad9-8aa3-e7b7f00be024 */
        provider_id: string;
        /** @enum {string} */
        category: "crm";
        /**
         * @example hubspot 
         * @enum {string}
         */
        provider_name: "hubspot" | "salesforce";
      };
    }]>;
  };
  responses: never;
  parameters: {
    /** @description The pagination cursor value */
    cursor: string;
    /** @description Number of results to return per page */
    page_size: string;
    /** @description The customer ID that uniquely identifies the customer in your application */
    customer_id: string;
    /** @description The provider name */
    provider_name: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  getCustomers: {
    /**
     * List customers 
     * @description Get a list of customers
     */
    responses: {
      /** @description Customers */
      200: {
        content: {
          "application/json": (components["schemas"]["customer"])[];
        };
      };
    };
  };
  upsertCustomer: {
    /** Upsert customer */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_update_customer"];
      };
    };
    responses: {
      /** @description Customer upserted */
      200: {
        content: {
          "application/json": components["schemas"]["customer"];
        };
      };
    };
  };
  getCustomer: {
    /** Get customer */
    responses: {
      /** @description Customer */
      200: {
        content: {
          "application/json": components["schemas"]["customer"];
        };
      };
    };
  };
  deleteCustomer: {
    /** Delete customer */
    responses: {
      /** @description Customer */
      200: {
        content: {
          "application/json": components["schemas"]["customer"];
        };
      };
    };
  };
  getDestinations: {
    /**
     * List destinations 
     * @description Get a list of destinations
     */
    responses: {
      /** @description Destinations */
      200: {
        content: {
          "application/json": (components["schemas"]["destination"])[];
        };
      };
    };
  };
  createDestination: {
    /** Create destination */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_update_destination"];
      };
    };
    responses: {
      /** @description Destination created */
      201: {
        content: {
          "application/json": components["schemas"]["destination"];
        };
      };
    };
  };
  getDestination: {
    /** Get destination */
    responses: {
      /** @description Destination */
      200: {
        content: {
          "application/json": components["schemas"]["destination"];
        };
      };
    };
  };
  updateDestination: {
    /** Update destination */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_update_destination"];
      };
    };
    responses: {
      /** @description Destination */
      200: {
        content: {
          "application/json": components["schemas"]["destination"];
        };
      };
    };
  };
  getSchemas: {
    /**
     * List schemas 
     * @description Get a list of schemas
     */
    responses: {
      /** @description Schemas */
      200: {
        content: {
          "application/json": (components["schemas"]["schema"])[];
        };
      };
    };
  };
  createSchema: {
    /** Create schema */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_update_schema"];
      };
    };
    responses: {
      /** @description Schema created */
      201: {
        content: {
          "application/json": components["schemas"]["schema"];
        };
      };
    };
  };
  getSchema: {
    /** Get schema */
    responses: {
      /** @description Schema */
      200: {
        content: {
          "application/json": components["schemas"]["schema"];
        };
      };
    };
  };
  updateSchema: {
    /** Update schema */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_update_schema"];
      };
    };
    responses: {
      /** @description Schema */
      200: {
        content: {
          "application/json": components["schemas"]["schema"];
        };
      };
    };
  };
  deleteSchema: {
    /** Delete schema */
    responses: {
      /** @description Schema */
      204: {
        content: {
          "application/json": components["schemas"]["schema"];
        };
      };
    };
  };
  getProviders: {
    /**
     * List providers 
     * @description Get a list of providers
     */
    responses: {
      /** @description Providers */
      200: {
        content: {
          "application/json": (components["schemas"]["provider"])[];
        };
      };
    };
  };
  createProvider: {
    /** Create provider */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_provider"];
      };
    };
    responses: {
      /** @description Provider created */
      201: {
        content: {
          "application/json": components["schemas"]["provider"];
        };
      };
    };
  };
  getProvider: {
    /** Get provider */
    responses: {
      /** @description Provider */
      200: {
        content: {
          "application/json": components["schemas"]["provider"];
        };
      };
    };
  };
  updateProvider: {
    /** Update provider */
    requestBody: {
      content: {
        "application/json": components["schemas"]["update_provider"];
      };
    };
    responses: {
      /** @description Provider */
      200: {
        content: {
          "application/json": components["schemas"]["provider"];
        };
      };
    };
  };
  deleteProvider: {
    /** Delete provider */
    responses: {
      /** @description Provider */
      200: {
        content: {
          "application/json": components["schemas"]["provider"];
        };
      };
    };
  };
  getSyncConfigs: {
    /**
     * List Sync Configs 
     * @description Get a list of Sync Configs
     */
    responses: {
      /** @description SyncConfigs */
      200: {
        content: {
          "application/json": (components["schemas"]["sync_config"])[];
        };
      };
    };
  };
  createSyncConfig: {
    /** Create Sync Config */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_update_sync_config"];
      };
    };
    responses: {
      /** @description SyncConfig created */
      201: {
        content: {
          "application/json": components["schemas"]["sync_config"];
        };
      };
    };
  };
  getSyncConfig: {
    /** Get Sync Config */
    responses: {
      /** @description SyncConfig */
      200: {
        content: {
          "application/json": components["schemas"]["sync_config"];
        };
      };
    };
  };
  updateSyncConfig: {
    /** Update Sync Config */
    requestBody: {
      content: {
        "application/json": components["schemas"]["create_update_sync_config"];
      };
    };
    responses: {
      /** @description SyncConfig */
      200: {
        content: {
          "application/json": components["schemas"]["sync_config"];
        };
      };
    };
  };
  deleteSyncConfig: {
    /** Delete Sync Config */
    responses: {
      /** @description SyncConfig */
      200: {
        content: {
          "application/json": components["schemas"]["sync_config"];
        };
      };
    };
  };
  getConnections: {
    /**
     * List connections 
     * @description Get a list of connections
     */
    responses: {
      /** @description Connections */
      200: {
        content: {
          "application/json": (components["schemas"]["connection"])[];
        };
      };
    };
  };
  createConnection: {
    /** Create connection */
    requestBody: {
      content: {
        "application/json": {
          [key: string]: unknown | undefined;
        };
      };
    };
    responses: {
      /** @description Connection created */
      200: {
        content: {
          "application/json": components["schemas"]["connection"];
        };
      };
    };
  };
  getConnection: {
    /** Get connection */
    responses: {
      /** @description Connection */
      200: {
        content: {
          "application/json": components["schemas"]["connection"];
        };
      };
    };
  };
  deleteConnection: {
    /** Delete connection */
    responses: {
      /** @description Connection */
      204: never;
    };
  };
  updateConnection: {
    /** Update connection */
    requestBody: {
      content: {
        "application/json": {
          schema_mappings_config?: {
            common_objects?: ({
                object: string;
                field_mappings: ({
                    schema_field: string;
                    mapped_field: string;
                  })[];
              })[];
            standard_objects?: ({
                object: string;
                field_mappings: ({
                    schema_field: string;
                    mapped_field: string;
                  })[];
              })[];
          } | null;
        };
      };
    };
    responses: {
      /** @description Connection */
      200: {
        content: {
          "application/json": components["schemas"]["connection"];
        };
      };
    };
  };
  getSync: {
    /** Get sync */
    responses: {
      /** @description Sync */
      200: {
        content: {
          "application/json": {
            sync?: components["schemas"]["sync"];
          };
        };
      };
    };
  };
  enableSync: {
    /** Enable sync */
    responses: {
      /** @description Sync enabled */
      200: {
        content: {
          "application/json": components["schemas"]["sync"];
        };
      };
    };
  };
  disableSync: {
    /** Disable sync */
    responses: {
      /** @description Sync */
      204: never;
    };
  };
  getWebhook: {
    /**
     * Get webhook 
     * @description Get webhook details
     */
    responses: {
      /** @description Applications */
      200: {
        content: {
          "application/json": components["schemas"]["webhook"];
        };
      };
    };
  };
  createWebhook: {
    /** Create webhook */
    requestBody: {
      content: {
        "application/json": components["schemas"]["webhook"];
      };
    };
    responses: {
      /** @description Webhook created */
      201: {
        content: {
          "application/json": components["schemas"]["webhook"];
        };
      };
    };
  };
  deleteWebhook: {
    /** Delete webhook */
    responses: {
      /** @description Webhook deleted */
      200: never;
    };
  };
  getSyncHistory: {
    /**
     * Get Sync History 
     * @description Get a list of Sync History objects.
     */
    parameters?: {
        /** @description The pagination cursor value */
        /** @description Number of results to return per page */
        /** @description The customer ID that uniquely identifies the customer in your application */
        /** @description The provider name */
        /** @description The model name to filter by */
      query?: {
        cursor?: string;
        page_size?: string;
        customer_id?: string;
        provider_name?: string;
        model?: string;
      };
    };
    responses: {
      /** @description Sync History */
      200: {
        content: {
          "application/json": ({
            /** @example eyJpZCI6IjQyNTc5ZjczLTg1MjQtNDU3MC05YjY3LWVjYmQ3MDJjNmIxNCIsInJldmVyc2UiOmZhbHNlfQ== */
            next?: string | null;
            /** @example eyJpZCI6IjBjZDhmYmZkLWU5NmQtNDEwZC05ZjQxLWIwMjU1YjdmNGI4NyIsInJldmVyc2UiOnRydWV9 */
            previous?: string | null;
            /** @example 100 */
            total_count?: number;
          }) & {
            results?: (components["schemas"]["sync_history"])[];
          };
        };
      };
    };
  };
  getSyncInfos: {
    /**
     * Get Sync Info 
     * @description Get a list of Sync Info
     */
    parameters?: {
        /** @description The customer ID that uniquely identifies the customer in your application */
        /** @description The provider name */
      query?: {
        customer_id?: string;
        provider_name?: string;
      };
    };
    responses: {
      /** @description Sync Info List */
      200: {
        content: {
          "application/json": (components["schemas"]["sync_info"])[];
        };
      };
    };
  };
  createForceSync: {
    /**
     * Force a full sync 
     * @description Force a full sync
     */
    parameters: {
        /** @description The customer ID that uniquely identifies the customer in your application */
        /** @description The provider name */
      query: {
        customer_id: string;
        provider_name: string;
      };
    };
    responses: {
      /** @description Force a full sync */
      200: {
        content: {
          "application/json": components["schemas"]["force_sync"];
        };
      };
    };
  };
  webhook: {
    /** Webhook */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["webhook-payload"];
      };
    };
    responses: {
      /** @description Return a 200 status to indicate that the data was received successfully */
      200: never;
    };
  };
}
