import { Component, input, model, signal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { ChatMessage } from '../../../../../core/interface/ChatMessage';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
@Component({
  selector: 'app-chat-input',
  imports: [
    IconFieldModule,
    InputIconModule,
    InputText,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    FormsModule,
    AutoFocusModule
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {

  value = model.required<ChatMessage | null> (); 
  myId = input.required<string>();
  inputVal = signal<string>('');


  sendMessage(message: string, $event: Event){
    $event.preventDefault();
    if (!message || !message.trim()) {
      return;
    }
    this.value.set(
      {
        text: message.trim(),
        id: uuidv4(),
        userId: this.myId(),
        createdAt: Date.now(),
      }
    )
   this.inputVal.set('');
  };


  

}
