import { getCustomRepository } from "typeorm";
import Enterprise from "../typeorm/entities/Enterprise";
import EnterprisesRepository from "../typeorm/repositories/EnterprisesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string
    name: string;
    cnpj: string;
    address: string;
    telephone: string;
    actvity_branch: string;
}
export default class UpdateEnterpriseService {
    public async execute({ id, name, cnpj, address, telephone, actvity_branch }: IRequest): Promise<Enterprise> {
        const enterpriseRepo = getCustomRepository(EnterprisesRepository);
        const enterprise = await enterpriseRepo.findById(id);

        if (!enterprise) {
            throw new AppError("Enterprise was not found");
        }

        const cnpjExist = await enterpriseRepo.findByCNPJ(cnpj);

        if (cnpjExist && cnpjExist.id !== id) {
            throw new AppError("This CNPJ alreary exists");
        }

        enterprise.name = name
        enterprise.cnpj = cnpj
        enterprise.address = address
        enterprise.telephone = telephone
        enterprise.actvity_branch = actvity_branch

        await enterpriseRepo.save(enterprise);

        return enterprise;
    }
}