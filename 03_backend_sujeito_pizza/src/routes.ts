import { Router } from 'express';

import multer, { FileFilterCallback } from 'multer'
import uploadConfig from './config/multer';

import { CreateUserController } from './models/controllers/user/CreateUserController';
import { AuthUserController } from './models/controllers/user/AuthUserController';
import { DetailUserController } from './models/controllers/user/DetailUserController';
import { isAuthenticated } from './models/middlewares/isAuthenticated';

import { CreateCategoryController } from './models/controllers/category/CreateCategoryController.';
import { ListCategoryController } from './models/controllers/category/ListCategoryController';

import { CreateProductController } from './models/controllers/product/CreateProductProduct';
import { ListProductByCategoryController } from './models/controllers/product/ListProductByCategoryController';

import { CreateOrderController } from './models/controllers/order/CreateOrderController';
import { RemoveOrderController } from './models/controllers/order/RemoveOrderController';
import { AddItemController } from './models/controllers/order/AddItemController';
import { RemoveItemController } from './models/controllers/order/RemoveItemController';
import { SendOrderController } from './models/controllers/order/SendOrderController';
import { ListOrdersController } from './models/controllers/order/ListOrdersController';
import { DetailOrderController } from './models/controllers/order/DetailOrderController';
import { FinishOrderController } from './models/controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// User
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

// Category
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// Product
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/product', isAuthenticated, new ListProductByCategoryController().handle);

// Order
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);

router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);

router.put('/order', isAuthenticated, new SendOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.delete('/item', isAuthenticated, new RemoveItemController().handle);

export { router };