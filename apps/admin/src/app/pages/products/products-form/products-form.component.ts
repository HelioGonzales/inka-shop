import { Category, CategoriesService } from '@inka-shop/products';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private categoriesSvc: CategoriesService) {}

  ngOnInit(): void {
    this._initForm();
    this._getProducts();
  }

  onSubmit() {
    if (!this.form.valid) return;

    const productFormData = new FormData();

    Object.keys(this.form.value).map((key) => {
      const keyChi = key;
      const val = this.form.value[key];
      console.log(keyChi, val);

      productFormData.append(keyChi, val);
    });
  }

  onImageUpload(event: any) {
    const file = event?.target?.files[0];

    if (file) {
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
      image: new FormControl(''),
      isFeatured: new FormControl(''),
    });
  }

  private _getProducts() {
    this.categoriesSvc.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}
