import { GeneroEnum } from "../enum/generoEnum";


export interface UserData{
    nome: string;
    email: string;
    password: string;
    dataNascimento: Date;
    genero: GeneroEnum;
}

export interface UserPhoto{
    centroDoacao: string;
    foto: string;
    dataDoacao:string;    
}