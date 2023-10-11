import { AddressModel } from "./address.model";

export interface UserModel {
  id?: string;
  date: string | any,
  name: string,
  cpf: string,
  species: string,
  breed: string,
  other?: string,
  monthlyIncome: number,
  cep: string,
  address: AddressModel,
}