import { Request, Response } from 'express';
import { Employee } from '../models/Content.ts';


class EmployeeController {

  async getAll(req: Request, res: Response) {
    const items = await Employee.findAll();
    return res.json(items);
  }


  async getById(req: Request, res: Response) {
    try {
      const id = req.query.id as string;

      if (typeof id !== 'string' || id === '') {
        return res.status(400).json({ error: 'Invalid item_id' });
      }

      const item = await Employee.findOne({
        where: {
          id
        }
      })

      if (!item) {
        return res.status(404).json({ message: 'item not found' });
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

      await Employee.destroy({
        where: {
          id
        },
      });

      const allItems = await Employee.findAll({
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
      const { name, position, exp, salary, image } = req.body;
      const newItem = await Employee.create({
        name,
        position,
        exp,
        salary,
        image
      });

      const items = await Employee.findAll();

      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  }

}

export default new EmployeeController();
