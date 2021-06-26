import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  paginatedTodos: Todo[] = [];
  removedTodos: Todo[] = [];
  newToDoTitle: string = "";
  isNameValid: boolean = true;
  pageNumber: number = 0;
  todosPerPage: number = 20;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos
        this.paginatedTodos = todos.slice(0, this.todosPerPage);
      });
  }

  createToDo() {
    if (this.newToDoTitle) {
      this.todos.push({ userId: 1, id: 1, title: this.newToDoTitle, completed: false });
      this.newToDoTitle = "";
      this.isNameValid = true;
    } else this.isNameValid = false;
  }

  doneToDo(selectedToDo: Todo) {
    selectedToDo.completed = !selectedToDo.completed;
  }

  deleteToDo(selectedToDo: Todo) {
    this.removedTodos.push(selectedToDo);
    this.paginatedTodos.splice(this.todos.indexOf(selectedToDo), 1);
    console.log(this.removedTodos);
  }

  sortTodos() {
    this.paginatedTodos.sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    });
    console.log('test');

  }
  prevPage() {
    if (this.pageNumber * this.todosPerPage >= this.todosPerPage) this.pageNumber -= 1;
    this.paginatedTodos = this.todos.slice(this.pageNumber * this.todosPerPage, this.pageNumber * this.todosPerPage+this.todosPerPage );

  }

 
  nextPage() {
    if (this.pageNumber * this.todosPerPage <= this.todos.length - this.todosPerPage*2) this.pageNumber += 1;
    this.paginatedTodos = this.todos.slice(this.pageNumber * this.todosPerPage, this.pageNumber * this.todosPerPage + this.todosPerPage);
  }



}
