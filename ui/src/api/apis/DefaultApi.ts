/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  Product,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    ProductFromJSON,
    ProductToJSON,
} from '../models/index';

export interface CreateProductPostRequest {
    product: Product;
}

export interface DeleteProductProductIdDeleteRequest {
    productId: string;
}

export interface ReadProductProductIdGetRequest {
    productId: string;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Create Product
     */
    async createProductPostRaw(requestParameters: CreateProductPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Product>> {
        if (requestParameters['product'] == null) {
            throw new runtime.RequiredError(
                'product',
                'Required parameter "product" was null or undefined when calling createProductPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProductToJSON(requestParameters['product']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductFromJSON(jsonValue));
    }

    /**
     * Create Product
     */
    async createProductPost(requestParameters: CreateProductPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Product> {
        const response = await this.createProductPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete Product
     */
    async deleteProductProductIdDeleteRaw(requestParameters: DeleteProductProductIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: any; }>> {
        if (requestParameters['productId'] == null) {
            throw new runtime.RequiredError(
                'productId',
                'Required parameter "productId" was null or undefined when calling deleteProductProductIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/{product_id}`.replace(`{${"product_id"}}`, encodeURIComponent(String(requestParameters['productId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Delete Product
     */
    async deleteProductProductIdDelete(requestParameters: DeleteProductProductIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: any; }> {
        const response = await this.deleteProductProductIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Read Product
     */
    async readProductProductIdGetRaw(requestParameters: ReadProductProductIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Product>> {
        if (requestParameters['productId'] == null) {
            throw new runtime.RequiredError(
                'productId',
                'Required parameter "productId" was null or undefined when calling readProductProductIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/{product_id}`.replace(`{${"product_id"}}`, encodeURIComponent(String(requestParameters['productId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductFromJSON(jsonValue));
    }

    /**
     * Read Product
     */
    async readProductProductIdGet(requestParameters: ReadProductProductIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Product> {
        const response = await this.readProductProductIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Read Products
     */
    async readProductsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Product>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProductFromJSON));
    }

    /**
     * Read Products
     */
    async readProductsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Product>> {
        const response = await this.readProductsGetRaw(initOverrides);
        return await response.value();
    }

}
