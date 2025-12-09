import { IpObject } from "@/src/common/entities/ip-object";
import { request } from "../../request";
import { IpObjectResponse } from "../../responses/ip-object.response";
import { mapIpObjectResponseToIpObject } from "../../mapper/ip-object.mapper";

export const createIpObject = async (ipObject: {
    user_id: string,
    title: string,
    patent_type: string,
    description: string,
    jurisdiction: string
}): Promise<IpObject> => {
    console.log(ipObject);
    const response = await request.post<IpObjectResponse>("/ip-objects", ipObject);
    return mapIpObjectResponseToIpObject(response.data);
}