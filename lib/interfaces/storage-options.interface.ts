import { StorageOptions as GoogleCloudStorageOptions } from '@google-cloud/storage'
import { ModuleMetadata, Type } from '@nestjs/common';

export interface GoogleCloudStorageConfigOptions extends GoogleCloudStorageOptions {
    buckets?: BucketConfigOptions;
}

export interface BucketConfigOptions {
    id: string;
    name?: string;
}

export interface S3ConfigOptions {
    accessKeyId: string;
    secretAccessKey: string;
    region?: string;
    buckets?: BucketConfigOptions[];
    sessionToken?: string;
    apiVersion: string;
    maxSockets: string;
}

export interface StorageOptions {
    id?: string;
    s3?: any;
    gcs?: any;
    azure?: any;
    local?: any;
}

export interface StorageConfigOptionsFactory {
    createStorageConfigOptions(): Promise<StorageOptions> | StorageOptions;
}

export interface StorageConfigAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<StorageConfigOptionsFactory>;
    useExisting?: Type<StorageConfigOptionsFactory>;
    useFactory: ( ...args: any[] ) => Promise<StorageOptions> | StorageOptions
}