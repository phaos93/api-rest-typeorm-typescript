import { Request, Response } from "express";
import { tasksRepository } from "../repositories/tasksRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

export class TasksController {
  async create(req: Request, res: Response) {
    const { taskTitle, taskDescription } = req.body;
    const userId = req.user.id;

    if (!taskTitle || !taskDescription) {
      throw new BadRequestError(
        "a task title, and a task description must be provided"
      );
    }

    const newTask = tasksRepository.create({
      taskTitle,
      taskDescription,
      user_id: userId,
    });

    await tasksRepository.save(newTask);

    return res.status(200).json({ message: "task created successfully" });
  }

  async get(req: Request, res: Response) {
    const userId = req.user.id;
    const allTasks = await tasksRepository.findBy({ user_id: userId });

    return res.status(200).json(allTasks);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const UserId = req.user.id;

    const task = await tasksRepository.findOneBy({
      id: Number(id),
      user_id: UserId,
    });

    if (!task) {
      throw new NotFoundError("task not found");
    }

    return res.status(200).json(task);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const UserId = req.user.id;
    const { taskTitle, taskDescription } = req.body;

    const task = await tasksRepository.findOneBy({
      id: Number(id),
      user_id: UserId,
    });

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    tasksRepository.update(task, { taskTitle, taskDescription });

    return res.status(200).json({ message: "task updated successfully" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const UserId = req.user.id;

    const task = await tasksRepository.findOneBy({
      id: Number(id),
      user_id: UserId,
    });

    if (!task) {
      throw new NotFoundError("task not found");
    }

    tasksRepository.delete(task);

    return res.status(200).json({ message: "task deleted successfully" });
  }
}
