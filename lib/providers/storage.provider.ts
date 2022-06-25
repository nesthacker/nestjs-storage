import { Storage } from "@google-cloud/storage";
import { Provider } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { S3_STORAGE_CLIENT, STORAGE_OPTIONS } from "../constants";
import { StorageConfigAsyncOptions, StorageOptions } from "../interfaces";

export const createStorageAsyncOptions = ( options: StorageConfigAsyncOptions ): Provider => ( {
    provide: STORAGE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject
} )

export const createS3StorageClient = (): Provider => ( {
    provide: S3_STORAGE_CLIENT,
    useFactory: async ( options: StorageOptions ): Promise<S3> => {
        const client = new S3( options.s3 )
        return client

    },
    inject: [ STORAGE_OPTIONS ]
} )

export const createGoogleCloudStorageClient = (): Provider => ( {
    provide: S3_STORAGE_CLIENT,
    useFactory: async ( options: StorageOptions ): Promise<Storage> => {
        const client = new Storage( options.gcs )
        return client
    },
    inject: [ STORAGE_OPTIONS ]
} )