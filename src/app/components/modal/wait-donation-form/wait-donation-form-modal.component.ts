import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-wait-donation-form-modal",
  templateUrl: "./wait-donation-form-modal.component.html",
  styleUrls: ["./wait-donation-form-modal.component.scss"],
})
export class WaitDonationFormModalComponent implements OnInit {
  
  donationForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,

  ) {}

  ngOnInit(): void {
  }


}
