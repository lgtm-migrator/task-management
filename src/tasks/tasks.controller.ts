import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto }                                            from "./dto/create.task.dto";
import { TaskFilterDto }                                            from "./dto/task.filter.dto";
import { Task, TaskStatus }                                         from "./task.model";
import { TasksService }                                             from "./tasks.service";

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasks(@Query() taskFilterDto: TaskFilterDto): Task[] {
    if (Object.keys(taskFilterDto).length) {
      return this.tasksService.getTasks(taskFilterDto);
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }


  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }


  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }

}
