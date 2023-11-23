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

interface ITaskService {
  createTask(title: string, executor: IUser): ITask;
  assignTask(task: ITask, executor: IUser): void;
  completeTask(task: ITask): void;
}

class Developer implements IUser {
  constructor(
    public id: number,
    public name: string,
    public position: UserPosition.DEVELOPER
  ) {}
}

class Manager implements IUser {
  constructor(
    public id: number,
    public name: string,
    public position: UserPosition.MANAGER
  ) {}
}

class TaskService implements ITaskService {
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
taskService.assignTask(task2, developer);
taskService.completeTask(task3);

console.log(task1);
console.log(task2);
console.log(task3);
