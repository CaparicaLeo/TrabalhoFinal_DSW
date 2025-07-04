import { Router } from "express";
import EnterprisesController from "../controller/EnterprisesController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/middlewares/isAuthenticated";

const enterpriseRouter = Router();
const enterpriseController = new EnterprisesController();

enterpriseRouter.use(isAuthenticated);


enterpriseRouter.get(
    '/',
    async (req, res, next) => {
        try {
            await enterpriseController.index(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


enterpriseRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await enterpriseController.show(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


enterpriseRouter.get(
    '/cnpj/:cnpj',
    celebrate({
        [Segments.PARAMS]: {
            cnpj: Joi.string().pattern(/^\d{14}$/).required(), // 14 dígitos numéricos
        },
    }),
    async (req, res, next) => {
        try {
            await enterpriseController.showByCNPJ(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


enterpriseRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cnpj: Joi.string().pattern(/^\d{14}$/).required(),
            address: Joi.string().required(),
            telephone: Joi.string().required(),
            actvity_branch: Joi.string().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await enterpriseController.create(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


enterpriseRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            cnpj: Joi.string().pattern(/^\d{14}$/).required(),
            address: Joi.string().required(),
            telephone: Joi.string().required(),
            actvity_branch: Joi.string().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await enterpriseController.update(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);


enterpriseRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await enterpriseController.delete(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

export default enterpriseRouter;
