import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import ProductModel from '@/models/product.model';
import { Product } from '@/interfaces/product.interface';
import { CreateProductDto, UpdateProductDTO } from '@/dtos/products.dto';

class ProductService {
  public products = ProductModel;
  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'ProductData is empty');
    const createProductData: Product = await this.products.create({ ...productData });
    return createProductData;
  }
  public async updateProduct(productId: string, productData: UpdateProductDTO): Promise<Product> {
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
  public async getAllProductByPage(page: number): Promise<Product[]> {
    // const products: Product[] = await this.products.find();
    const PAGESIZE = 8;
    const products: Product[] = await this.products
      .find({})
      .sort({ createdAt: -1 })
      .limit(PAGESIZE)
      .skip(PAGESIZE * page);
    return products;
  }
  public async getCategoriesProductByPage(qCategory: string, page: number): Promise<Product[]> {
    // const products: Product[] = await this.products.find();
    console.log(qCategory, page);
    const PAGESIZE = 8;
    const products: Product[] = await this.products
      .find({
        categories: {
          $in: [qCategory],
        },
      })
      .sort({ createdAt: -1 })
      .limit(PAGESIZE)
      .skip(PAGESIZE * page);
    return products;
  }
  public async getCategoriesProductNum(qCategory: string): Promise<number> {
    const PAGESIZE = 8;
    return Math.ceil(
      (await this.products.countDocuments({
        categories: {
          $in: [qCategory],
        },
      })) / PAGESIZE,
    );
  }
  public async getAllProductNum(): Promise<number> {
    const PAGESIZE = 8;
    return Math.ceil((await this.products.countDocuments({})) / PAGESIZE);
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
    const products: Product[] = await this.products.find().sort({ createdAt: -1 }).limit(4);
    return products;
  }
  public async getProductId(id: string): Promise<Product> {
    const product: Product = await this.products.findOne({ _id: id });
    return product;
  }
  public async searchFirstStageProduct(name: string): Promise<Product[]> {
    const products: Product[] = await this.products
      .find({ title: { $regex: name, $options: 'i' } })
      .sort({ createdAt: -1 })
      .limit(5);
    return products;
  }
  public async searchProduct(name: string, pageId?: string): Promise<Product[]> {
    let products: Product[];
    if (pageId) {
      products = await this.products
        .find({ title: { $regex: name, $options: 'i' }, _id: { $gt: pageId } })
        .sort({ createdAt: -1 })
        .limit(5);
    } else {
      products = await this.products
        .find({ title: { $regex: name, $options: 'i' } })
        .sort({})
        .limit(10);
    }
    return products;
  }
}

export default ProductService;
