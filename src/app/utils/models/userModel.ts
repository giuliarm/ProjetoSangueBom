import { GeneroEnum } from "../enum/generoEnum";


export interface UserData{
    nome: string;
    email: string;
    password: string;
    dataNascimento: Date;
    genero: GeneroEnum;
    jaDoador: boolean;
}

export interface UserPhoto{
    centroDoacao: string;
    foto: string;
    dataDoacao:string;    
}