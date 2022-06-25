import { BucketOptions, CreateBucketRequest, CreateHmacKeyOptions, FileOptions, GetBucketsRequest, GetFileOptions, GetHmacKeysOptions, Storage } from "@google-cloud/storage";
import { HmacKeyOptions } from "@google-cloud/storage/build/src/hmacKey";
import { Inject, Injectable } from "@nestjs/common";
import { response } from "express";
import { Readable } from "stream";
import { buffer } from "stream/consumers";
import { GOOGLE_CLOUD_STORAGE_CLIENT } from "../constants";

@Injectable()
export class GoogleCloudStorageService {
    constructor(
        @Inject( GOOGLE_CLOUD_STORAGE_CLIENT )
        private readonly googleCloudStorageClient: Storage
    ) { }

    async createBucket( name: string, option?: CreateBucketRequest ) {

        return await this.googleCloudStorageClient.createBucket( name, option );

    }

    async deleteBucket( name: string ) {

        return await this.googleCloudStorageClient.bucket( name ).delete();

    }

    async getBuckets( name: string, option?: GetBucketsRequest ) {

        return await this.googleCloudStorageClient.getBuckets( option );

    }

    async createHmacKey( serviceAccountEmail: string, options?: CreateHmacKeyOptions ) {

        return await this.googleCloudStorageClient.createHmacKey( serviceAccountEmail, options )

    }

    async getHmacKeys( options?: GetHmacKeysOptions ) {
        return await this.googleCloudStorageClient.getHmacKeys( options )
    }

    private getHmacKey( accessId: string, options?: HmacKeyOptions ) {
        return this.googleCloudStorageClient.hmacKey( accessId, options )
    }

    private bucket( name: string, option?: BucketOptions ) {
        return this.googleCloudStorageClient.bucket( name, option )
    }

    async getBucketFile( name: string, options?: { bucketOptions?: BucketOptions, filesOptions?: GetFileOptions } ) {

        return await this.bucket( name, options.bucketOptions ).getFiles( options.filesOptions )

    }

    async getFileObject(
        bucketName: string,
        fileName: string,
        options?: { bucketOptions?: BucketOptions, fileOptions?: FileOptions }
    ) {
        return await this.bucket(
            bucketName,
            options.bucketOptions
        )
        .file( fileName, options.fileOptions )
        .download()[ 0 ]

    }

    updateFileObject(
        bucketName: string,
        fileName: string,
        body: Buffer | Uint8Array | Blob | string | Readable,
        options?: { bucketOptions?: BucketOptions, fileOptions?: FileOptions }
    ): void {

        this.bucket(
            bucketName,
            options.bucketOptions
        )
        .file( fileName, options.fileOptions )
        .createWriteStream()
        .on( "finish", () => {
            return;
        } )
        .end( body )
    }

    async deleteFileObject(
        bucketName: string,
        fileName: string,
        options?: { bucketOptions?: BucketOptions, fileOptions?: FileOptions }
    ) {
        return await this.bucket(
            bucketName,
            options.bucketOptions
        )
        .file( fileName, options.fileOptions )
        .delete()
    }

}