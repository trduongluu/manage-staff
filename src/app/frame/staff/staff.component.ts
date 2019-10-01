import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { StaffService } from './staff.service';
import { Staff } from './staff';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffs: Staff[];
  // Modal variables
  isVisible = false;
  isConfirmLoading = false;
  // Form variables
  validateForm: FormGroup;
  // Search variables
  staffSearchList: any[] = [];
  searchString: string;
  timer: any;
  notSearch = true;
  // Delet variables
  paging = {
    pageSize: 5,
    pageIndex: 1,
    total: 0
  };
  // Edit variables
  editingId: number;

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private serviceAction: StaffService
  ) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getData();

    // await this.serviceAction.getStaffs().toPromise().then(x => {
    //   this.staffs = x;
    //   console.log(x);
    // });
  }

  // Service data interaction
  getData() {
    this.serviceAction
      .getStaffs(this.paging.pageIndex, this.paging.pageSize)
      .subscribe(res => {
        this.staffs = res.data;
        this.paging.total = res.total;
        console.log(JSON.stringify(res));
      });
  }

  // 5 Modal add interaction
  showModal(): void {
    this.isVisible = true;
  }

  addNewStaff(value: any): void {
    const newStaff: any = {
      staffId: `random00${this.staffs.length + 1}`,
      ...value
    };
    // this.staffs.push(newStaff);
    this.serviceAction.postStaff(newStaff).subscribe(() => this.getData());

    setTimeout(() => {
      const modal = this.modalService.success({
        nzTitle: `Success`,
        nzContent: `Added ${newStaff.name}`
      });
      setTimeout(() => modal.destroy(), 1000);
    }, 1000);
  }

  handleSubmit(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(value: any): void {
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(this.editingId);
    if (this.editingId || this.editingId === 0) {
      this.editStaffInfo(value);
    } else {
      this.addNewStaff(value);
    }
    this.editingId = null;
    this.validateForm.reset();
  }

  // 3 Delete staff interaction
  trackPageIndex(value: any) {
    console.log(value);
    this.paging.pageIndex = value;
    this.getData();
  }

  deleteRow(index: number): void {
    const i = (this.paging.pageIndex - 1) * this.paging.pageIndex + index;
    console.log(this.staffs[i].staffId);
    this.serviceAction
      .deleteStaff(this.staffs[i].staffId)
      .subscribe(() => this.getData());
    // this.staffs.splice(i, 1);
    // this.staffs = [...this.staffs];
    // this.staffs = this.staffs.filter((_, i) => i !== index);
    setTimeout(() => {
      const modal = this.modalService.success({
        nzTitle: `Success`,
        nzContent: `Deleted`
      });
      setTimeout(() => modal.destroy(), 1000);
    }, 1000);
  }

  showDeleteConfirm(i: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent:
        '<b style="color: red;">This action will permanently delete the data.</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteRow(i),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Canceled')
    });
  }

  // 2 update info interaction
  modalEditPopup(i: number): void {
    const num = (this.paging.pageIndex - 1) * this.paging.pageSize + i;
    const selectedOne: Staff = this.staffs.find((_, index) => index === num);
    this.validateForm.setValue({
      name: selectedOne.name,
      email: selectedOne.email,
      phone: selectedOne.phone,
      address: selectedOne.address
    });
    this.editingId = num;
    this.isVisible = true;
  }

  editStaffInfo(value: any): void {
    const editedStaff = this.staffs[this.editingId];
    editedStaff.name = value.name;
    editedStaff.email = value.email;
    editedStaff.phone = value.phone;
    editedStaff.address = value.address;
    this.serviceAction.updateStaff(editedStaff).subscribe(() => this.getData());

    setTimeout(() => {
      const modal = this.modalService.success({
        nzTitle: `Success`,
        nzContent: `Edited`
      });
      setTimeout(() => modal.destroy(), 1000);
    }, 1000);
  }

  // 2 Search interaction
  searchStaff(): void {
    this.serviceAction.searchStaff(this.paging.pageIndex, this.paging.pageSize, this.searchString).subscribe(res => {
      this.staffs = res.data;
      this.paging.total = res.total;
      console.log(JSON.stringify(res));
    });
  }

  searchLocal(): void {
    if (this.searchString.length > 0) {
      this.notSearch = false;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.staffSearchList = this.staffs.filter((obj, i) => {
          let isFound = false;
          // tslint:disable-next-line:forin
          for (const key in obj) {
            if (
              (obj[key] as string)
                .toLowerCase()
                .indexOf(this.searchString.toLowerCase()) !== -1
            ) {
              isFound = true;
            }
          }
          return isFound;
        });
        console.log(this.staffSearchList);
      }, 1000);
      // tslint:disable-next-line:curly
    } else this.notSearch = true;
  }
}
