
import pool from '../banco/conexao'; 
import bcrypt from 'bcrypt';
require('dotenv').config()
import jwt from 'jsonwebtoken'


export async function listarOsAlunos(){
    const alunos = await pool.connect();
    try {
        const results = await alunos.query('SELECT * FROM alunos');
        return results.rows;
      } finally{
        alunos.release();
      }

}

export async function criar(nome,idade,cpf){
    const aluno = await pool.connect();
    try {
        
        await aluno.query('INSERT INTO alunos (nome, idade, cpf) VALUES ($1, $2, $3)', [nome, idade, cpf]);
        
    }finally{
        aluno.release();
    }

}


export  async function deletar(id){
    const aluno = await pool.connect();
    try {
        await aluno.query('DELETE from alunos WHERE id= $1',[id]);
    } finally{
        aluno.release();
    }

}


export async function atualizar(nome,idade,cpf,id){
    const aluno = await pool.connect();
    try {
        await aluno.query('UPDATE alunos SET nome = $1, idade = $2, cpf = $3 WHERE id = $4', [nome,idade,cpf,id]);
    } finally{
        aluno.release();
    }

}

export async function cadastrandoUsuario(usuario, senha) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const conexao = await pool.connect();
    
    try {
      const result = await conexao.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [usuario, hashedPassword]
      );
    }catch(error){
        throw error;
    } 
    finally {
      conexao.release();
    }
  }

export async function logarUsuario(usuario,senha){
    const conexao =  await pool.connect()
    try {
        const result = await conexao.query("select * from users WHERE username = $1", [usuario])
        const user = result.rows[0];
        
        if(user && await bcrypt.compare(senha, user.password)){
            
            const token =  jwt.sign({id:user.id,username:user.username},process.env.ACESS_TOKEN_SECRET ,{ expiresIn: '30s' } )
            return token
        }
    } catch (error) {
       throw error
    }finally{
        conexao.release();
    }
}

