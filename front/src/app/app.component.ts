import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SplitterModule } from 'primeng/splitter'
import { ToolbarModule } from 'primeng/toolbar'
import { PanelMenuComponent } from './shared/ui/panel-menu/panel-menu.component'
import { CommonModule } from '@angular/common'
import { BadgeModule } from 'primeng/badge'
import { CartService } from './cart/data-access/cart.service'
import { SidebarModule } from 'primeng/sidebar'
import { UserCartComponent } from './shared/ui/user-cart/user-cart.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    PanelMenuComponent,
    CommonModule,
    BadgeModule,
    SidebarModule,
    UserCartComponent,
  ],
})
export class AppComponent {
  title = 'ALTEN SHOP'

  public isCartMenuVisible = false

  public readonly cart = this.cartService.cart

  constructor(private cartService: CartService) {}

  public openCartSideMenu() {
    this.isCartMenuVisible = true
  }
  public onCancel() {
    this.closeCartSideMenu()
  }

  private closeCartSideMenu() {
    this.isCartMenuVisible = false
  }
}
