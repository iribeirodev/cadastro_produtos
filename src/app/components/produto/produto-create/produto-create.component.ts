import { Produto } from './../produto.model';
import { Router } from '@angular/router';
import { ProdutoService } from './../produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    name: '',
    price: null
  }

  constructor(
    private produtoService: ProdutoService,
    private router: Router) 
  { }

  ngOnInit(): void {
    
  }

  createProduto() {
    this.produtoService.create(this.produto).subscribe(
      () => {
        this.produtoService.showMessage('Produto Criado!');
        this.router.navigate(['/produtos']);
      }
    )
    
  }

  cancel() {
    this.router.navigate(['/produtos']);
  }

}
