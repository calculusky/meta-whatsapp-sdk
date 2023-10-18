export enum HttpMethod {
  POST = "POST",
  GET = "GET",
}

export interface SendRequestOptions {
  method: HttpMethod;
  body: any;
  endpoint: string;
}
