'use strict';

System.register(['./controllers/NegociacaoController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController, $;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = currentInstance();
      $ = document.querySelector.bind(document);


      $('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      $('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map