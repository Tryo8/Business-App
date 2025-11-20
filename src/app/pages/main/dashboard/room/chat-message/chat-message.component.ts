import { Component, ElementRef, inject, input, output } from '@angular/core';
import { ChatMessage } from '../../../../../core/interface/ChatMessage';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
@Component({
  selector: 'app-chat-message',
  imports: [ButtonModule,ConfirmDialogModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  providers: [ConfirmationService, AnimateOnScrollModule]
})
export class ChatMessageComponent {
  constructor(private confirmationService: ConfirmationService,){}

  messages = input.required<ChatMessage[]>();
  myId = input.required<string>();
  messageDeleted = output<string>();
  isMessageNew!: boolean ;
  elRef = inject(ElementRef);

  get scrollContainer(){
    return this.elRef.nativeElement;
  };

  deleteMessage(event: Event, messageId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this message?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: false
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
        outlined: false
      },
      accept: () => {
        this.messageDeleted.emit(messageId);
      }
    });
  };

  getMessageTime(timestamp: number): string {
    const now = new Date(timestamp);
    let hours = now.getHours(); 
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 24h to 12h format
    this.isMessageNew = true;
    if(hours <  28){
      this.isMessageNew = false;
    }
    return `${hours}:${minutes} ${ampm}`; 
  };


 

}


