import { Request, Response } from 'express';
import { Game } from '../models/Content.ts';


class GameController {

  async getAll(req: Request, res: Response) {
    const items = await Game.findAll();
    return res.json(items);
  }


  async getById(req: Request, res: Response) {
    try {
      const id = req.query.id as string;

      if (typeof id !== 'string' || id === '') {
        return res.status(400).json({ error: 'Invalid item_id' });
      }

      const item = await Game.findOne({
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

      await Game.destroy({
        where: {
          id
        },
      });

      const allItems = await Game.findAll({
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
      const { name, desc, price, image } = req.body;
      const newItem = await Game.create({
        name,
        desc,
        price,
        image
      });

      const items = await Game.findAll();

      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  }

}

export default new GameController();
