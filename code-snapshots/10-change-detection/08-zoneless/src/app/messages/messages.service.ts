import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages = signal<string[]>([]); // regjistrojme nje array me string
  allMessages = this.messages.asReadonly(); // marim get all data by array string: messages

  addMessage(message: string) { // updetojme array string duke e mbushur me te dhena.
    this.messages.update((oldMessages) => [...oldMessages, message]);
  }
}
