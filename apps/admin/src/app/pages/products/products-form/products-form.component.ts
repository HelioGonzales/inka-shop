import { ActivatedRoute } from '@angular/router';
import { PopupService } from './../../../shared/service/popup.service';
import {
  Category,
  CategoriesService,
  ProductsService,
  Product,
} from '@inka-shop/products';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  form!: FormGroup;
  categories: Category[] = [];
  imageDisplay!: any | ArrayBuffer;
  currentProductId!: string;
  endSubs!: Subscription;

  constructor(
    private categoriesSvc: CategoriesService,
    private productSvc: ProductsService,
    private popupSvc: PopupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  onSubmit() {
    if (!this.form.valid) return;

    const productFormData = new FormData();

    Object.keys(this.form.controls).map((key) => {
      productFormData.append(key, this.form.controls[key].value);
    });

    if (this.editMode) {
      this._onUpdateProduct(productFormData);
    } else {
      this._onAddProduct(productFormData);
    }
  }

  onImageUpload(event: any) {
    const file = event?.target?.files[0];

    if (file) {
      // Image upload, needs to be as a file, remove formControlName
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      countInStock: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      richDescription: new FormControl(''),
      image: new FormControl('', Validators.required),
      isFeatured: new FormControl(false),
    });
  }

  private _getCategories() {
    this.endSubs = this.categoriesSvc.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  private _onAddProduct(productData: FormData) {
    this.endSubs = this.productSvc.createProduct(productData).subscribe(
      (product: Product) => {
        this.form.reset();
        this.popupSvc.popup('/products', `${product.name} created`);
      },
      (error) => {
        this.form.reset();
        this.popupSvc.popupError(error.error.message);
      }
    );
  }

  private _onUpdateProduct(productFormData: FormData) {
    this.endSubs = this.productSvc
      .updateProduct(productFormData, this.currentProductId)
      .subscribe(
        (product: Product) => {
          this.form.reset();
          this.popupSvc.popup('/products', `${product.name} updated`);
        },
        (error) => {
          this.form.reset();
          this.popupSvc.popupError(error.error.message);
        }
      );
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id) {
        this.editMode = true;
        this.currentProductId = res.id;
        this.productSvc.getProduct(res.id).subscribe((res) => {
          // this.imageDisplay = res.image;
          // this.form.setValue({
          //   name: res.name,
          //   brand: res.brand,
          //   price: res.price,
          //   category: res.category?.id,
          //   countInStock: res.countInStock,
          //   description: res.description,
          //   richDescription: res.richDescription,
          //   isFeatured: res.isFeatured,
          //   image: this.imageDisplay,
          // });

          this.form.get('name')?.setValue(res.name);
          this.form.get('brand')?.setValue(res.brand);
          this.form.get('price')?.setValue(res.price);
          this.form.get('category')?.setValue(res.category?.id);
          this.form.get('countInStock')?.setValue(res.countInStock);
          this.form.get('description')?.setValue(res.description);
          this.form.get('richDescription')?.setValue(res.richDescription);
          this.form.get('isFeatured')?.setValue(res.isFeatured);
          this.imageDisplay = res.image;
          this.form.get('image')?.setValidators([]);
          this.form.get('image')?.updateValueAndValidity();
        });
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs.unsubscribe();
  }
}
