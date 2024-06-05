import { Component } from '@angular/core';
import { ButtonComponent } from "../shared/button/button.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [ButtonComponent]
})
export class HeaderComponent {

}
