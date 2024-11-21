import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/accessibility/language.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
  currentLanguage: string;
  languages: string[] = ['es', 'en', 'fr', 'ko'];

  constructor(private languageService: LanguageService) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  changeLanguage(language: string) {
    this.languageService.setLanguage(language);
    this.currentLanguage = language;
  }
}
