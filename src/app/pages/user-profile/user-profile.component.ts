import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/components/models/userModel';
import { DataService } from 'src/app/services/dataService';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserData;

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    await this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    let userId = localStorage.getItem("userID");
    this.user = await this.dataService.GetUserData(userId);
  }
  
}

