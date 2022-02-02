# Python sem Várzea - Volume 2
Checagem estática de tipos garante um nível a mais de segurança ao seu código. Isso é inquestionável. Mas no python você não precisa escolher entre tipagem estática ou dinâmica, você pode ter as duas!!

Python tem anotação opcional de tipos, a nível de documentação desde 2014!!! https://www.python.org/dev/peps/pep-0484/. E uma ferramenta comum para fazer uma checagem se estamos usando os tipos documentados de maneira correta é o mypy http://mypy-lang.org/examples.html
## Mypy, your py, our py
instale o mypy usando `pip3 install mypy`.

Num arquivo `ex2.py`, vamos lembrar dos perigos da ausência de checagem de tipos.

```
def add_2(x):
    return x + 2

if __name__ == '__main__':
    add_2('qwwe')
```

Esse código quebra quando estamos rodando, mas ele poderia quebrar antes. Claramente a função `add_2` espera que a chamemos com argumento de tipo numérico. Se usarmos a ferramenta mypy nesse arquivo, com `python3 -m mypy ex2.py`, não recebemos relatos de erros.


Se adicionarmos as anotações de tipos, podemos ver algo interessante rodando o mypy (`python3 -m mypy ex2.py`)
```
def add_2(x: int) -> int:
    return x + 2

if __name__ == '__main__':
    add_2('qwwe')
```

```
error: Argument 1 to "add_2" has incompatible type "str"; expected "int"
```
O mypy percebeu que estamos passando uma string para uma funçao que documentamos que espera um inteiro!!!!! só isso já salvaria 50% dos casos.

## Opcional, optional, nullable, Mayble, ?

Em python, todo valor é um objeto. E toda variável de qualquer tipo pode ter o valor `None`. Isso é perigoso, porque sem anotação de tipos, poderíamos passar add_2(None), e o código funcionaria sem problemas, mesmo None não sendo um número... Mas que tipo é None???

No terminal do python podemos verificar isso:
```
>>> type(None)
<class 'NoneType'>
```

None é um objeto da classe NoneType, uma única instância. Seria semelhante em algumas formas ao 'Null' de outras linguagens. 

É comum passar None para funções, mas nesse casos tempos que anotar que o argumento pode ser None ou outra classe X. Em teoria de tipos, um tipo que pode ser um tipo X ou um tipo Y pode ser chamado de um tipo União de X e Y: `Union[X, Y]`. 

No pacote `typing` do python temos exatamente esse cara. E temos também o tipo Optional, que significa um tipo que pode ser None ou Algo.

No nosso caso, queremos que a função `add_2` retorne 2 quando receber None. Então o tipo do argumento de entrada seria `Optional[int]`.

```
from typing import Optional

def add_2(x: Optional[int]) -> int:
    if x is None:
        return 2
    return x + 2

if __name__ == '__main__':
    add_2(None)
```

Rodando o mypy(`python3 -m mypy ex2.py`), vemos que o código é checado com sucesso. O contrato está sendo mantido.

Quando tentamos usar o argumento `x` sem antes verificar que ele não é None, recebemos um erro de checagem. O `mypy` lê o seu código e tira o peso de pensar de sua cabeça. Seja burro, use tipos, seja feliz, durma em paz.

```
def add_2(x: Optional[int]) -> int:
    print(x + 3)
    if x is None:
        return 2
    return x + 2
```
## Só as cabeças
A função `head` é comum para pegarmos o primeiro elemento de qualquer lista. 

Ela retorna None qando a lista é vazia, e retorna o primeiro item quando há pelo menos um item. 

```
from typing import Optional, List

def head(l: List[int]) -> Optional[int]:
    if len(l) > 0:
        return l[0]
    return None

if __name__ == '__main__':
    None == head([])
    assert 1 == head([1])
```

Essa operação é genérica! essa função pode ser generalizada, já que não depende do tipo do item dentro da lista.

Usando mypy, a maneira de usar funções genéricas é usando a gambiarra de  `TypeVar`

```
from typing import Optional, List, TypeVar

T = TypeVar('T')

def head(l: List[T]) -> Optional[T]:
    if len(l) > 0:
        return l[0]
    return None

if __name__ == '__main__':
    None == head([])
    assert 1 == head([1])
```

## Callables, Flatmap :O
Aqui não é CrossFit, mas tem funcional. Vamos implementar a função FlatMap.

Imagine que você tem uma função que dado uma palavra te dá as letras dessa palavra. E uma lista de palavras. Como você consegue uma lista com todas as letras?

```
def characters(s: str) -> List[str]:
    return list(s)

l = ['jo', 'oi']
r = flat_map(l, characters)
assert r == ['j', 'o', 'o', 'i']
```

Temos que implementar a função flat_map, mas ela pode ser genérica!

```
from typing import Optional, List, TypeVar, Callable

A = TypeVar('A')
B = TypeVar('B')

def flat_map(l: List[A], f: Callable[[A], List[B]]) -> List[B]:
    r = []
    for i in l:
        r.extend(f(i))
    return r
```

O tipo `Callable` significa qualquer função ou lambda que pode ser chamada com uma lista de argumentos (no nosso caso, a lista de argumentos tem tamanho 1 e o primeiro argumento é do tipo A). e tem um valor de retorno (no nosso caso, `List[B]`).

## Tuplas
O tipo de `(1, 'qwe', 2)` é `Tuple[int, str, int]`.

## Any

O tipo `Any` é checado do mesmo jeito que o tipo de um argumento de entrada sem anotação: ele aceita qualquer coisa, e assume que o valor de saída qualquer método não vai quebrar seu código.

É um poluente, mas útil para várias situações em que queremos implementar o mypy gradualmente.

Agora você pode criar sua mini biblioteca de transformações de estruturas de dados com menos medo!

## Implemente incrementalmente
Mypy te dá muitas possibilidades, mas requer esforço e tem algumas peculiaridades. 

Integração com pacotes sem anotação de tipo normalmente viram o ponto que necessita de mais atenção.

Nem todo mundo consegue entender o que é um `List[Optional[Dict[str, List[int]]]]`.