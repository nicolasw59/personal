import { CommonModule } from '@angular/common'
import { Component, OnInit, inject, signal } from '@angular/core'
import { CartService } from 'app/cart/data-access/cart.service'
import { Product } from 'app/products/data-access/product.model'
import { ProductsService } from 'app/products/data-access/products.service'
import { ProductFormComponent } from 'app/products/ui/product-form/product-form.component'
import { InventoryStatus } from 'app/shared/enums/inventoryStatus'
import { TagInventaryStatusComponent } from 'app/shared/ui/tag-inventary-status/tag-inventary-status.component'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { DataViewModule } from 'primeng/dataview'
import { DialogModule } from 'primeng/dialog'

const emptyProduct: Product = {
  id: 0,
  code: '',
  name: '',
  description: '',
  image: '',
  category: '',
  price: 0,
  quantity: 0,
  internalReference: '',
  shellId: 0,
  inventoryStatus: 'INSTOCK',
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    TagInventaryStatusComponent,
    ProductFormComponent,
    CommonModule,
  ],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
  ) {}

  public readonly products = this.productsService.products
  public readonly cart = this.cartService.cart

  public isDialogVisible = false
  public isCreation = false
  public readonly editedProduct = signal<Product>(emptyProduct)
  public InventoryStatus = InventoryStatus

  ngOnInit() {
    this.productsService.get().subscribe()
    this.cartService.get().subscribe()
  }

  public onCreate() {
    this.isCreation = true
    this.isDialogVisible = true
    this.editedProduct.set(emptyProduct)
  }

  public onUpdate(product: Product) {
    this.isCreation = false
    this.isDialogVisible = true
    this.editedProduct.set(product)
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe()
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe()
    } else {
      this.productsService.update(product).subscribe()
    }
    this.closeDialog()
  }

  public addProductToCart(product: Product) {
    if (product.inventoryStatus === InventoryStatus.OUTOFSTOCK) {
      return
    }
    this.cartService.addProduct(product).subscribe()
  }

  public removeProductToCart(productId: number) {
    this.cartService.removeProduct(productId).subscribe()
  }

  public onCancel() {
    this.closeDialog()
  }

  private closeDialog() {
    this.isDialogVisible = false
  }

  public isProductInCart(productId: number): boolean {
    return this.cart().findIndex((product) => product.id === productId) >= 0
  }
}
