import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Employee from "../typeorm/entities/Employee";
import EmployeesRepository from "../typeorm/repositories/EmployeesRepository";

interface IRequest{
    enterpriseId: string;
}
export default class ListEmployeeByEnterpriseService {
    public async execute({ enterpriseId }: IRequest): Promise<Employee[]> {
        const employeeRepository = getCustomRepository(EmployeesRepository);
        const employees = await employeeRepository.findByEnterpriseId(enterpriseId);

        return employees;
    }
}