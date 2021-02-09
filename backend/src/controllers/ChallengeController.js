class ChallengeController {
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

    if (typeof target !== 'number')
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
}

export default new ChallengeController();
