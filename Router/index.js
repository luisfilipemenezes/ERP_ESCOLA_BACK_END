import express from 'express'
const router  = express.Router()
import { listarTodosOsAlunos, criarAluno,DeletarAluno,atualizarAluno,loginAdmin,cadastrarUser,authenticateJWT } from '../Controller';



router.get('/buscar', listarTodosOsAlunos)

router.post('/criar',criarAluno)

router.delete('/deletar', DeletarAluno)

router.put('/atualizar', atualizarAluno)

router.post('/login',loginAdmin)

router.post('/register',cadastrarUser)
  

export default router;