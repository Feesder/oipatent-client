import { IpObject } from "@/src/common/entities/ip-object"
import { request } from "../../request"
import { IpObjectResponse } from "../../responses/ip-object.response"
import { mapIpObjectResponseToIpObject } from "../../mapper/ip-object.mapper"

export const fetchIpObjectsByUserId = async (userId: string): Promise<IpObject[]> => {
    const response = await request.get<{
        data: IpObjectResponse[]
    }>(`/ip-objects/user/${userId}`);

    return response.data.data.map(ipObjectResponse => mapIpObjectResponseToIpObject(ipObjectResponse));
}