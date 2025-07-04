import { getCustomRepository } from "typeorm";
import Enterprise from "../typeorm/entities/Enterprise";
import EnterprisesRepository from "../typeorm/repositories/EnterprisesRepository";

export default class ListEnterpriseService{
    public async execute():Promise<Enterprise[]>{
        const enterpriseRepo = getCustomRepository(EnterprisesRepository);
        const enterprises = await enterpriseRepo.find();
        return enterprises;
    }
}