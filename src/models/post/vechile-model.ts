export interface VehicleModel  {
    model: string;
    width: number;
    length: number;
    height: number;
    axleDistance: number;
    numberOfAxle: number;
    engineCapacity: number;
    numberOfCylinder: number;
    horsePower: number;
    numberOfTyreF: number;
    numberOfTyreB: number;
    grossWeight: number;
    netWeight: number;
    numberOfSeat: number;
    cargoCapacity: number;
    tyreSizeF: number;
    tyreSizeB: number;
    typeOfDrive: string;
    factoryId: string;
    factory: Factory;
    fuelType: FuelType;
}
export interface Factory{
    id:number;
    name:string;
}
export interface FuelType{
    
}