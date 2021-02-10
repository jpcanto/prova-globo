class ChallengeController {
  async one(req, res) {
    const { array, target } = req.body;

    const matchers = [];
    const matchersIndexes = [];

    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (target == array[i] + array[j]) {
          matchers.push([array[i], array[j]]);
          matchersIndexes.push([[i], [j]]);
        }
      }
    }

    if (!Array.isArray(array))
      return res.status(400).json({
        message: `Erro, O parâmetro 'array' precisa ser do tipo Array`,
      });

    if (typeof target !== "number")
      return res.status(400).json({
        message: `Erro, O parâmetro 'target' precisa ser do tipo number`,
      });

    if (matchers.length)
      return res.status(200).json({
        message: `Expressão válida, esses são os pares que juntos somam o alvo, ${matchers.map(
          (m) => `[${m}]`
        )}, e seus indexes no array: ${matchersIndexes.map((m) => `[${m}]`)}`,
      });
    else
      return res.status(200).json({
        message: `Expressão inválida, nenhum par soma o alvo fornecido`,
      });
  }

  async two(req, res) {
    const { string } = req.params;

    let matcher = [];
    const bracketsMatches = {
      "(": ")",
      "[": "]",
      "{": "}",
    };

    for (let str of string.split("")) {
      let openingBracket = Object.entries(bracketsMatches).find(
        (bracket) => bracket[0] === str
      );
      if (openingBracket) matcher.push(str);
      else {
        const lastMatch = matcher.pop();

        if (str !== bracketsMatches[lastMatch])
          return res.status(400).json({
            message: "Expressão inválida, brackets com fechamento incorreto",
          });
      }
    }

    if (matcher.length !== 0)
      return res.status(400).json({
        message: "Expressão inválida, brackets com fechamento incorreto",
      });
    else
      return res.status(200).json({
        message:
          "Expressão Válida, Todos os brackets estão fechando corretamente",
      });
  }

  three(req, res) {
    const { array } = req.body;

    if (!Array.isArray(array))
      return res.status(400).json({
        message: `Erro, O parâmetro 'array' precisa ser do tipo Array`,
      });

    let results = [];

    for (let i = 0; i <= array.length - 1; i++) {
      const j = i === 0 ? 1 : 0;

      for (let j = 0; j <= array.length - 1; j++) {
        if (!(i === j)) results.push([array[i], array[j]]);
      }
    }

    results = results.filter((result) => result[0] < result[1]);

    if (!results.length)
      return res.status(200).json({
        message: `Não foi obtido lucro, o valor de venda foi igual ao valor de compra`,
      });

    let result = Math.max(...results.map((result) => result[1] - result[0]));

    return res.status(200).json({
      message: `O maior lucro possível é ${result}`,
    });
  }

  four(req, res) {
    const { array } = req.body;

    if (!Array.isArray(array))
      return res.status(400).json({
        message: `Erro, O parâmetro 'array' precisa ser do tipo Array`,
      });

    let leftBar = -1;
    let rightBar = -1;
    let base;
    let finalValue = 0;

    for (let i = 0; i < array.length; i++) {
      if (leftBar < 0 && array[i] > array[i + 1]) {
        leftBar = i;
      }

      if (leftBar > 0 && array[i] >= array[leftBar] && leftBar < i) {
        rightBar = i;

        for (let j = leftBar + 1; j < rightBar; j++) {
          base = leftBar < rightBar ? array[leftBar] : array[rightBar];

          finalValue += base - array[j];
        }
        array.slice(rightBar).filter((x) => x >= array[rightBar]).length === 1
          ? (leftBar = -1)
          : (leftBar = rightBar);

        rightBar = -1;
        if (leftBar === array.length) break;
      }
    }

    return res.status(200).json({
      message: `O acúmulo de água é de: ${finalValue}`,
    });
  }
}

export default new ChallengeController();
