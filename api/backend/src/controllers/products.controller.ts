import { NextFunction, Request, Response } from 'express';
import ProductService from '@/services/products.service';
import { CreateProductDto } from '@/dtos/products.dto';
import { Product } from '@/interfaces/product.interface';

interface ProductQuery {
  new: boolean;
  category: string;
}

class ProductsController {
  public productsService = new ProductService();

  public createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product = await this.productsService.createProduct(productData);
      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const productData: CreateProductDto = req.body;
      const updateProductData: Product = await this.productsService.updateProduct(productId, productData);
      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const deleteProductData: Product = await this.productsService.deleteProduct(productId);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public getProduct = async (req: Request<{}, {}, {}, ProductQuery>, res: Response, next: NextFunction) => {
    try {
      const qNew = req.query.new;
      const qCategory = req.query.category;
      let products: Product[];
      if (qNew) {
        products = await this.productsService.getNewProduct();
      } else if (qCategory) {
        products = await this.productsService.getCategoriesProduct(qCategory);
      } else {
        products = await this.productsService.getAllProduct();
      }
      res.status(200).json({ data: products, message: 'find' });
    } catch (error) {
      next(error);
    }
  };
  public getProductId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const product = await this.productsService.getProductId(id);
      res.status(200).json({ data: product, message: 'findId' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
