import { IpObject } from "../../entities/ip-object";
import { IpObjectResponse } from "../responses/ip-object.response";

export function mapIpObjectResponseToIpObject(ipObjectResponse: IpObjectResponse): IpObject {
    return {
        id: ipObjectResponse.id,
        userId: ipObjectResponse.user_id,
        title: ipObjectResponse.title,
        patentType: ipObjectResponse.patent_type,
        description: ipObjectResponse.description,
        jurisdiction: ipObjectResponse.jurisdiction,
        createdAt: ipObjectResponse.created_at,
        updatedAt: ipObjectResponse.updated_at
    }
}