# 🚀 Thiago Monte — Back-end Journey

Este é o repositório do meu portfólio pessoal. Um projeto desenvolvido para centralizar minhas informações profissionais, as tecnologias com as quais trabalho no dia a dia e os projetos que estou construindo, tudo apresentado em um formato de linha do tempo (*timeline*).

🌐 **Acesse o projeto online:** [https://thiagom-portfolio.vercel.app/](https://thiagom-portfolio.vercel.app/)

---

## 🛠️ Tecnologias Utilizadas

Apesar de ser um portfólio focado no meu perfil **Back-end**, a interface foi construída do zero utilizando tecnologias web fundamentais para garantir leveza e total controle do código:

* **HTML5** – Estruturação semântica das seções e formulários.
* **CSS3** – Estilização moderna utilizando variáveis (*Custom Properties*) e layouts responsivos.
* **JavaScript (Vanilla)** – Lógica de interatividade, manipulação do DOM e efeitos visuais no Canvas.
* **Font Awesome** – Ícones de redes sociais e elementos visuais.
* **Google Fonts** – Tipografia focada em legibilidade (Inter).

---

## ✨ Funcionalidades e Diferenciais

* **Efeito de Fundo Interativo (Canvas):** Um efeito dinâmico e matemático que gera uma constelação de pontos conectados formando triângulos translúcidos que se movem suavemente.
* **Navegação com Timeline Dinâmica:** À medida que o usuário rola a página, um marcador acompanha o progresso vertical ao longo de uma linha do tempo lateral, atualizando também o menu de navegação ativo.
* **Formulário de Contato Integrado:** Integração direta com o serviço *FormSubmit* para recebimento de mensagens diretamente no e-mail, contando com validação de campos via JavaScript e feedback visual de "Enviando...".
* **Avatar Fallback:** Caso a imagem de perfil principal falhe ao carregar por qualquer motivo, o script detecta o erro e gera automaticamente um escudo com as iniciais "TM" para não quebrar o layout.
* **Rodapé com Ano Automatizado:** Atualização automática do ano de copyright via JavaScript.

---

## 📂 Estrutura de Pastas Principal

```text
├── paginas/
│   ├── index.html     # Página principal do portfólio
│   ├── blog.html      # Página do blog (em desenvolvimento)
│   └── uses.html      # Página de setup/equipamentos (em desenvolvimento)
├── css/               # Arquivos de estilização (style.css, blog.css, etc.)
├── sistemas/
│   └── script.js      # Toda a lógica JavaScript (Interações, Canvas, Formulário)
└── assets/            # Imagens, favicons e mídias em geral
```
💻 Como Rodar o Projeto Localmente
Clone este repositório:
```text
Bash
git clone [https://github.com/thiagomonte06/Portfolio-Thiago-main.git](https://github.com/thiagomonte06/Portfolio-Thiago-main.git)
```
Navegue até a pasta do projeto.

Como o projeto utiliza caminhos absolutos para os assets e páginas (ex: /css/style.css), recomenda-se abrir o projeto utilizando um servidor local para evitar quebras de caminhos.

Se usar o VS Code, basta clicar com o botão direito no index.html e selecionar "Open with Live Server".

✉️ Contato
Se quiser trocar uma ideia sobre APIs, arquitetura de sistemas ou automações, fique à vontade para me acionar:

LinkedIn: https://linkedin.com/in/thiagohsmonte

E-mail: montethiago06@gmail.com


---

### 💡 Dicas de personalização:
* **Seu repositório:** No passo de clonar o projeto (`git clone`), certifique-se de que o link inserido é exatamente o do seu repositório atual no GitHub.
* **Páginas secundárias:** Como no seu HTML constam os links para `/paginas/blog.html` e `/paginas/uses.h
