import { EntityRepository, Repository } from "typeorm";
import Enterprise from "../entities/Enterprise";

@EntityRepository(Enterprise)
export default class EnterprisesRepository extends Repository<Enterprise> {
    public async findById(id: string): Promise<Enterprise | undefined> {
        const enterprise = await this.findOne(
            { where: { id } }
        );
        return enterprise;
    }
    public async findByCNPJ(cnpj: string): Promise<Enterprise | undefined> {
        const enterprise = await this.findOne({
            where: { cnpj }
        });

        return enterprise;
    }
}