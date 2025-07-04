import { getCustomRepository } from "typeorm";
import Employee from "../typeorm/entities/Employee";
import EmployeesRepository from "../typeorm/repositories/EmployeesRepository";
import AppError from "@shared/errors/AppError";
import Enterprise from "@modules/enterprise/typeorm/entities/Enterprise";
import EnterprisesRepository from "@modules/enterprise/typeorm/repositories/EnterprisesRepository";

interface IRequest {
    name: string;
    email: string;
    position: string;
    salary: number;
    date_contracted: Date;
    enterprise_id: string;
}
export default class CreateEmployeeService {
    public async execute({ name, email, position, salary, date_contracted, enterprise_id }: IRequest): Promise<Employee> {
        const employeeRepository = getCustomRepository(EmployeesRepository);
        const enterpriseRepository = getCustomRepository(EnterprisesRepository);
        const existingEmployee = await employeeRepository.findByEmail(email);
        
        if (existingEmployee) {
            throw new AppError("Employee with this email already exists.");
        }
        const enterprise = await enterpriseRepository.findById(enterprise_id);

        if(!enterprise){
            throw new AppError('Enterprise does not exist')
        }
        const employee = await employeeRepository.create({
            name,
            email,
            position,
            salary,
            date_contracted: date_contracted,
            enterprise_id: enterprise_id,
            enterprise: enterprise
        })

        await employeeRepository.save(employee);
        return employee;
    }
}