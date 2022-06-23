import { openDb } from "../configDB.js";
import jwt from 'jsonwebtoken'

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE Pessoa(id INTEGER PRIMARY KEY, name TEXT, bio TEXT, phone INTEGER, email TEXT, password TEXT)')
    })
}

export async function login(request, response) {
    let email = request.body.email;
    let password = request.body.password;
    let logged;
    let token = jwt.sign({ email }, 'KEY', { expiresIn: "1h" })
    openDb().then(db => {
        db.get('SELECT * FROM Pessoa WHERE email = ? AND password = ?', email, password)
            .then(pessoa => {
                console.log(pessoa)
                if (pessoa !== undefined) {
                    logged = true;
                    response.json({
                        pessoa, token, logged
                    })
            } else {
            response.json({
                logged: false
            })
        }
    }).catch(() => {
        response.json({
            logged: false
        })
    });
}); 
}

export async function verifyEmail(request, response) {
    let email = request.body.email;
    let isMember;
    openDb().then(db => {
        db.get('SELECT * FROM Pessoa WHERE email = ? ', email)
            .then(pessoa => {
                if (pessoa.email !== null)
                    isMember = true;
                response.json({
                    isMember
                })
            }).catch(() => {
                response.json({
                    isMember: false
                })
            });
    });
}

export async function createUser(request, response) {
    let pessoa = request.body;
    let email = pessoa.email;
    let token = jwt.sign({
        email
    }, 'KEY',
        {
            expiresIn: "1h"
        })

    openDb().then(db => {
        db.run('INSERT INTO Pessoa (name, bio, phone, email, password) VALUES (?, ?, ?, ?, ?)',
            null, null, null, pessoa.email, pessoa.password);
    });

    response.json({
        "statusCode": 200,
        "message": "Usuario Criado com Sucesso !",
        token
    })
}

export async function updateUser(request, response) {
    let pessoa = request.body;
    verifyFields();

    let token = jwt.sign({
        email
    }, 'KEY',
        {
            expiresIn: "1h"
        })
    openDb().then(db => {
        db.run('UPDATE Pessoa SET name = ?, bio = ?, phone = ?, email = ? , password = ? WHERE id = ?',
            pessoa.name, pessoa.bio, pessoa.phone, pessoa.email, pessoa.password, pessoa.id);
    });

    response.json({
        "statusCode": 200,
        "message": "Usuario Alterado com Sucesso !",
        token
    })

    function verifyFields() {
        if (pessoa.name === null || pessoa.bio === null || pessoa.phone === null || pessoa.email === null || pessoa.password === null) {
            response.json({
                message: "Necessario preencher todos os campos"
            });
        }
    }
} 