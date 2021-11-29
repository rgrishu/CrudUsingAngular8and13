

export interface StudentReq
{
    ID:number;
    firstname:string;
    lastname: string;
    email:string;
    password: string;
    address: string;
    stateid:number;
    statename: string;
    cityid: number;
    cityname:string;
    zipcode: bigint
    checkout: boolean;
}

export interface CommonResponse
{
    statusCode:bigint;
    msg:string;
    data:Data;
}

export interface Data {
  StudentReq: StudentReq[];   
  StateCity: StateCity[];
}


export interface StateCity
{
    StateID:number;
    StateName: string;
    CityID:bigint;
    CityName: string;
}