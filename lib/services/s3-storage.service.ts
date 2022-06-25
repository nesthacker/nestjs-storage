import { Inject, Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { CreateBucketRequest, DeleteBucketRequest, PutObjectRequest } from "aws-sdk/clients/s3";
import { S3_STORAGE_CLIENT } from "../constants";

@Injectable()
export class S3StorageService {
    constructor(
        @Inject( S3_STORAGE_CLIENT )
        private readonly s3Client: S3
    ) { }

    async createBucket( options: CreateBucketRequest ) {
        return await this.s3Client.createBucket( options ).promise()
    }

    async deleteBucket( options: DeleteBucketRequest ) {
        return await this.s3Client.deleteBucket( options ).promise()
    }

    async getBuckets() {
        return await this.s3Client.listBuckets().promise()
    }

    async getFile( bucketName:string ,fileName: string ) {
        return await this.s3Client
        .getObject( { Bucket: bucketName, Key: fileName  } )
        .promise()
    }

    async uploadFile( data: PutObjectRequest ) {
        return await this.s3Client.putObject( data ).promise()
    }
}