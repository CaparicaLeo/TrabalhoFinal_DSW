import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import EmployeesRepository from "../typeorm/repositories/EmployeesRepository";

interface IRequest{
    id: string;
}
export default class DeleteEmployeeService {
    public async execute({ id }: IRequest): Promise<void> {
        const employeeRepository = getCustomRepository(EmployeesRepository);
        const employee = await employeeRepository.findById(id);

        if (!employee) {
            throw new AppError("Employee not found.");
        }

        await employeeRepository.remove(employee);
    }
}