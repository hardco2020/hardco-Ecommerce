import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import ProductModel from '@/models/product.model';
import { Product } from '@/interfaces/product.interface';
import { CreateProductDto } from '@/dtos/products.dto';

class ProductService {
  public products = ProductModel;
  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'ProductData is empty');
    const createProductData: Product = await this.products.create({ ...productData });
    return createProductData;
  }
  public async updateProduct(productId: string, productData: CreateProductDto): Promise<Product> {
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'ProductId not valid');
    }
    if (isEmpty(productData)) throw new HttpException(400, 'Update productData is empty');
    const updateProductById: Product = await this.products.findByIdAndUpdate(productId, { ...productData }, { new: true });
    console.log(updateProductById);
    if (!updateProductById) throw new HttpException(409, 'ProductData not found');
    return updateProductById;
  }
  public async deleteProduct(productId: string): Promise<Product> {
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException(409, 'ProductId not valid');
    }
    const deleteProductById: Product = await this.products.findByIdAndDelete(productId);

    if (!deleteProductById) throw new HttpException(409, 'ProductData not found');
    return deleteProductById;
  }
  public async getAllProduct(): Promise<Product[]> {
    const products: Product[] = await this.products.find();
    return products;
  }
  public async getCategoriesProduct(qCategory: string): Promise<Product[]> {
    const products: Product[] = await this.products.find({
      categories: {
        $in: [qCategory],
      },
    });
    return products;
  }
  public async getNewProduct(): Promise<Product[]> {
    const products: Product[] = await this.products.find().sort({ createdAt: -1 }).limit(1);
    return products;
  }
  public async getProductId(id: string): Promise<Product> {
    const product: Product = await this.products.findOne({ _id: id });
    return product;
  }
}

export default ProductService;
