import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-displayer',
  templateUrl: './message-displayer.component.html',
  styleUrls: ['./message-displayer.component.scss']
})
export class MessageDisplayerComponent {
  @Input() message!: string;
  @Input() imageUrl?: string = undefined;
  @Input() description?: string = undefined;

}
