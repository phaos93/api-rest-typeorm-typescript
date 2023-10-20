import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('tasks')
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    taskTitle: string

    @Column({type: 'text'})
    taskDescription: string

    @Column({type: 'integer'})
    user_id: number
}