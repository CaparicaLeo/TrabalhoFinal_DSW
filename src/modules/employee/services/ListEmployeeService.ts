import { getCustomRepository } from "typeorm";
import Employee from "../typeorm/entities/Employee";
import EmployeesRepository from "../typeorm/repositories/EmployeesRepository";
import EnterprisesRepository from "@modules/enterprise/typeorm/repositories/EnterprisesRepository";

export default class ListEmployeeService {
    public async execute(): Promise<Employee[]> {
        const employeeRepository = getCustomRepository(EmployeesRepository);
        const enterpriseRepository = getCustomRepository(EnterprisesRepository);
        const employees = await employeeRepository.find();
        for(const employee of employees){
            employee.enterprise = await enterpriseRepository.findById(employee.enterprise_id);
        }
        return employees;
    }
}