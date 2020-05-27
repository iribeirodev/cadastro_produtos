import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../produto.service';
import { Produto } from './../produto.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  produto: Produto;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id  = +this.route.snapshot.paramMap.get('id');
    this.produtoService.readById(id).subscribe(
      produto => {
        this.produto = produto;
      }
    );
  }

  deleteProduto() {
    this.produtoService.delete(this.produto.id).subscribe(
      () => {
        this.produtoService.showMessage('Produto Excluído com Sucesso');
        this.router.navigate(['/produtos']);
      }
    );
  }

  cancel() {
    this.router.navigate(['/produtos']);
  }

}
