import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  removedTodos: Todo[] = [];
  newToDoTitle: string = "";
  isNameValid: boolean = true;

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    })
  }

  createToDo() {
    if (this.newToDoTitle) {
      this.todos.push({ id: uuidv4(), title: this.newToDoTitle, isDone: false });
      this.newToDoTitle = "";
      this.isNameValid = true;
    } else this.isNameValid = false;
  }

  doneToDo(selectedToDo: Todo) {
    selectedToDo.isDone = !selectedToDo.isDone;
  }

  deleteToDo(selectedToDo: Todo) {
    this.removedTodos.push(selectedToDo);
    this.todos.splice(this.todos.indexOf(selectedToDo), 1);
    console.log(this.removedTodos);
    }
  
  sortTodos(){
    this.todos.sort((a, b) => {
      return Number(a.isDone) - Number(b.isDone);
    });
    console.log('test');

  }
  


}
