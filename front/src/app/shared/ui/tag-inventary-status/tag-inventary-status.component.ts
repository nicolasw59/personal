import { Component, Input, OnInit } from '@angular/core'
import { InventoryStatus } from 'app/shared/enums/inventoryStatus'
import { TagModule } from 'primeng/tag'

@Component({
  selector: 'app-tag-inventary-status',
  standalone: true,
  imports: [TagModule],
  templateUrl: './tag-inventary-status.component.html',
  styleUrl: './tag-inventary-status.component.scss',
})
export class TagInventaryStatusComponent implements OnInit {
  @Input() productStatus: InventoryStatus | undefined

  public Status = InventoryStatus

  public label: string = ''
  public severity:
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast' = 'secondary'

  ngOnInit() {
    switch (this.productStatus) {
      case InventoryStatus.INSTOCK:
        this.label = 'En stock'
        this.severity = 'success'
        break

      case InventoryStatus.LOWSTOCK:
        this.label = 'Stock faible'
        this.severity = 'warning'
        break

      case InventoryStatus.OUTOFSTOCK:
        this.label = 'Produit épuisé'
        this.severity = 'danger'
        break

      default:
        break
    }
  }
}
