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
import { ListByCategoryController } from './models/controllers/product/ListByCategoryController';

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
router.get('/product/:id', isAuthenticated, new ListByCategoryController().handle);

export { router };