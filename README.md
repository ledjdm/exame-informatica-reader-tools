![Image of UI of the tool](http://pedrofsantos.com/projects/eirt/tool.png)

# Exame Informática Reader Tools
v 2015.08.31 ([old versions](http://pedrofsantos.com/projects/eirt/old/))

- [Read in English](#english)
- [Lêr em Português](#português)

## English
### What is it?
Enhancements for readers of [Exame Informática online magazine](http://exameinformatica.assineja.pt/) on desktop/laptop computer.

### How to install

  1. Copy the code below:

  ```javascript
  javascript:(function(c){var s=document.createElement("script");var h=document.getElementsByTagName("head")[0];s.src="http://pedrofsantos.com/projects/eirt/eirt.min.js";s.async=true;s.onload = s.onreadystatechange = function(){if (document.readyState == "complete" && c) c();};h.appendChild(s);})();
  ```
  2. Create a new browser bookmark with a name (e.g. "Exame Informática Reader Tools")
  3. Paste the above code in the "URL"/"Link" text field
  4. If you wish, save the bookmark in the bookmarks bar for good access.

### How to use

  After you installed:
  - Choose your magazine you want to read at http://exameinformatica.assineja.pt/
  - Click in the created bookmark to show the tool
  - Read the next topic about the tools you can use

### Tools

  - Page navigation
    - use the ARROW LEFT key or ARROW RIGHT key, to jump to the previous or next page
  - Jump to page (ALT+P to focus text box) ![Image of the Jump to Page text box](http://pedrofsantos.com/projects/eirt/jumptopage.png)
    - write the page and press ENTER key, to jump to that page number
    - use ESC key to unfocus textbox
    - or write these special text (without quotes):
      - "i": goes to the index page
      - "begin": goes to the first page
      - "end": goes to the last page
  - Fullscreen ![Image of the fullscreen icon](http://pedrofsantos.com/projects/eirt/fullscreen.png)
    - click on the fullscreen icon to toggle the mode
    - use ESC key to exit
  - Page zoom
    - click on the page and use the MOUSEWHEEL to zoom in and out on the page
  - Highlight of the current page on the side menu
  - Loading icon shows up when page is changing

### Tested on/Supported by

  - Google Chrome 40+
  - Mozilla Firefox 39+
  - Internet Explorer 11+


## Português
### O que é
Funcionalidades adicionais para os leitores da [revista online Exame Informática](http://exameinformatica.assineja.pt/) em computadores/portáteis.

### Como instalar

  1. Copiar o código abaixo:

  ```javascript
  javascript:(function(c){var s=document.createElement("script");var h=document.getElementsByTagName("head")[0];s.src="http://pedrofsantos.com/gh/eirt.min.js";s.async=true;s.onload = s.onreadystatechange = function(){if (document.readyState == "complete" && c) c();};h.appendChild(s);})();
  ```
  2. Criar um novo favorito no navegador da internet com um nome (por exemplo "Exame Informática Reader Tools")
  3. Colar o código que copiaste acima para o campo "URL"/"Link"
  4. Se preferires, coloca o favorito num local com bom acesso (por exemplo na barra dos favoritos/marcadores)

### Como usar

  Depois de teres instalado:
  - Escolhe a revista mensal que queres ler em http://exameinformatica.assineja.pt/
  - Clica no favorito para aparecer a ferramenta
  - Lê o próximo tópico sobre as ferramentas que podes utilizar

### Ferramentas

  - Navegação das páginas
    - usar tecla SETA ESQUERDA ou tecla SETA DIREITA, para saltar para a página anterior ou seguinte
  - Saltar para página (ALT+P para ativar caixa de texto) ![Image of the Jump to Page text box](http://pedrofsantos.com/projects/eirt/jumptopage.png)
    - escrever número de página seguido da tecla ENTER, para saltar para essa página
    - usar a tecla ESC para tirar o fócus da caixa de texto
    - ou escrever texto especial (sem aspas):
      - "i": ir para a página do índice
      - "inicio": ir para a 1º página
      - "fim": ir para a última página
  - Ecrã inteiro ![Image of the fullscreen icon](http://pedrofsantos.com/projects/eirt/fullscreen.png)
    - usar o ícone do ecrã inteiro
    - usar a tecla ESC para sair
  - Zoom da página
    - clicar na página e usar a roda de SCROLL do rato para aproximar ou afastar a página
  - Realçada a página atual no menu lateral
  - Mostrado um icon de carregamento quando a página está a mudar

### Testado em/Funciona em

  - Google Chrome 40+
  - Mozilla Firefox 39+
  - Internet Explorer 11+