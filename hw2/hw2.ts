type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: string;
  courses: string;
  contacts: string;
};

type Grade = { workName: string; mark: number };

type Visit = { lesson: string; present: boolean };

type Students = {
  _firstName: string;
  _lastName: string;
  _birthYear: number;
};

enum Levels {
  Beginner,
  Intermediate,
  Advanced,
}

enum Status {
  Active,
  Inactive,
}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  _areas: Area[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(area: Area): void {
    const index = this._areas.indexOf(area);
    if (index !== -1) {
      this._areas.splice(index, 1);
    }
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    const index = this._lecturers.indexOf(lecturer);
    if (index !== -1) {
      this._lecturers.splice(index, 1);
    }
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    const index = this._levels.indexOf(level);
    if (index !== -1) {
      this._levels.splice(index, 1);
    }
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods
  _groups: Group[] = [];
  _name: Levels;
  _description: string;

  constructor(name: Levels, description: string) {
    this._name = name;
    this._description = description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  get name(): Levels {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(group: Group): void {
    const index = this._groups.indexOf(group);
    if (index !== -1) {
      this._groups.splice(index, 1);
    }
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods
  _area: Area[] = [];
  _status: Status;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  _directionName: string;
  _levelName: string;

  constructor(status: Status, directionName: string, levelName: string) {
    this._status = status;
    this._directionName = directionName;
    this._levelName = levelName;
  }

  get area(): Area[] {
    return this._area;
  }

  get status(): Status {
    return this._status;
  }

  set status(value: Status) {
    this._status = value;
  }

  get student(): Student[] {
    return this._students;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  addStudent(student: Student): void {
    this.student.push(student);
  }

  remmoveStudent(student: Student): void {
    const index = this._students.indexOf(student);
    if (index > -1) {
      this._students.splice(index, 1);
    }
  }

  showPerformance(): Student[] {
    const sortedStudents: Student[] = this._students.sort(
      (a: Student, b: Student) =>
        b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods
  _grades: Grade[] = []; // workName: mark
  _visits: Visit[] = []; // lesson: present
  _student: Students;

  constructor(student: Students) {
    this._student = student;
  }

  get fullName(): string {
    return `${this._student._lastName} ${this._student._firstName}`;
  }

  set fullName(value: string) {
    [this._student._lastName, this._student._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._student._birthYear;
  }

  setGrade(grade: Grade): void {
    this._grades.push(grade);
  }

  setVisit(visit: Visit): void {
    this._visits.push(visit);
  }

  getPerformanceRating(): number {
    const gradeValues: Grade[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: Grade) => sum + grade.mark, 0) /
      gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present: Visit) => present.present).length /
        this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
