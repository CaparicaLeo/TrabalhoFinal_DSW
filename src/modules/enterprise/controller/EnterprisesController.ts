import { Request, Response, NextFunction } from "express";
import ListEnterpriseService from "../services/ListEnterpriseService";
import ShowEnterpriseService from "../services/ShowEnterpriseService";
import ShowEnterpriseByCNPJService from "../services/ShowEnterpriseByCNPJService";
import CreateEnterpriseService from "../services/CreateEnterpriseService";
import UpdateEnterpriseService from "../services/UpdateEnterpriseService";
import DeleteEnterpriseService from "../services/DeleteEnterpriseService";

export default class EnterprisesController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const service = new ListEnterpriseService();
            const enterprises = await service.execute();
            return res.json(enterprises);
        } catch (error) {
            return next(error);
        }
    }

    public async show(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const service = new ShowEnterpriseService();
            const enterprise = await service.execute({ id });
            return res.json(enterprise);
        } catch (error) {
            return next(error);
        }
    }

    public async showByCNPJ(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { cnpj } = req.params;
            const service = new ShowEnterpriseByCNPJService();
            const enterprise = await service.execute({ cnpj });
            return res.json(enterprise);
        } catch (error) {
            return next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, cnpj, address, telephone, actvity_branch } = req.body;
            const service = new CreateEnterpriseService();
            const enterprise = await service.execute({ name, cnpj, address, telephone, actvity_branch });
            return res.status(201).json(enterprise); // status 201 para criação
        } catch (error) {
            return next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { name, cnpj, address, telephone, actvity_branch } = req.body;
            const service = new UpdateEnterpriseService();
            const enterprise = await service.execute({ id, name, cnpj, address, telephone, actvity_branch });
            return res.json(enterprise);
        } catch (error) {
            return next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const service = new DeleteEnterpriseService();
            await service.execute({ id });
            return res.status(204).send(); // 204 No Content
        } catch (error) {
            return next(error);
        }
    }
}
