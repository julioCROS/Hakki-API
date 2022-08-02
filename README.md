## Contribuindo com o projeto

**1.** Primeiro, clone a API no diretório de sua preferência:
```bash
git clone https://github.com/julioCROS/Hakki-API/
```

**2.** Crie um arquivo chamado `.env.local`, abra o arquivo e insira o seguinte texto: `DB_CONNECTION = X`. No lugar de `X`, insira a URL de conexão do banco de dados (neste caso, dessa API, utilizamos o [MongoDB](mongodb.com)).

**3.** Após configurar a URL de conexão do banco de dados, você pode então executar o projeto a partir dos seguintes comandos:
```bash
node bin/server.js
```

**4.** Com isso, você será possivel ver e entender melhor, o recebimento e envio de requisições a partir da página [`localhost:3000`](http://localhost:3000) utilizando alguma plataforma de API (como [Postman](https://www.postman.com), [Insomnia](https://insomnia.rest), etc).

Você agora é capaz de editar o projeto a sua vontade, desde elaborar novas requisições, modificar modelos existentes, etc. Caso queira subir para este repositório algumas novas funcionalidades criadas por você abra um [Pull Request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

>Caso queira contribuir com o projeto, é interessante você passar pelos outros dois projetos ligado ao Sistema *Hakki*:
> - [**Hakki Web**](https://github.com/julioCROS/Hakki-Web) - Interface Web para se comunicar com esta API ([**Hakki API**](https://github.com/julioCROS/Hakki-API)), cadastrando novos professores e acessando as avaliações enviadas de cada um dos professores cadastrados.
> - [**Hakki Chrome Extension**](https://github.com/julioCROS/Hakki-Extension) - Extensão criada para injetar um script na página de matricula do SIGAA alimentado pela API para mostrar as notas referente aos professores.
