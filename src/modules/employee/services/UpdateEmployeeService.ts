import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import EmployeesRepository from "../typeorm/repositories/EmployeesRepository";
import Employee from "../typeorm/entities/Employee";
import EnterprisesRepository from "@modules/enterprise/typeorm/repositories/EnterprisesRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
    position: string;
    salary: number;
    date_contracted: Date;
    enterprise_id: string;
}
export default class UpdateEmployeeService {
    public async execute({
        id,
        name,
        email,
        position,
        salary,
        date_contracted,
        enterprise_id,
    }: IRequest): Promise<Employee> {
        const employeeRepository = getCustomRepository(EmployeesRepository);
        const enterpriseRepository = getCustomRepository(EnterprisesRepository);
        const employee = await employeeRepository.findById(id);

        if (!employee) {
            throw new AppError("Employee not found.");
        }

        const existingEmployee = await employeeRepository.findByEmail(email);
        if (existingEmployee && existingEmployee.id !== id) {
            throw new AppError("Email already in use by another employee.");
        }

        employee.name = name;
        employee.email = email;
        employee.position = position;
        employee.salary = salary;
        employee.date_contracted = date_contracted;
        employee.enterprise_id = enterprise_id;
        employee.enterprise = await enterpriseRepository.findById(enterprise_id);

        await employeeRepository.save(employee);
        return employee;
    }
}