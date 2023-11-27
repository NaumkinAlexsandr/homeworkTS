// Спроектуйте інтерфейс для Системи Управління Завданнями з методами,
// такими як createTask(), assignTask() та completeTask().
enum UserPosition {
  DEVELOPER = "DEVELOPER",
  MANAGER = "MANAGER",
}

enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

interface IUser {
  id: number;
  name: string;
  position: UserPosition;
}

interface ITask {
  id: number;
  title: string;
  status: TaskStatus;
  executor: IUser;
}

interface ICreateTask {
  createTask(title: string, executor: IUser): ITask;
}

interface IAssignTask {
  assignTask(task: ITask, executor: IUser): void;
}

interface ICompleteTask {
  completeTask(task: ITask): void;
}

class Developer implements IUser, ICompleteTask {
  constructor(
    public id: number,
    public name: string,
    public position: UserPosition.DEVELOPER
  ) {}

  completeTask(task: ITask): void {
    task.status = TaskStatus.COMPLETED;
  }
}

class Manager implements IUser, IAssignTask, ICompleteTask {
  constructor(
    public id: number,
    public name: string,
    public position: UserPosition.MANAGER
  ) {}

  assignTask(task: ITask, executor: IUser): void {
    task.executor = executor;
    task.status = TaskStatus.IN_PROGRESS;
  }

  completeTask(task: ITask): void {
    task.status = TaskStatus.COMPLETED;
  }
}

class TaskService implements ICreateTask, IAssignTask, ICompleteTask {
  tasks: ITask[] = [];
  counter = 1;
  createTask(title: string, executor: IUser): ITask {
    const task: ITask = {
      id: this.counter++,
      title,
      status: TaskStatus.TODO,
      executor,
    };
    this.tasks.push(task);
    return task;
  }
  assignTask(task: ITask, executor: IUser): void {
    if (executor.position === UserPosition.DEVELOPER) {
      task.executor = executor;
      task.status = TaskStatus.IN_PROGRESS;
    }
  }
  completeTask(task: ITask): void {
    task.status = TaskStatus.COMPLETED;
  }
}

const developer = new Developer(1, "John", UserPosition.DEVELOPER);
const manager = new Manager(1, "Alex", UserPosition.MANAGER);

const taskService = new TaskService();

const task1 = taskService.createTask("First task", developer);
const task2 = taskService.createTask("Second Task", developer);
const task3 = taskService.createTask("Third Task", manager);

taskService.assignTask(task1, developer);
manager.assignTask(task2, developer);
manager.assignTask(task3, manager);
developer.completeTask(task2);

console.log(task1);
console.log(task2);
console.log(task3);
