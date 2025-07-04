import { NextFunction, Request, Response } from "express";
import ListEmployeeService from "../services/ListEmployeeService";
import ShowEmployeeService from "../services/ShowEmployeeService";
import ListEmployeeByEnterpriseService from "../services/ListEmployeeByEnterprise";
import CreateEmployeeService from "../services/CreateEmployeeService";
import UpdateEmployeeService from "../services/UpdateEmployeeService";
import DeleteEmployeeService from "../services/DeleteEmployeeService";

export default class EmployeeController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const service = new ListEmployeeService();
            const employees = await service.execute();
            return response.json(employees);
        } catch (error) {
            next(error);

        }
    }
    public async show(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = request.params;
            const service = new ShowEmployeeService();
            const employee = await service.execute({ id });
            return response.json(employee);
        } catch (error) {
            next(error);
        }
    }
    public async listByEnterprise(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { enterpriseId } = request.params;
            const service = new ListEmployeeByEnterpriseService();
            const employees = await service.execute({ enterpriseId });
            return response.json(employees);
        } catch (error) {
            next(error);
        }
    }
    public async create(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, email, position, salary, date_contracted, enterprise_id } = request.body;
            const service = new CreateEmployeeService();
            const employee = await service.execute({ name, email, position, salary, date_contracted, enterprise_id });
            return response.json(employee);
        } catch (error) {
            next(error);
        }
    }
    public async update(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = request.params;
            const { name, email, position, salary, date_contracted, enterprise_id } = request.body;
            const service = new UpdateEmployeeService();
            const employee = await service.execute({ id, name, email, position, salary, date_contracted, enterprise_id });
            return response.json(employee);
        } catch (error) {
            next(error);
        }
    }
    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = request.params;
            const service = new DeleteEmployeeService();
            await service.execute({ id });
            return response.json([]);
        } catch (error) {
            next(error);
        }
    }
}