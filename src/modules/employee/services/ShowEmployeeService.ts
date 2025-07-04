import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Employee from "../typeorm/entities/Employee";
import EmployeesRepository from "../typeorm/repositories/EmployeesRepository";
import EnterprisesRepository from "@modules/enterprise/typeorm/repositories/EnterprisesRepository";

interface IRequest{
    id: string;
}
export default class ShowEmployeeService {
    public async execute({ id }: IRequest): Promise<Employee> {
        const employeeRepository = getCustomRepository(EmployeesRepository);
        const enterpriseRepository = getCustomRepository(EnterprisesRepository);
        const employee = await employeeRepository.findById(id);
        employee.enterprise = await enterpriseRepository.findById(employee.enterprise_id)

        if (!employee) {
            throw new AppError("Employee not found.");
        }
        if(!employee.enterprise){
            throw new AppError("Enterprise was not found")
        }

        return employee;
    }
}