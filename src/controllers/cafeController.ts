import { Request, Response } from 'express';
import { Cafe } from '../models/Content.ts';


class CafeController {

  async getAll(req: Request, res: Response) {
    const items = await Cafe.findAll();
    return res.json(items);
  }


  async getById(req: Request, res: Response) {
    try {
      const id = req.query.id as string;

      if (typeof id !== 'string' || id === '') {
        return res.status(400).json({ error: 'Invalid item_id' });
      }

      const item = await Cafe.findOne({
        where: {
          id
        }
      })

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Error' });
    }
  }


  async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id as string;

      if (typeof id !== 'string' || id === '') {
        return res.status(400).json({ error: 'Invalid item_id' });
      }

      await Cafe.destroy({
        where: {
          id
        },
      });

      const allItems = await Cafe.findAll({
        where: {
          id,
        },
      });

      return res.status(200).json(allItems);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  }



  async createItem(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, image } = req.body;
      const newItem = await Cafe.create({
        name,
        price,
        image,
      });

      const items = await Cafe.findAll();

      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  }



  async updateItem(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, image } = req.body;
      const id = req.query.id as string;

      // Проверяем, есть ли обязательные поля в запросе
      // if ( !name || !price || !image) {
      //   return res.status(400).json({ error: 'Missing required fields' });
      // }

      // Проверяем, существует ли элемент с указанным id
      const existingItem = await Cafe.findOne({
        where: {
          id
        }
      });

      if (!existingItem) {
        return res.status(404).json({ message: 'Item not found' });
      }

      // Обновляем данные элемента
      await Cafe.update(
        { name, price, image },
        {
          where: { id }
        }
      );

      // Получаем обновленный элемент
      const updatedItem = await Cafe.findOne({
        where: {
          id
        }
      });

      return res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Error' });
    }
  }



}

export default new CafeController();
