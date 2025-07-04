import { getCustomRepository } from "typeorm";
import EnterprisesRepository from "../typeorm/repositories/EnterprisesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}
export default class DeleteEnterpriseService {
    public async execute({ id }: IRequest): Promise<void> {
        const enterpriseRepo = getCustomRepository(EnterprisesRepository);
        const enterprise = await enterpriseRepo.findById(id);

        if (!enterprise) {
            throw new AppError("Enterprise was not found");
        }

        await enterpriseRepo.remove(enterprise);
    }
}