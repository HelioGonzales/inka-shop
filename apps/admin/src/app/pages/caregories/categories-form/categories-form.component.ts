import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@inka-shop/products';
import { PopupService } from '../../../shared/service/popup.service';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmited = false;
  editMode = false;
  currentCagoryId: string = null as any;

  constructor(
    private categorySvc: CategoriesService,
    private popupSvc: PopupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      icon: new FormControl(null, Validators.required),
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmited = true;
    if (!this.form.valid) return;

    const category: Category = {
      id: this.currentCagoryId,
      name: this.form.get('name')?.value,
      icon: this.form.get('icon')?.value,
    };

    if (this.editMode) {
      this._onUpdateCategory(category);
    } else {
      this._onAddCategory(category);
    }
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id) {
        this.editMode = true;
        this.currentCagoryId = res.id;
        this.categorySvc.getCategory(res.id).subscribe((res) => {
          this.form.setValue({
            name: res.name,
            icon: res.icon,
          });
        });
      }
    });
  }

  private _onAddCategory(category: Category) {
    this.categorySvc.createCategory(category).subscribe(
      (category: Category) => {
        this.form.reset();
        this.popupSvc.popup('/categories', `${category.name} created`);
      },
      (error) => {
        this.form.reset();
        this.popupSvc.popupError(error.error.message);
      }
    );
  }

  private _onUpdateCategory(category: Category) {
    this.categorySvc.updateCategory(category).subscribe(
      (category: Category) => {
        this.form.reset();
        this.popupSvc.popup('/categories', `${category.name} updated`);
      },
      (error) => {
        this.form.reset();
        this.popupSvc.popupError(error.error.message);
      }
    );
  }
}
