import { EntityRepository, Repository } from "typeorm";
import Employee from "../entities/Employee";
@EntityRepository(Employee)
export default class EmployeeRepository extends Repository<Employee> {
    public async findByEmail(email: string): Promise<Employee | undefined> {
        return this.findOne({
            where: { email },
        });
    }

    public async findById(id: string): Promise<Employee | undefined> {
        return this.findOne({
            where: { id },
        });
    }

    public async findByEnterpriseId(enterprise_id: string): Promise<Employee[]> {
        return this.find({
            where: { enterprise_id },
        });
    }
}