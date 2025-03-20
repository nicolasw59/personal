import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { Product } from 'app/products/data-access/product.model'
import { Observable, catchError, tap, of } from 'rxjs'
import { Cart } from './cart.model'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  private readonly http = inject(HttpClient)
  private readonly path = '/api/cart'

  private readonly _cart = signal<Product[]>([])

  public readonly cart = this._cart.asReadonly()

  public get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path).pipe(
      catchError((error) => {
        return this.http.get<Product[]>('assets/cart.json')
      }),
      tap((products) => this._cart.set(products)),
    )
  }

  public addProduct(product: Product): Observable<boolean> {
    return this.http.post<boolean>(this.path, product).pipe(
      catchError(() => {
        return of(true)
      }),
      tap(() => this._cart.update((products) => [product, ...products])),
    )
  }
  public removeProduct(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
      catchError(() => {
        return of(true)
      }),
      tap(() =>
        this._cart.update((products) =>
          products.filter((product) => product.id !== productId),
        ),
      ),
    )
  }
}
