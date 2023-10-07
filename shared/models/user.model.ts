import { AddressModel } from "./address.model";

export interface UserModel {
  id?: string;
  date: string,
  name: string,
  cpf: string,
  species: string,
  breed: string,
  other?: string,
  monthlyIncome: string,
  cep: string,
  address: AddressModel,
}