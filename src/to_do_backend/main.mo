import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";

actor {
        
  type Tarefa = {    
    id: Nat;          
    categoria: Text;   
    descricao: Text;  
    urgente: Bool; 
    concluida: Bool;   
  };

  var idTarefa : Nat = 0;
 
  var tarefas : Buffer.Buffer<Tarefa> = Buffer.Buffer<Tarefa>(10);

  // ######### FUNÇÃO ADICIONAR TAREFAS ##########
    public func addTarefa(desc: Text, cat: Text, urg: Bool, con: Bool) : async () {
      idTarefa += 1;

      let t : Tarefa = {  
        id = idTarefa;
        categoria = cat;    
        descricao = desc;                          
        urgente = urg;                   
        concluida = con;                                       
      };

      tarefas.add(t);
    };

  // ########## FUNÇÃO EXCLUIR TAREFA ###########
    public func excluirTarefa(idExcluir: Nat) : async () {

      func localizaExcluir(i: Nat, x: Tarefa) : Bool {
        return x.id != idExcluir;
      };

      tarefas.filterEntries(localizaExcluir); 

    };

  // ########## FUNÇÃO ALTERAR TAREFA ###########
    public func alterarTarefa(
      idTar: Nat, 
      cat: Text,
      desc: Text,                             
      urg: Bool, 
      con: Bool) : async () {

      let t : Tarefa = {
        id = idTar;
        categoria = cat;    
        descricao = desc;                        
        urgente = urg;                      
        concluida = con;
      };

      func localizaIndex (x: Tarefa, y: Tarefa) : Bool {
        return x.id == y.id;
      };

      let index : ?Nat = Buffer.indexOf(t, tarefas, localizaIndex);

      switch(index){
        case(null) {
              
        };
        case(?i){
          tarefas.put(i,t);
        };
      };

    };

  // ########### FUNÇÃO RETORNAR TAREFAS ###########
    public func getTarefas() : async [Tarefa] {
      return Buffer.toArray(tarefas);
    };  

  // ############ FUNÇÃO RETORNAR TAREFAS EM ANDAMENTO ###########
    public func totalTarefasEmAndamento() : async Nat {
      var tarefasEmAndamento : Nat = 0; 

      for (value in tarefas.vals()) {
        if (value.concluida == false) {
          tarefasEmAndamento += 1;
        };
      };

      return tarefasEmAndamento;
    };

  // ########## FUNÇÃO RETORNAR TAREFAS CONCLUÍDAS ############
    public func totalTarefasConcluidas() : async Nat {
      var tarefasConcluidas : Nat = 0;
    
      for (value in tarefas.vals()) {
        if (value.concluida == true) {  
          tarefasConcluidas += 1;
        };
      };

      return tarefasConcluidas;
    };
};