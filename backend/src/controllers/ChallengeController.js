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
}

export default new ChallengeController();