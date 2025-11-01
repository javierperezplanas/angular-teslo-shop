import { Component, inject } from '@angular/core';
import {
  rxResource,
  toSignal,
} from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map, of } from 'rxjs';
import { ProductCardComponent } from '@products/components/product-card.component/product-card.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.route.params.pipe(map(({ gender }) => gender))
  );

  productsResource = rxResource({
    params: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9,
      });
    },
  });
}
