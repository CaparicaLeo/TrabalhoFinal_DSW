import { getCustomRepository } from "typeorm";
import Enterprise from "../typeorm/entities/Enterprise";
import EnterprisesRepository from "../typeorm/repositories/EnterprisesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string
}

export default class ShowEnterpriseService {
    public async execute({ id }: IRequest): Promise<Enterprise> {
        const enterpriseRepo = getCustomRepository(EnterprisesRepository);
        const enterprise = await enterpriseRepo.findById(id);

        if (!enterprise) {
            throw new AppError('There is no enterprise with this id')
        };

        return enterprise;
    }
}