import { getCustomRepository } from "typeorm";
import Enterprise from "../typeorm/entities/Enterprise";
import EnterprisesRepository from "../typeorm/repositories/EnterprisesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    cnpj: string
}

export default class ShowEnterpriseByCNPJService {
    public async execute({ cnpj }: IRequest): Promise<Enterprise> {
        const enterpriseRepo = getCustomRepository(EnterprisesRepository);
        const enterprise = await enterpriseRepo.findByCNPJ(cnpj);

        if (!enterprise) {
            throw new AppError('There is no enterprise with this CNPJ')
        };

        return enterprise;
    }
}