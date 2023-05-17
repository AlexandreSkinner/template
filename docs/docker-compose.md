O docker compose serve para orquestrar os varios containers de
uma aplicação. Por exemplo você pode construir um container p/
a aplicação (node) e outro para o banco de dados.

# Create and start containers
- Cria e inicializa os containers especificado no arquivo .yml
  existente na raiz do projeto, em caso de alguma alteração no
  arquivo .yml só será recriado o containers que foi alterado
```
» docker-compose up -d
```
- Cria o container com o nome do projeto "compras"
```
» docker-compose -p, --project-name compras up -d
```
# Build or rebuild services
- Realiza apenas a parte de builder das images que serão utilizadas.
```
» docker-compose build
```
# Listar containers
- Somente os containers ativos
```
» docker container ls ou docker ps
```
- Todos os container
```
» docker container ls -a ou docker ps -a
```
# Parar um container
```
» docker stop <container_ID>
```
# Lista as imagens existentes na maquina.
```
» docker images
```
# Remover imagens.
```
» docker rmi ubuntu
```
```
» docker rmi <iamge_name>
```
# Mata todos os container existentes
É possível apagar todos os containers e imagens de uma só vez. Para isso, basta um pouco de shell script:
O comando dentro do parenteses traz o id de todos os container.
```
» docker rm -f $(docker container ls -a -q)
```
```
O mesmo serve para apagar imagens:
» docker rmi $(docker images -q)
```
# Parar todos os containers
```
» docker-compose stop
```
# Criar volume
Um volume pode ser um diretório localizado fora do sistema
de arquivos de um container. O Docker permite especificar
diretórios no container para que possam ser mapeados no sistema
de arquivos do host.
```
» docker volume create pg_data
```
# Cria o containers com postgres
Cria um container para rodar o BD Postgres utilizando uma imagem aparcom um SO linux minimalista (alpine), orientada para eficiencia de recurso e segurança.
```
» docker run --name db_postgresql -e "POSTGRES_USER=<username>" -e "POSTGRES_PASSWORD=<password>" -v pg_data:/var/lib/postgresql/data -p 5433:5432 -d postgres:15.2-alpine
```
parametros do comando
```
v - especifica volume
e - enviroment variables
d - execute o container em segundo plano
```
# Dockerfile x Docker-composefile
- Docker file é para criarmos a imagem da nossas aplicação.
```
“O Dockerfile é um arquivo de texto que contém as instruções necessárias para criar uma nova
imagem de contêiner. Essas instruções incluem a identificação de uma imagem existente a ser usada
como uma base, comandos a serem executados durante o processo de criação da imagem e um
comando que será executado quando novas instâncias da imagem de contêiner forem implantadas.”
```
- Docker-compose file é a receita para montar os nossos containers.
```
"O docker-compose é uma ferramenta do Docker que, a partir de diversas especificações, permite
subir diversos containeres e relacioná-los através de redes internas".
```
