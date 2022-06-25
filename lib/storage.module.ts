import { DynamicModule, Module } from '@nestjs/common';
import { StorageConfigAsyncOptions } from './interfaces';
import { createGoogleCloudStorageClient, createS3StorageClient, createStorageAsyncOptions } from './providers';
import { GoogleCloudStorageService } from './services';

@Module( {
    providers: [
        GoogleCloudStorageService
    ],
    exports: [
        GoogleCloudStorageService
    ],
} )
export class StorageModule {
    static registerAsync( options: StorageConfigAsyncOptions ): DynamicModule {
        return {
            global: true,
            module: StorageModule,
            imports: [ ...( options.imports || [] ) ],
            providers: [
                createStorageAsyncOptions( options ),
                createS3StorageClient(),
                createGoogleCloudStorageClient(),
            ]
        }
    }
}
