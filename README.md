# Multi Stock API

Esta API alimenta o frontend **Multi Stock**, que pode ter seu repositório GitHub acessado através [deste link](https://github.com/NazarethDev/Simple-multi-stock-frontend), e com o site no ar com dados fictícios [neste link](https://simple-multi-stock-app-git-develop-nazarethdevs-projects.vercel.app/).

O objetivo do projeto é tornar visível e acessível informações sobre uma mesma rede de lojas, permitindo o controle de disponibilidade de estoque e datas de vencimento de produtos entre locais geograficamente distintos.

---

## Como executar em sua máquina

Para se usar a aplicação localmente, é necessário realizar cinco alterações de altíssima importancia no código após cloná-lo em sua máquina. 
* *1 -* No arquivo `app.js`, retire o comentário que se encontra sobre a função `connectDB()`. Como a aplicação em execução no Vercel funciona em serverless, a conexão no banco de dados é executada em outro local do código, o qual não é chamado nativamente ao se executar a aplicação em máquina. 
* *2-* Crie um arquivo .env na raíz do projeto. 
* *3-* No arquivo .env, crie uma variável chamada *MONGO_PATH*, e atribua a ela um link ao seu banco de dados (mongo DB) em sua aplicação localmente. Vale lembrar que o link pode levar a uma instância em nuvem no [AtlasDB](https://www.mongodb.com/products/platform/atlas-database) por exemplo.
* *4-* Também no arquivo .env, crie uma nova variável chamada *CORS_ORIGINS*. Essa variável deve corresponder ao link do frontend ou serviço externo em que deseja consumir os serviços e dados que a API fornece.
* *5-* Por fim, é necessário criar uma nova variável de ambiente em seu arquivo .env chamada *PORT*, a qual definirá o ponto de acesso pelo qual a máquina permitirá acesso a aplicação.

## Funcionalidades e Endpoints

### 📦 Gestão de Produtos e Estoque

* **Listagem de produtos por vencimento**: Visualize produtos com validade dentro de um período específico.
    * **Endpoint:** `GET /products/expiring-soon?days=30`
    * **Parâmetro:** Número de dias no futuro.
* **Lista de produtos vencidos**: Retorna produtos expirados registrados no banco de dados.
    * **Endpoint:** `GET /products/expired-products?days=30`
    * **Parâmetro:** Número de dias (desde a data atual da busca até a quantidade de dias no passado).
    > **Nota:** Por limitações de estrutura, o banco armazena apenas dados dos últimos 90 dias; registros mais antigos são excluídos automaticamente.
* **Busca por código de barras**: Encontre um produto específico no sistema.
    * **Endpoint:** `GET /products/ean/{código de barras do produto}`
* **Atualização de quantidades**: Atualiza o estoque disponível. Este endpoint separado garante a escalabilidade para futuras integrações diretas com sistemas de PDV/TPS.
    * **Endpoint:** `PUT /products/quantity/{id do produto}`
    * **Exemplo de corpo:**
    ```json
    {
        "quantities" :{
	    	"Guaianases": 300,
		    "Tiradentes": 1000,
		    "Ferraz": 50
	    }  
    }
    ```
    > **Nota:** Essa decisão na arquitetura do código é essencial para que futuramente, seja possível automatizar as quantidades de produtos de acordo com os dados fornecidos pelo software TPS usado no comércio futuramente.
* **Atualização de dados base**: Altere informações como custo, nome e validade.
    * **Endpoint:** `PATCH /products/update-cost-and-name/{id do produto}`
    * **Exemplo de corpo:**
    ```json
    {
      "productNamea": "Novo Nome",
      "productCost": 10.50,
      "expiresAt": "2026-02-04T00:00:00.000"
    }
    ```
* **Criação de produto**: Registre um novo item no sistema.
    * **Endpoint:** `POST /products`
    * **Exemplo de corpo:**
    ```json
    {
	    "name": "Coca-Cola 2 litros",
	    "eanCode": "6547893211595",
	    "expiresAt": "2025-12-31T00:00:00.000Z",
	    "cost": 7.99
    }
---

### 📊 Estatísticas e Relatórios (Vencidos nos últimos 90 dias)

A API fornece insights sobre perdas e performance de estoque:

* **Produtos que mais expiraram**: Ranking dos 10 produtos com maior índice de perda por período.
    * **Endpoint:** `GET /products/statistics/top-expired-products?months=3`
    * **Parâmetro:** Número de meses (desde a data atual da busca até a quantidade de dias no passado).
    * **Exemplo de retorno:** 
    ```json
        [
	    {
		    "id": "697d93286d5621f7cea291dd",
		    "name": "Cerveja Lata 350ml",
		    "ean": "7891020304327",
		    "quantity": 2870
	    },

	    {
		    "id": "697d93286d5621f7cea291c7",
		    "name": "Leite Integral 1L",
		    "ean": "7891020304105",
		    "quantity": 995
	    },
	    {
		    "id": "697d93286d5621f7cea291d0",
		    "name": "Molho de Tomate Sachê",
		    "ean": "7891020304198",
		    "quantity": 597
	    },
	    {
		    "id": "697d93286d5621f7cea291f6",
		    "name": "Creme de Leite 200g",
		    "ean": "7891020304570",
		    "quantity": 597
	    }
    ]
    ```
* **Prejuízo financeiro**: Retorna o total financeiro perdido (geral e subtotal por loja).
    * **Endpoint:** `GET /products/statistics/expired-products-costs-by-store?months=2`
    * **Parâmetro:** Número de meses (desde a data atual da busca até a quantidade de dias no passado). 
    * **Exemplo de retorno:**
    ```json
    {
	    "totalLosted": 236181.5,
	    "byStore": {
		"Dom Bosco": 43173.34,
		"Ferraz": 28631.3,
		"Tiradentes": 39087.04,
		"COHAB": 46043.21,
		"Guaianases": 41787.69,
		"Jundiapeba": 37458.92
	    }
    }
    
    ```
* **Quantidades expiradas por loja**: Total de unidades vencidas por unidade.
    * **Endpoint:** `GET /products/statistics/expired-products-by-store`
    * **Parâmetro:** Número de meses (desde a data atual da busca até a quantidade de dias no passado).
    * **Exemplo de retorno:**
    ```json
    {
	    "totalLosted": 10103,
	    "byStore": {
		"COHAB": 2130,
		"Dom Bosco": 1851,
		"Guaianases": 1781,
		"Tiradentes": 1561,
		"Jundiapeba": 1399,
		"Ferraz": 1381
	    }
    }
    ```

