import { Cidade } from './cidade';

export interface Bairro {
    bairro: string;
    title: string;
    subtitle: string;
    description: string;
    image:[] | string;
    cidades: Cidade[] | string[];
    _id ?: string;
}

