import { AppDataSource } from "../data-source";
import { Tasks } from "../entities/Tasks";

export const tasksRepository = AppDataSource.getRepository(Tasks);