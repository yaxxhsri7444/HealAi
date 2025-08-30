import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  loading: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    // 1. Add user message in UI instantly
    const userMsg: ChatMessage = {
      sender: 'user',
      text: this.newMessage,
      timestamp: new Date(),
    };
    this.messages.push(userMsg);

    const messageToSend = this.newMessage;
    this.newMessage = '';
    this.loading = true;

    // 2. Send message to backend
    this.chatService.sendMessage(messageToSend).subscribe({
      next: (res) => {
        const aiMsg: ChatMessage = {
          sender: 'ai',
          text: res.reply,
          timestamp: new Date(),
        };
        this.messages.push(aiMsg);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error sending message:', err);
        this.loading = false;
      },
    });
  }
}
