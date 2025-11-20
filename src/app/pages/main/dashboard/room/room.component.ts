import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { ChatMessage } from '../../../../core/interface/ChatMessage';
import { ChatMessageComponent } from "./chat-message/chat-message.component";
import { v4 as uuidv4 } from 'uuid';
import { ChatInputComponent } from "./chat-input/chat-input.component";
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { TabsModule } from 'primeng/tabs';
@Component({
  selector: 'app-room',
  imports: [ChatMessageComponent, ChatInputComponent,Avatar,AvatarGroup,TabsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;
  constructor() {
    afterNextRender(() => {
      this.scrollChatToBottom();
    })
  };
  

  newMessage = signal<ChatMessage | null> (null);
  cdRef = inject(ChangeDetectorRef);
  newMessageChange = effect(() => {
    console.log('new message changed!',this.newMessage());

    if(!this.newMessage()){ 
      return;
    }

    const container = this.chatContainer?.nativeElement;
    if (container) {
      queueMicrotask(() => {
        container.scrollTop = container.scrollHeight;
      });
    }

    this.messages.update((messages) => [...messages, this.newMessage()!])
    this.cdRef.detectChanges();
    this.scrollChatToBottom();
  }, {
    allowSignalWrites: true
  })
  myId = uuidv4();
  contactId= uuidv4();
  messageDeleted= uuidv4();
  chatComponent = viewChild.required(ChatMessageComponent)
  
  messages = signal<ChatMessage[]>([
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
   
      messageDelete:this.messageDeleted
      
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Doing fine..',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'Good to hear 😁',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Have you received my report?',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'Not yet',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Well I ran out of things to say',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'Understandable',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
    {
      text: 'Hey',
      userId: this.myId,
      id: uuidv4(),
    },
    {
      text: 'How are you doing?',
      userId: this.contactId,
      id: uuidv4(),
    },
  ]);

  removeMessage(messageId: string){
    this.messages.update(
      messages => messages.filter( msg => msg.id !== messageId )
    )
  };

  scrollChatToBottom() {
    const el = this.chatComponent().scrollContainer as HTMLElement;
    el.scrollTo ({
      top: el.scrollHeight,


    });
  }

  

}

