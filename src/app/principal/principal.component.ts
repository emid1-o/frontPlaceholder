import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

  cliente = new Cliente();

  btnCadastrar:boolean = true;

  clientes:Cliente[] = [];

  //variavel pra visibilidade da tabela
  tabela:boolean = true;

  constructor(private servico:ClienteService){}

  selecionar():void {
      this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
  }

  cadastrar():void {
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {
      //cadastrar o cliente no vetor
      this.clientes.push(retorno);});

      const nomezin = this.cliente.nome;

      //limpar fomulario
      this.cliente = new Cliente();

      //mensagem
      alert(nomezin + ' cadastrado com sucesso!')
  }

  //metodo rpa selecionar cliente
  selecionarCliente(posicao:number):void {

    //selecionar cleinte no vetor
    this.cliente = this.clientes[posicao];

    //visibilidade dos botos
    this.btnCadastrar = false;

    //visibilidade da tabela
    this.tabela = false;
  }

  //metodo para editar clientes
  editar():void {

    this.servico.editar(this.cliente)
    .subscribe(retorno => {

      let posicao = this.clientes.findIndex(obj => {
        return obj.id == retorno.id;
      });

      //alterar os dados do cliente no vetor
      this.clientes[posicao] = retorno;

      this.cliente = new Cliente();

      this.btnCadastrar = true;
      this.tabela = true;

      alert("Cliente alterado com sucesso!")
    })
  }

   remover():void {

    this.servico.remover(this.cliente.id)
    .subscribe(retorno => {

      let posicao = this.clientes.findIndex(obj => {
        return obj.id == this.cliente.id;
      });

      //remover cleinte
      this.clientes.splice(posicao, 1);

      this.cliente = new Cliente();

      this.btnCadastrar = true;
      this.tabela = true;

      alert("Cliente removido com sucesso!")
    })
  }

  cancelar():void{

    this.cliente = new Cliente;

    this.btnCadastrar = true;
    this.tabela = true;
  }

  ngOnInit(){
    this.selecionar();
  }

  

}
