import { Component, OnInit, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatToolbarModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    
  }

  themeService:ThemeService=inject(ThemeService);
  isDarkTheme:Boolean=true;



  toggleTheme(){
    this.themeService.updateTheme();
    this.isDarkTheme=this.themeService.themeSignal()==='dark';

  }

}
