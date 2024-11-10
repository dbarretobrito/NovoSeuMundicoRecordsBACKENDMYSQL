import { Request, Response } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  Product,
} from '../models/Product';

// Método de criação de produto
export const createProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, year, tags, front_image, back_image, detail_image, detail2_image } = req.body;

    const product: Product = {
      name,
      description,
      price,
      year,
      tags, // Mantenha como array de strings
      front_image,
      back_image: back_image || null,
      detail_image: detail_image || null,
      detail2_image: detail2_image || null,
    };

    // Chama a função para criar o produto
    const productId = await createProduct(product);

    res.status(201).json({ id: productId, ...product });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    const errorMessage = (error as Error).message || 'Erro desconhecido';
    res.status(500).json({ message: 'Erro ao criar produto', error: errorMessage });
  }
};

// Método de atualização de produto
export const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;  // Obtém o ID do produto da URL
    const { name, description, price, year, tags, front_image, back_image, detail_image, detail2_image } = req.body;

    const product: Product = {
      name,
      description,
      price,
      year,
      tags, // Mantém como array de strings
      front_image,
      back_image: back_image || null,
      detail_image: detail_image || null,
      detail2_image: detail2_image || null,
    };

    // Atualizar produto
    const updatedRows = await updateProduct(Number(id), product);

    if (updatedRows === 0) {
      res.status(404).json({ message: 'Produto não encontrado' });  // Trata caso em que o ID não existe
      return; // Adiciona o return aqui
    }

    // Responder ao cliente
    res.status(200).json({ message: 'Produto atualizado com sucesso', product });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: 'Erro ao atualizar produto', error: (error as Error).message });
  }
};

// Método de exclusão de produto
export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await deleteProduct(Number(id));
    if (result) {
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao deletar produto' });
    }
  }
};

// Método para obter produto por ID
export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await getProductById(Number(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao obter produto', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao obter produto' });
    }
  }
};

// Método para obter todos os produtos
export const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao obter produtos', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao obter produtos' });
    }
  }
};
