import { listarOsAlunos,criar,deletar,atualizar} from '../model';
require('dotenv').config()
import { cadastrandoUsuario,logarUsuario } from '../model';


export async function listarTodosOsAlunos(req, res) {
  try{
    const alunos = await listarOsAlunos()
    return res.json(alunos)
  }catch(err){
    console.error('Erro ao executar consulta', err.stack);
    return res.status(500).json({ error: 'Erro ao executar consulta' });

  }
}

export async function criarAluno(req, res) {
    try{
        criar(req.body.nome, req.body.idade, req.body.cpf)
        return res.json('aluno criado com sucesso!')
    }
     catch (err) {
        console.error('Erro ao inserir aluno', err.stack);
        return res.status(500).json({ error: 'Erro ao inserir aluno' });
}
}

export async function DeletarAluno(req, res) {
    try{
        deletar(req.body.id)
        return res.json({ message: 'Aluno deletado com sucesso' });
    }
    catch (err) {
        console.error('Erro ao excluir aluno', err.stack);
        return res.status(500).json({ error: 'Erro ao excluir aluno' });
    }
}

export async function atualizarAluno(req, res) {
    try{
        atualizar(req.body.nome,req.body.idade,req.body.cpf,req.body.id)
        res.json('Aluno Atualizado')
    }
    catch (err) {
        console.error('Erro ao atualizar aluno', err.stack);
        return res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
}


export async function loginAdmin(req,res){
    //Authenticate User
    const {usuario, senha} = req.body;
    try {
        const response = await logarUsuario(usuario,senha)
        res.json({token:response})
    } catch (error) {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }

}

export async function cadastrarUser(req, res) {
    const { usuario, senha } = req.body;
    
    try {
      const user = await cadastrandoUsuario(usuario, senha); // Use 'await' aqui
      res.status(201).json(user); // Retorne os dados do usuário criado
    } catch (error) {
      console.error('Erro no cadastro do usuário:', error);
      res.status(500).json({ error: error.message });
    }
  }

  const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };


