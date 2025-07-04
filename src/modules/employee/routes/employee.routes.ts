import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import EmployeeController from "../controller/EmployeeController";
import isAuthenticadted from "@shared/middlewares/isAuthenticated";

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.use(isAuthenticadted);


employeeRouter.get("/", async (request, response, next) => {
    try {
        await employeeController.index(request, response, next);
    } catch (error) {
        next(error);
    }
});

employeeRouter.get("/:id", celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), async (request, response, next) => {
    try {
        await employeeController.show(request, response, next);
    } catch (error) {
        next(error);
    }
});

employeeRouter.get("/enterprise/:enterpriseId", celebrate({
    [Segments.PARAMS]: {
        enterprise_id: Joi.string().uuid().required()
    }
}), async (request, response, next) => {
    try {
        await employeeController.listByEnterprise(request, response, next);
    } catch (error) {
        next(error);
    }
});


employeeRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: Joi.object({
            enterprise_id: Joi.string().uuid().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            position: Joi.string().required(),
            salary: Joi.number().positive().required(),
            date_contracted: Joi.date().required(),
        }),
    }),
    async (request, response, next) => {
        try {
            await employeeController.create(request, response, next);
        } catch (error) {
            next(error);
        }
    }
);


employeeRouter.put(
    "/:id",
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().uuid().required(),
        }),
        [Segments.BODY]: Joi.object({
            enterprise_id: Joi.string().uuid().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            position: Joi.string().required(),
            salary: Joi.number().positive().required(),
            date_contracted: Joi.date().required(),
        }),
    }),
    async (request, response, next) => {
        try {
            await employeeController.update(request, response, next);
        } catch (error) {
            next(error);
        }
    }
);

employeeRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().uuid().required(),
    })
}), async (request, response, next) => {
    try {
        await employeeController.delete(request, response, next);
    } catch (error) {
        next(error);
    }
});

export default employeeRouter;
