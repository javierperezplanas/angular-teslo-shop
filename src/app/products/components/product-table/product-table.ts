import { Component, inject, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'product-table',
  imports: [
    ProductImagePipe,
    RouterLink,
    CurrencyPipe,
    NgClass,
    PaginationComponent,
  ],
  templateUrl: './product-table.html',
})
export class ProductTable {
  products = input.required<Product[]>();
}
