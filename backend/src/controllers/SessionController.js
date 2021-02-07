import User from "../models/User";
import * as Yup from "yup";

class SessionController {
  async index(req, res) {
    const { name } = req.query;
    const user = await User.findOne({ name });

    if (!user) return res.status(400).json({ message: "Usuário inexistente" });

    return res.json(user);
  }

  async list(req, res) {
    const users = await User.find({});

    if (!users)
      return res
        .status(400)
        .json({ message: "Não Existem usuários nessa coleção" });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      name: Yup.string().required(),
      inclusionDate: Yup.string().required(),
      alterationDate: Yup.string().required(),
      rules: Yup.string().required(),
      status: Yup.string().required(),
      show: Yup.bool().required(),
    });

    const {
      email,
      name,
      inclusionDate,
      alterationDate,
      rules,
      status,
      show,
    } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({
        message: "Este email já está vinculado á uma conta existente",
      });

    if (await User.findOne({ name }))
      return res.status(400).json({
        message: "Este nome de usuário já está vinculado á uma conta existente",
      });

    try {
      await schema.isValid(req.body);
    } catch (error) {
      console.log("erro: ", error);
    }

    let user = await User.create({
      email,
      name,
      inclusionDate,
      alterationDate,
      rules,
      status,
      show,
    });

    return res.json(user);
  }
}

export default new SessionController();