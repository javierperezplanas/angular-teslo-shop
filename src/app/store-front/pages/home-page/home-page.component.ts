import { Component, inject } from '@angular/core';
import {
  rxResource,
  toSignal,
} from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card.component/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map } from 'rxjs';
// import { ProductCardComponent } from '../../../products/components/product-card.component/product-card.component';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9,
      });
    },
  });
}
