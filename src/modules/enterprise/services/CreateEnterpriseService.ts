import { getCustomRepository } from "typeorm";
import Enterprise from "../typeorm/entities/Enterprise";
import EnterprisesRepository from "../typeorm/repositories/EnterprisesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    cnpj: string;
    address: string;
    telephone: string;
    actvity_branch: string;
}
export default class CreateEnterpriseService {
    public async execute({ name, cnpj, address, telephone, actvity_branch }: IRequest): Promise<Enterprise> {
        const enterpriseRepo = getCustomRepository(EnterprisesRepository);
        const enterpriseExist = await enterpriseRepo.findByCNPJ(cnpj);
        if (enterpriseExist) {
            throw new AppError("There is already a enterprise with this CNPJ");
        }

        const enterprise = await enterpriseRepo.create({ name, cnpj, address, telephone, actvity_branch });
        await enterpriseRepo.save(enterprise);
        return enterprise;
    }
}