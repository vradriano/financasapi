# FinancasAPI.

Financas API é uma api com as seguintes funcionalidades:
<br>
Criação de conta,
<br>
Depósito de valores,
<br>
Extrato bancário com opção de verificar data,
<br>
Saque, 
<br>
Opção de alterar o nome do titular da conta,
<br>
Possibilidade de excluir conta.

<hr>

#### Requisitos
[✓] Deve ser possível criar uma conta
<br>
[✓] Deve ser possível buscar o extrato bancário do cliente
<br>
[✓] Deve ser possível realizar um depósito
<br>
[✓] Deve ser possível realizar um saque
<br>
[✓] Deve ser possível buscar o extrato bancário do cliente por data
<br>
[✓] Deve ser possível atualizar dados da conta do cliente
<br>
[✓] Deve ser possível obter dados da conta do cliente
<br>
[✓] Deve ser possível deletar uma conta

<hr>

#### Regras de negócio
[✓] Não deve ser possível cadastrar uma conta com CPF já existente
<br>
[✓] Não deve ser possível fazer depósito em uma conta não existente
<br>
[✓] Não deve ser possível buscar extrato em uma conta não existente
<br>
[✓] Não deve ser possível fazer saque em uma conta não existente
<br>
[✓] Não deve ser possível excluir uma conta não existente
<br>
[✓] Não deve ser possível fazer saque quando o saldo for insuficiente

<hr>

### Tecnologias utilizadas:
Javascript,
NodeJS.
