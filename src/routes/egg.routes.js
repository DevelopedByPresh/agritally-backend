import express from 'express'
import { EggController } from '../controllers'

const eggRouter= express.Router();

eggRouter.post('/', EggController.create);

eggRouter.post('/', EggController.showAll);

eggRouter.post('/', EggController.get);

eggRouter.post('/', EggController.update);

eggRouter.post('/', EggController.delete);

export default eggRouter;