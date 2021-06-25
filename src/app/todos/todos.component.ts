import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [
    { id: uuidv4(), title: 'learn angular', isDone: false },
    { id: uuidv4(), title: 'learn react', isDone: false },
    { id: uuidv4(), title: 'learn vue', isDone: false }
  ];
  removedTodos: Todo[] = [];
  newToDoTitle: string = "";
  isNameValid: boolean = true;

  constructor() { }

  ngOnInit(): void {
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
