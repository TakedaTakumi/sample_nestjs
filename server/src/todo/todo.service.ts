import { v4 } from 'uuid';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './models/todo.models';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findOneById(id: string): Todo {
    const result = this.todos.find((todo) => id === todo.id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  insert(title: string, description: string): Todo {
    const todo = new Todo();
    todo.id = v4();
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.NEW;
    todo.createdAt = new Date();
    todo.updateAt = new Date();

    this.todos.push(todo);

    return todo;
  }
}
