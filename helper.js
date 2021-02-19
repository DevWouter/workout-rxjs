document.addEventListener('DOMContentLoaded', () => {
  showCodeInBrowser();
});

function showCodeInBrowser() {
  /**
   * Reduces the size of the text
   * @param {string} text 
   * @returns {string}
   */
  function reduceCode(text) {
    let firstLine = Number.MAX_SAFE_INTEGER;
    let lastLine = 0;
    let maxLeadingSpaces = Number.MAX_SAFE_INTEGER;
    let lines = text.split(/\n/).filter(line => !/\/\/\#(endregion|region)/.test(line));
    lines.forEach((line, i) => {
      const isLineEmpty = line.trim().length == 0;
      if (firstLine > i && !isLineEmpty) firstLine = i;

      if (!isLineEmpty) {
        var spaces = /^\s*/.exec(line)[0].length;
        console.log(spaces);
        if (spaces < maxLeadingSpaces) {
          maxLeadingSpaces = spaces;
        }
      }
    });

    if (firstLine == Number.MAX_SAFE_INTEGER) {
      firstLine = 0;
    }

    lines = lines.map(x => x.substring(maxLeadingSpaces));
    return lines.slice(firstLine).join("\n").trim();
  }

  /** @type HTMLScriptElement */
  const workAreaEl = document.getElementById("workarea");
  const codeEl = document.createElement("code");
  codeEl.className = "js";
  codeEl.innerHTML = reduceCode(workAreaEl.innerHTML);

  const pre = document.createElement("pre");
  pre.className = "code-view"
  pre.appendChild(codeEl);
  document.body.append(pre);


  hljs.highlightBlock(codeEl);
}

function output(val) {
  document.getElementById("actual").innerText = val;
}