import { Produto } from './../produto.model';
import { ProdutoService } from './../produto.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  produto: Produto;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.readById(id).subscribe(
      produto => {
        this.produto = produto;
      }
    );
  }

  updateProduto() {
    this.produtoService.update(this.produto).subscribe(
      () => {
        this.produtoService.showMessage('Produto Atualizado com Sucesso');
        this.router.navigate(['/produtos']);
      }
    );
  }

  cancel() {
    this.router.navigate(['/produtos']);
  }

}
