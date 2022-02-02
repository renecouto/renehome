# Python sem Várzea - Volume 1
Python é uma boa linguagem... te dá bastante liberdade, então aqui é mais um post
mostrando possívels padrões de desenvolvimento e projeto.
Tentarei mostrar um exemplo com abuso de liberdade e magia, e outro para seres comuns entenderem.

Esse post assume familiaridade básica com python e pytest.

## Injeção de dependências
Imagine que temos uma api de que devemos consumir em nosso código, recebendo por exemplo... produtos! E queremos printá-los.
Um jeito comum é fazer uma função como essa:
```
import requests

def get_products():
    res = requests.get('https://minha.api.com.net/produtos')
    return res.json()
```

E supomos que teríamos uma função `main` para o script.
```
def main():
    products = get_products()
    print(products)

if __name__ == '__main__':
    main()
```

Aí vem a questão: E se quisermos testar a função `main`?
### Com várzea
Um jeito é utilizar o módulo `mock` da biblioteca `unittest`, e usarmos a anotação `@mock.patch` nos test-cases. Assumimos que a função `main`e `get_products` estão em `ex1.py`, o arquivo de testes está na pasta atual e se chama `test_ex1.py`

```
from unittest import mock
import ex1

@mock.patch('ex1.get_products')
def test_main(get_products):
    get_products.return_value = [{'id': 1, 'descricao': 'sabao em po'}]
    ex1.main()
```

O que acontece com a magia do `@mock.patch`? a variável/função get_products dentro do caminho ex1 é substituída por um objeto da classe `mock.Mock` https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock. Essa classe é utilizada principalmente em testes, normalmente para dinamicamente fazermos com que operações de entrada/saída de dados não ocorram realmente, mas sejam computadas apenas em memória.

Nesse caso, fazemos com que a função get_products não chame o seu corpo real, mas sim retorne o valor que registramos com a chamada `get_products.return_value`. 

### Um pouco menos de várzea
O problema maior que vejo em usar o `mock.patch` sempre é que ele é perigoso, e renomeação de métodos, adição de operações de IO... todas elas podem fazer com que por acidente o `mock.patch` falhe, e você execute uma requisição dentro dos testes.

Um jeito que podemos fazer é injetarmos a função `get_products` como argumento de entrada para a função `main`.

```

def main(get_products_fn):
    products = get_products_fn()
    print(products)

if __name__ == '__main__':
    main(get_products_fn=get_products)
```

Agora a função `main` não tem ligação direta com a implementação da função `get_products`, só precisa saber que `get_products_fn` é uma função que quando chamada me retorna os produtos que quero printar.

Nosso teste mudaria para refletir essa mudança:

```
from unittest import mock
import ex1

def test_main():
    get_products = mock.Mock()
    get_products.return_value = [{'id': 1, 'descricao': 'sabao em po'}]
    ex1.main(get_products_fn=get_products)
```
Vemos que não estamos mais utilizando anotações, então `na minha opinião` fica mais explícito e seguro.

### Ainda menos várzea
Agora imagine que essa api de produtos tem um endpoint de desenvolvimento, um de homol e um de produção... e queremos poder rodar nosso script contra cada um desses ambientes. Normalmente passamos configurações para o código através de variáveis de ambiente.

Essa seria a primeira abordagem. Direta.
```
def get_products()
    res = requests.get(os.environ['PRODUCTS_API_URL'])
    return res.json()
```

Mas tem algumas coisas nela que não gosto. se mudamos o nome da variável de ambiente, temos que mudar a função da implementação.... com pouco esforço podemos passar essa configuração como argumento.

```
def get_products(api_url):
    res = requests.get(api_url)
    return res.json()
```

Nosso ponto de entrada do script mudaria de acordo...
```
import os
if __name__ == '__main__':
    api_url = os.environ['PRODUCTS_API_URL']
    main(get_products_fn=lambda: get_products(api_url))
```

### Várzea quase nula
Supondo que agora temos o endpoint de criar produtos, que usa a mesma url, mas com método http POST e recebe id e descrição do produto no corpo, em json... O mais comum seria criar outra função create_products com base no Copiar e Colar:
```
def create_product(api_url, product_id, product_description):
    res = requests.post(api_url, json={'id': product_id, 'descricao': product_description})
    return res.json()
```

Quando a função `main` depender de muitas funções de IO relativas ao mesmo serviço, é comum englobarmos as funções em uma classe, um client!
Podemos juntar as funções get_product e create_product num carinha só, o `ProductsClient`
```
class ProductsClient:
    def __init__(self, api_url):
        self.api_url = api_url

    def get(self):
        return requests.get(api_url)

    def create(self):
        res = requests.post(self.api_url, json={'id':product_id, 'description': product_description})
        return res.json()
```
Agora podemos injetar alterar a função `main` de acordo:

```

def main(products_client):
    products = products_client.get()
    print(products)

if __name__ == '__main__':
    products_client = ProductsClient(api_url=os.environ['PRODUCTS_API_URL'])
    main(products_client=products_client)
```

### Fora do núcleo da várzea
Se quisermos deixar o ProductsClient mais testável, podemos injetar o client do pacote `requests` para:
- só dependermos da interface, não dependermos da implementação
  - podemos utilizar diferentes pacotes para realizar as requisições sem alterar o código de ProductsClient
- não termos efeitos colaterais quando não quisermos
  - podemos injetar um objeto da classe `mock.Mock` ou qualquer uma que quisermos para testes

```
class ProductsClient:
    def __init__(self, api_url, session):
        self.api_url = api_url
        self.session = session

    def get(self):
        return self.session.get(api_url)

    def create(self):
        res = self.session.post(self.api_url, json={'id':product_id, 'description': product_description})
        return res.json()
```

Alteramos o ponto de entrada devidamente
```
if __name__ == '__main__':
    session = requests.Session()
    products_client = ProductsClient(api_url=os.environ['PRODUCTS_API_URL'], session=session)
    main(products_client=products_client)
``` 

Nesse post aprendemos como injetar dependências para deixar nosso código mais desacoplado. No próximo, exploraremos a ferramenta `mypy`.