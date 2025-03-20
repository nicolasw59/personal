import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product } from 'app/products/data-access/product.model'
import { CardModule } from 'primeng/card'
import { DataViewModule } from 'primeng/dataview'

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule, DataViewModule, CardModule],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss',
})
export class UserCartComponent {
  @Input() products: Product[] = []

  @Output() cancel = new EventEmitter<void>()

  onCancel() {
    this.cancel.emit()
  }
}
