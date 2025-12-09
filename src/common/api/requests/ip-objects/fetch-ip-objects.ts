import { IpObject } from "@/src/common/entities/ip-object"
import { request } from "../../request"
import { IpObjectResponse } from "../../responses/ip-object.response"
import { mapIpObjectResponseToIpObject } from "../../mapper/ip-object.mapper"

export const fetchIpObjects = async (): Promise<IpObject[]> => {
    const response = await request.get<{
        data: IpObjectResponse[]
    }>("/ip-objects");
    console.log(mapIpObjectResponseToIpObject(response.data.data[0]))
    return response.data.data.map(ipObjectResponse => mapIpObjectResponseToIpObject(ipObjectResponse));
}